// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "./Purchase.sol";
import "./PurchaseFactory.sol";
import "./uniswap/PoolManager.sol";
import "./token/ERC20Token.sol";
import "./token/ERC20Factory.sol";
import "../bancor-formula/IBancorFormula.sol";

struct ProjectDetails {
  //required properties
  string name;
  string symbol;
  //TODO: properties that should be moved to a backend
  string description;
  string iconUrl;
}

struct Launch {
  uint32 id;
  address purchaseToken; //If address == 0 it will be considered a native purchase
  address purchaseNftAddress; //NFT that represents the purchase
  uint256 targetRaise;
  uint256 raised;
  address tokenAddress; //Token that will be generated for this launch. It's address(0) if the token is not created by the launchpad
  uint256 tokensToBeEmitted; //Increases with each purchase, this is a virtual reserve to calcualate price of future tokens
  uint128 capPerUser; //purchaseToken, 0 means no cap
  uint32 saleStart;
  uint32 saleEnd;
  uint32 totalUsers;
  address purchaseFormula;
  uint32 reserveRatio; //Percentage, value between 1 and 1000000
  bool claimEnabled;
  uint32 launchpadFee; //Percentage, value between 1 and 1000000
  uint32 launchpadFeeToken; //Percentage, value between 1 and 1000000
  ProjectDetails details; //TODO: This info should live in a backend instead, and just become calldata in createLaunch
}

contract Launchpad is Ownable, Pausable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  mapping(uint32 => Launch) private _launches;
  uint32 public totalLaunches;

  uint32 public constant MAX_PERCENT = 1000000;

  PurchaseFactory public purchaseFactory;
  ERC20Factory public erc20Factory;

  PoolManager public liquidityPoolManager;

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

  function setERC20Factory(address factoryAddress) public onlyOwner {
    erc20Factory = ERC20Factory(factoryAddress);
  }

  function setPurchaseFactory(address factoryAddress) public onlyOwner {
    purchaseFactory = PurchaseFactory(factoryAddress);
  }

  function setFactories(
    address _erc20Factory,
    address _purchaseFactory
  ) external onlyOwner {
    erc20Factory = ERC20Factory(_erc20Factory);
    purchaseFactory = PurchaseFactory(_purchaseFactory);
  }

  function setLiquidityPoolManager(
    address _liquidityPoolManager
  ) external onlyOwner {
    liquidityPoolManager = PoolManager(_liquidityPoolManager);
  }

  function createLaunch(
    address purchaseToken,
    uint256 targetRaise,
    uint128 capPerUser,
    uint32 saleStart,
    uint32 saleEnd,
    address purchaseFormula,
    uint32 reserveRatio,
    bool createERC20,
    uint32 launchpadFee,
    uint32 launchpadFeeToken,
    ProjectDetails calldata details
  ) external /* onlyOwner */ {
    require(
      address(purchaseFactory) != address(0),
      "No purchase factory defined"
    );
    require(
      address(erc20Factory) != address(0),
      "No ERC20 token factory defined"
    );
    require(purchaseFormula != address(0), "No purchase formula defined");
    require(saleEnd > saleStart, "Sale dates are incorrect");
    require(targetRaise > 0, "Zero target raise");

    Launch storage launch = _launches[++totalLaunches];
    launch.id = totalLaunches;
    launch.purchaseToken = purchaseToken;
    launch.targetRaise = targetRaise;
    launch.capPerUser = capPerUser;
    launch.saleStart = saleStart;
    launch.saleEnd = saleEnd;
    launch.purchaseFormula = purchaseFormula;
    launch.reserveRatio = reserveRatio;
    launch.launchpadFee = launchpadFee;
    launch.launchpadFeeToken = launchpadFeeToken;
    launch.details = details;

    if (createERC20) {
      address projectToken = erc20Factory.createERC20(
        details.name,
        details.symbol,
        msg.sender, //tokenAdmin
        address(this) //minter
      );

      launch.tokenAddress = projectToken;
    }

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
    Launch storage launch = _launches[launchId];
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

  function isClaimEnabled(uint32 launchId) public view returns (bool) {
    Launch storage launch = _launches[launchId];
    return launch.claimEnabled;
  }

  modifier whenClaimEnabled(uint32 launchId) {
    require(isClaimEnabled(launchId), "Claim not enabled");
    _;
  }

  function isRefundEnabled(uint32 launchId) public view returns (bool) {
    Launch storage launch = _launches[launchId];
    return
      !isClaimEnabled(launchId) &&
      (block.timestamp > launch.saleEnd && launch.raised < launch.targetRaise);
  }

  modifier whenRefundEnabled(uint32 launchId) {
    require(isRefundEnabled(launchId), "Refund not available");
    _;
  }

  function tgeEventLaunchpadToken(
    uint32 launchId,
    uint256 tokensForProject,
    address projectAddress
  ) external onlyOwner {
    require(
      _launches[launchId].tokenAddress != address(0),
      "No token defined for TGE, use the tgeEvent function instead"
    );
    tgeEvent(
      launchId,
      tokensForProject,
      projectAddress,
      _launches[launchId].tokenAddress
    );
  }

  //TODO provide some validation that the address is correct (maybe through NFT or a signature, as mode of whitelisting? maybe even a merkle tree)
  function tgeEvent(
    uint32 launchId,
    uint256 tokensForProject,
    address projectAddress,
    address tokenAddress
  ) public onlyOwner {
    Launch storage launch = _launches[launchId];
    require(launch.id > 0, "Project launch does not exist");
    require(
      projectAddress != address(0) || tokensForProject == 0,
      "Invalid project address"
    );
    require(
      address(liquidityPoolManager) != address(0),
      "No liquidity pool manager defined"
    );
    require(block.timestamp > launch.saleEnd, "Sale not ended");
    require(launch.tokensToBeEmitted > 0, "No tokens to be emitted");

    (
      uint256 tokensForLaunchpad,
      uint256 tokensNeeded,
      uint256 collateralForLaunchpad,
      uint256 collateralForLiquidity
    ) = distribution(
        tokensForProject,
        launch.tokensToBeEmitted,
        launch.launchpadFee,
        launch.launchpadFeeToken,
        launch.raised
      );

    bool tokenCreatedByLaunchpad = launch.tokenAddress != address(0);
    if (tokenCreatedByLaunchpad) {
      ERC20Token token = ERC20Token(launch.tokenAddress);
      token.mint(address(this), tokensNeeded);
    } else {
      require(
        IERC20(tokenAddress).balanceOf(address(this)) == tokensNeeded,
        "Not enough funds to fund all claims"
      );
    }

    Purchase purchase = Purchase(launch.purchaseNftAddress);
    purchase.setTokenAddress(tokenAddress);

    IERC20 projectToken = IERC20(tokenAddress);
    if (tokensForProject > 0) {
      projectToken.safeTransfer(projectAddress, tokensForProject);
    }
    if (tokensForLaunchpad > 0) {
      projectToken.safeTransfer(msg.sender, tokensForLaunchpad);
    }
    projectToken.safeTransfer(
      launch.purchaseNftAddress,
      launch.tokensToBeEmitted
    );

    if (collateralForLaunchpad > 0) {
      purchase.collectFees(msg.sender, collateralForLaunchpad);
    }

    //TODO mint tokens to provide liquidity
    deployLiquidity(
      launch.purchaseToken,
      tokenAddress,
      collateralForLiquidity,
      0
    );
    setupStaking(launchId);

    // Uncomment next few lines if we want to renounce minter role automatically (we won't allow fixing problems at launch with missing token deliveries after TGE)
    // if (tokenCreatedByLaunchpad) {
    //   ERC20Token token = ERC20Token(launch.tokenAddress);
    //   token.renounceRole(token.MINTER_ROLE(), address(this));
    // }

    launch.claimEnabled = true;

    emit TGE(launchId, tokenAddress);
  }

  function distribution(
    uint256 tokensForProject,
    uint256 tokensToBeEmitted,
    uint32 launchpadFee,
    uint32 launchpadFeeToken,
    uint256 raised
  )
    private
    pure
    returns (
      uint256 tokensForLaunchpad,
      uint256 tokensNeeded,
      uint256 collateralForLaunchpad,
      uint256 collateralForLiquidity
    )
  {
    tokensForLaunchpad = (((tokensToBeEmitted + tokensForProject) *
      launchpadFeeToken) / MAX_PERCENT);
    tokensNeeded = tokensToBeEmitted + tokensForProject + tokensForLaunchpad;
    collateralForLaunchpad = ((raised * launchpadFee) / MAX_PERCENT);
    collateralForLiquidity = raised - collateralForLaunchpad;
  }

  function deployLiquidity(
    address purchaseToken,
    address tokenAddress,
    uint256 collateral,
    uint256 tokenAmount
  ) private {
    //We can only deploy liquidity on mainnet, so we're checking the UniSwap factory is available
    //TODO: Remove this check when deploying to mainnet, letting it fail if the factory is not available
    if (address(liquidityPoolManager.uniswapFactory()) != address(0)) {
      liquidityPoolManager.createPoolAndAddLiquidity(
        purchaseToken,
        tokenAddress,
        collateral,
        tokenAmount,
        3000 //0.3% fee
      );
    }
  }

  function setupStaking(uint32 launchId) private {
    //TODO: Set up a staking contract with rewards against the LP token
  }

  function claimFees(uint32 launchId) external {
    //TODO: Collect v3 fees and distribute them to the staking contract
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
    uint32 launchId,
    uint256 tokenId
  ) external whenNotPaused nonReentrant whenClaimEnabled(launchId) {
    Purchase purchase = getPurchaseFromLaunch(launchId);
    require(
      purchase.ownerOf(tokenId) == msg.sender,
      "Not the owner of the NFT"
    );

    purchase.claim(tokenId);
  }

  function claimAll(
    uint32 launchId
  ) external whenNotPaused nonReentrant whenClaimEnabled(launchId) {
    Purchase purchase = getPurchaseFromLaunch(launchId);

    while (purchase.balanceOf(msg.sender) > 0) {
      purchase.claim(purchase.tokenOfOwnerByIndex(msg.sender, 0));
    }
  }

  function refund(
    uint32 launchId,
    uint256 tokenId
  ) external whenNotPaused nonReentrant whenRefundEnabled(launchId) {
    Purchase purchase = getPurchaseFromLaunch(launchId);
    require(
      purchase.ownerOf(tokenId) == msg.sender,
      "Not the owner of the NFT"
    );

    purchase.refund(tokenId);
  }

  function refundAll(
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
    Launch storage launch = _launches[launchId];

    return Purchase(launch.purchaseNftAddress);
  }

  function getLaunch(uint32 launchId) external view returns (Launch memory) {
    return _launches[launchId];
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

  //WARNING!
  //TODO: remove these functions when a backend is implemented
  //They are not built to scale and should not be used in a production environment
  struct LaunchInfo {
    Launch launch;
    uint8 tokenPurchaseDecimals;
  }

  struct PurchaseInfo {
    uint256 tokenId;
    PurchaseBalance balance;
  }

  struct UserStats {
    uint256 nftBalance;
    uint256 purchaseAmount;
    string purchaseSymbol;
    uint256 purchaseDecimals;
    uint256 tokenAmount;
    uint256 tokenDecimals;
    PurchaseInfo[] purchaseInfo;
  }

  function getLaunchDetails(
    uint32 launchId
  ) public view returns (LaunchInfo memory launchDetails) {
    launchDetails.launch = _launches[launchId];
    launchDetails.tokenPurchaseDecimals = IERC20Metadata(
      launchDetails.launch.purchaseToken
    ).decimals();
  }

  function getAllLaunchDetails() external view returns (LaunchInfo[] memory) {
    LaunchInfo[] memory launches = new LaunchInfo[](totalLaunches);
    for (uint32 i = 0; i < totalLaunches; i++) {
      launches[i] = getLaunchDetails(i + 1);
    }
    return launches;
  }

  function getUserStats(
    address user,
    uint32 launchId
  ) external view returns (UserStats memory userStats) {
    Purchase purchase = getPurchaseFromLaunch(launchId);
    userStats.nftBalance = purchase.balanceOf(user);
    userStats.purchaseInfo = new PurchaseInfo[](userStats.nftBalance);

    for (uint32 i = 0; i < userStats.nftBalance; i++) {
      uint256 tokenId = purchase.tokenOfOwnerByIndex(msg.sender, i);
      PurchaseBalance memory balance = purchase.purchaseBalances(tokenId);

      userStats.tokenAmount += balance.tokenAmount;
      userStats.purchaseAmount += balance.collateralAmount;

      userStats.purchaseInfo[i] = PurchaseInfo({
        tokenId: tokenId,
        balance: balance
      });
    }

    userStats.purchaseSymbol = IERC20Metadata(_launches[launchId].purchaseToken)
      .symbol();
    userStats.purchaseDecimals = IERC20Metadata(
      _launches[launchId].purchaseToken
    ).decimals();
    userStats.tokenDecimals = 18; //userStats.tokenDecimals = IERC20Metadata(purchase.claimableToken()).decimals();
  }
  //END TODO: remove these functions when a backend is implemented
}
