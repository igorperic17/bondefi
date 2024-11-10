// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import "./Purchase.sol";
import "./PurchaseFactory.sol";
import "../bancor-formula/IBancorFormula.sol";

struct ProjectDetails {
  //required properties
  string name;
  string symbol;
  //properties that can be moved to a backend
  string description;
  string iconUrl;
}

struct Launch {
  uint32 id;
  address purchaseToken; //If address == 0 it will be considered a native purchase
  address purchaseNftAddress; //NFT that represents the purchase
  uint256 targetRaise;
  uint256 raised;
  uint256 tokensToBeEmitted; //Increases with each purchase, this is a virtual reserve to calcualate price of future tokens
  uint128 capPerUser; //purchaseToken, 0 means no cap
  uint32 saleStart;
  uint32 saleEnd;
  uint32 totalUsers;
  address purchaseFormula;
  uint32 reserveRatio; //Percentage, value between 1 and 1000000
  bool claimEnabled;
  ProjectDetails details; //This should live in a backend instead, and just become calldata in createLaunch
}

contract Launchpad is Ownable, Pausable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  mapping(uint32 => Launch) private launches;
  uint32 public totalLaunches;

  PurchaseFactory private purchaseFactory;

  //This mapping MUST NOT be used to calculate the amount of tokens a user can claim, the NFT is the one that represents that
  mapping(uint32 => mapping(address => uint256)) investments; //investments[launchId][user] => amountInvested

  event TokensPurchased(
    uint256 indexed launchId,
    address indexed user,
    uint256 amount,
    uint256 tokenAmount
  );
  event LaunchCreated(uint256 indexed launchId);
  event TGE(uint256 indexed launchId, address indexed tokenAddress); //Token Generation Event

  constructor() Ownable(msg.sender) {}

  function setPurchaseFactory(address factoryAddress) external onlyOwner {
    purchaseFactory = PurchaseFactory(factoryAddress);
  }

  function createLaunch(
    address purchaseToken,
    uint256 targetRaise,
    uint128 capPerUser,
    uint32 saleStart,
    uint32 saleEnd,
    address purchaseFormula,
    uint32 reserveRatio,
    ProjectDetails calldata details
  ) external /* onlyOwner */ {
    require(
      address(purchaseFactory) != address(0),
      "No purchase factory defined"
    );
    require(purchaseFormula != address(0), "No purchase formula defined");
    require(saleEnd > saleStart, "Sale dates are incorrect");
    require(targetRaise > 0, "Zero target raise");

    //TODO: Create ERC20 token already (this is temporary, in future projects will be the ones creating the tokens)

    Launch storage launch = launches[++totalLaunches];
    launch.id = totalLaunches;
    launch.purchaseToken = purchaseToken;
    launch.targetRaise = targetRaise;
    launch.capPerUser = capPerUser;
    launch.saleStart = saleStart;
    launch.saleEnd = saleEnd;
    launch.purchaseFormula = purchaseFormula;
    launch.reserveRatio = reserveRatio;
    launch.details = details;

    launch.purchaseNftAddress = purchaseFactory.createPurchaseManager(
      purchaseToken,
      string(abi.encodePacked("IDO ", details.name)),
      string(abi.encodePacked("IDO-", details.symbol)),
      "", //TODO: metadataURI
      address(this)
    );

    emit LaunchCreated(launch.id);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  //TODO limit slippage with % when using bonding curve
  //TODO: Native purchase, only ERC20 for now
  //TODO: use permit2 (https://github.com/Uniswap/permit2) for allowance management, ideal use case for this launchpad
  function buyTokens(
    uint32 launchId,
    uint256 amount
  ) external whenNotPaused nonReentrant {
    require(amount > 0, "Amount must be greater than 0");
    Launch storage launch = launches[launchId];
    require(block.timestamp >= launch.saleStart, "Sale not started");
    require(block.timestamp <= launch.saleEnd, "Sale ended");

    checkAllowance(msg.sender, amount, launch.purchaseToken);

    mapping(address => uint256) storage launchInvestments = investments[
      launchId
    ];

    require(
      launch.raised + amount <= launch.targetRaise,
      "Exceeds maximum target raise"
    );

    if (launch.capPerUser > 0) {
      require(
        launchInvestments[msg.sender] + amount <= launch.capPerUser,
        "Exceeds maximum cap per user"
      );
    }

    uint256 tokenAmount = IBancorFormula(launch.purchaseFormula)
      .calculatePurchaseReturn(
        //TODO: Allow starting prices above 10**18, currently this would fail due to the virtual supply of 1 token
        10 ** 14, //startingPrice 0.0001
        launch.tokensToBeEmitted,
        launch.raised,
        launch.reserveRatio,
        amount
      );

    require(tokenAmount > 0, "Purchased token amount would be 0");

    if (launchInvestments[msg.sender] == 0) {
      launch.totalUsers += 1;
    }
    launch.raised += amount;
    launchInvestments[msg.sender] += amount;
    launch.tokensToBeEmitted += tokenAmount;

    //Tokenize purchase
    IERC20(launch.purchaseToken).safeTransferFrom(
      msg.sender,
      launch.purchaseNftAddress,
      amount
    );
    Purchase(launch.purchaseNftAddress).mint(msg.sender, amount, tokenAmount);

    emit TokensPurchased(launchId, msg.sender, amount, tokenAmount);
  }

  function isRefundEnabled(uint32 launchId) public view returns (bool) {
    Launch storage launch = launches[launchId];
    return
      !isClaimEnabled(launchId) &&
      (block.timestamp > launch.saleEnd && launch.raised < launch.targetRaise);
  }

  modifier whenRefundEnabled(uint32 launchId) {
    require(isRefundEnabled(launchId), "Refund not available");
    _;
  }

  function isClaimEnabled(uint32 launchId) public view returns (bool) {
    Launch storage launch = launches[launchId];
    return launch.claimEnabled;
  }

  function tgeEvent(uint32 launchId, address tokenAddress) external onlyOwner {
    Launch storage launch = launches[launchId];
    require(launch.id > 0, "Project launch does not exist");
    require(block.timestamp > launch.saleEnd, "Sale not ended");
    require(launch.tokensToBeEmitted > 0, "No tokens to be emitted");
    require(
      IERC20(tokenAddress).balanceOf(address(this)) == launch.tokensToBeEmitted,
      "Not enough funds to fund all claims"
    );

    IERC20(tokenAddress).safeTransfer(
      launch.purchaseNftAddress,
      launch.tokensToBeEmitted
    );

    Purchase(launch.purchaseNftAddress).setTokenAddress(tokenAddress);

    deployLiquidity(launchId);
    setupStaking(launchId);

    launch.claimEnabled = true;

    emit TGE(launchId, tokenAddress);
  }

  function deployLiquidity(uint32 launchId) private {
    //TODO: Deploy liquidity with UniswapV3
  }

  function setupStaking(uint32 launchId) private {
    //TODO: Set up a staking contract with rewards against the LP token
  }

  function claimFees(uint32 launchId) external {
    //TODO: Collect v3 fees and distribute them to the staking contract
  }

  modifier whenClaimEnabled(uint32 launchId) {
    require(isClaimEnabled(launchId), "Claim not enabled");
    _;
  }

  function checkAllowance(
    address allower,
    uint256 amount,
    address tokenAddress
  ) private view {
    uint256 amountAllowed = IERC20(tokenAddress).allowance(
      allower,
      address(this)
    );
    require(amount <= amountAllowed, "Not enough spend allowance for ERC20");
  }

  function claim(
    uint32 launchId
  ) external whenNotPaused nonReentrant whenClaimEnabled(launchId) {
    Purchase purchase = getPurchaseFromLaunch(launchId);

    while (purchase.balanceOf(msg.sender) > 0) {
      purchase.claim(purchase.tokenOfOwnerByIndex(msg.sender, 0));
    }
  }

  function refund(
    uint32 launchId
  ) external whenNotPaused nonReentrant whenRefundEnabled(launchId) {
    Purchase purchase = getPurchaseFromLaunch(launchId);

    while (purchase.balanceOf(msg.sender) > 0) {
      purchase.refund(purchase.tokenOfOwnerByIndex(msg.sender, 0));
    }
  }

  function getPurchaseFromLaunch(
    uint32 launchId
  ) private view returns (Purchase) {
    Launch storage launch = launches[launchId];
    require(block.timestamp > launch.saleEnd, "Sale not ended");

    return Purchase(launch.purchaseNftAddress);
  }

  function getUserStats(
    address user,
    uint32 launchId
  )
    external
    view
    returns (uint256 nftBalance, uint256 purchaseAmount, uint256 tokenAmount)
  {
    Purchase purchase = getPurchaseFromLaunch(launchId);
    nftBalance = purchase.balanceOf(user);

    for (uint32 i = 0; i < nftBalance; i++) {
      (uint256 collateralAmountBalance, uint256 tokenAmountBalance) = purchase
        .purchaseBalances(purchase.tokenOfOwnerByIndex(msg.sender, i));

      tokenAmount += tokenAmountBalance;
      purchaseAmount += collateralAmountBalance;
    }
  }

  function getLaunch(uint32 launchId) external view returns (Launch memory) {
    return launches[launchId];
  }

  function withdrawETH() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  function withdrawERC20(address tokenAddress) external onlyOwner {
    IERC20 token = IERC20(tokenAddress);
    uint256 balance = token.balanceOf(address(this));
    require(balance > 0, "No tokens to withdraw");
    token.safeTransfer(owner(), balance);
  }

  receive() external payable {}
}
