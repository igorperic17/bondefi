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
}

contract Launchpad is Ownable, Pausable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  mapping(uint32 => Launch) public launches;
  uint32 public totalLaunches;

  PurchaseFactory private purchaseFactory;

  //This mapping MUST NOT be used to calculate the amount of tokens a user can claim, the NFT is the one that represents that
  mapping(uint32 => mapping(address => uint256)) investments; //investments[launchId][user] => amountInvested

  event UserInvestment(
    uint256 launchId,
    address indexed user,
    uint256 amount,
    uint256 tokenAmount
  );
  event LaunchCreated(uint256 launchId);

  constructor() Ownable(msg.sender) {}

  function setPurchaseFactory(address factoryAddress) external onlyOwner {
    purchaseFactory = PurchaseFactory(factoryAddress);
  }

  function createLaunch(
    string calldata purchaseNftName,
    string calldata purchaseNftSymbol,
    address purchaseToken,
    uint256 targetRaise,
    uint128 capPerUser,
    uint32 saleStart,
    uint32 saleEnd,
    address purchaseFormula
  ) external /* onlyOwner */ {
    require(
      address(purchaseFactory) != address(0),
      "No purchase factory defined"
    );
    require(purchaseFormula != address(0), "No purchase formula defined");
    require(saleEnd > saleStart, "Sale dates are incorrect");
    require(targetRaise > 0, "Zero target raise");

    Launch storage launch = launches[++totalLaunches];
    launch.id = totalLaunches;
    launch.purchaseToken = purchaseToken;
    launch.targetRaise = targetRaise;
    launch.capPerUser = capPerUser;
    launch.saleStart = saleStart;
    launch.saleEnd = saleEnd;
    launch.purchaseFormula = purchaseFormula;

    launch.purchaseNftAddress = purchaseFactory.createPurchaseManager(
      purchaseNftName,
      purchaseNftSymbol,
      "", //TODO: metadataURI
      address(this)
    );

    emit LaunchCreated(launch.id);
  }

  function updateLaunch(
    uint32 launchId,
    address purchaseToken,
    uint256 targetRaise,
    uint128 capPerUser,
    uint32 saleStart,
    uint32 saleEnd,
    address purchaseFormula
  ) external onlyOwner {
    Launch storage launch = launches[launchId];

    require(
      block.timestamp < (launch.saleStart - 60),
      "Sale starts in less than a minute"
    );

    launch.purchaseToken = purchaseToken;
    launch.targetRaise = targetRaise;
    launch.capPerUser = capPerUser;
    launch.saleStart = saleStart;
    launch.saleEnd = saleEnd;
    launch.purchaseFormula = purchaseFormula;
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  //TODO limit slippage with % when using bonding curve
  //uint256 maxSlippage
  //TODO: Native purchase, only ERC20 for now
  function buyTokens(
    uint32 launchId,
    uint256 amount
  ) external whenNotPaused nonReentrant {
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

    if (launchInvestments[msg.sender] == 0) {
      launch.totalUsers += 1;
    }
    launch.raised += amount;
    launchInvestments[msg.sender] += amount;

    uint256 tokenAmount = IBancorFormula(launch.purchaseFormula)
      .calculatePurchaseReturn(
        10 ** 14, //startingPrice 0.0001
        launch.tokensToBeEmitted,
        launch.raised,
        launch.reserveRatio,
        amount
      );

    launch.tokensToBeEmitted += tokenAmount;

    //Tokenize purchase
    IERC20(launch.purchaseToken).safeTransferFrom(
      msg.sender,
      launch.purchaseNftAddress,
      amount
    );
    Purchase(launch.purchaseNftAddress).mint(msg.sender, amount, tokenAmount);

    emit UserInvestment(launchId, msg.sender, amount, tokenAmount);
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

  function claim(uint32 launchId) external whenNotPaused {
    Purchase purchase = getPurchaseFromLaunch(launchId);

    while (purchase.balanceOf(msg.sender) > 0) {
      purchase.claim(purchase.tokenOfOwnerByIndex(msg.sender, 0));
    }
  }

  function refund(uint32 launchId) external whenNotPaused {
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

  //TODO: emergency withdrawal of native funds and ERC20s
}
