// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

struct PurchaseBalance {
  uint256 collateralAmount;
  uint256 tokenAmount;
}

contract Purchase is ERC721Enumerable, Ownable, ReentrancyGuard {
  using SafeERC20 for IERC20;

  string private _name;
  string private _symbol;
  string private _metadataURI;

  address public launchpad;
  uint32 public launchId;
  IERC20 public collateralToken;
  IERC20 public claimableToken;
  string public tokenSymbol;

  uint256 public lastPurchaseId;

  bool public refundEnabled;
  bool public claimEnabled;

  //Index is NFT token id
  mapping(uint256 => PurchaseBalance) public purchaseBalances;

  constructor() ERC721("Template", "TPL") Ownable(address(0xdEad)) {
    //This contract is meant to be cloned
  }

  function initialize(
    address _collateralToken,
    string memory nftTokenName,
    string memory nftTokenSymbol,
    string memory metadataURI,
    address owner
  ) public {
    launchpad = msg.sender;
    collateralToken = IERC20(_collateralToken);
    _name = nftTokenName;
    _symbol = nftTokenSymbol;
    _metadataURI = metadataURI;
    _transferOwnership(owner);
  }

  function setTokenAddress(address _claimableToken) external onlyOwner {
    claimableToken = IERC20(_claimableToken);
  }

  function mint(
    address buyer,
    uint256 collateralAmount,
    uint256 tokenAmount
  ) external onlyOwner {
    super._mint(buyer, ++lastPurchaseId);

    purchaseBalances[lastPurchaseId].collateralAmount = collateralAmount;
    purchaseBalances[lastPurchaseId].tokenAmount = tokenAmount;
  }

  function setRefundState(bool enabled) external onlyOwner {
    require(refundEnabled != enabled, "Already set");
    refundEnabled = enabled;
  }

  function enableClaim() external onlyOwner {
    require(claimEnabled == false, "Claim has already been enabled");

    claimEnabled = true;
  }

  modifier whenRefundEnabled() {
    require(refundEnabled, "Refund not enabled");
    _;
  }

  modifier whenClaimEnabled() {
    require(claimEnabled, "Claim not enabled");
    _;
  }

  function _baseURI() internal view override returns (string memory) {
    return _metadataURI;
  }

  function name() public view override returns (string memory) {
    return _name;
  }

  function symbol() public view override returns (string memory) {
    return _symbol;
  }

  function refund(uint256 tokenId) external nonReentrant onlyOwner {
    require(
      address(collateralToken) != address(0),
      "Collateral address not set"
    );
    collateralToken.approve(
      address(this),
      purchaseBalances[tokenId].collateralAmount
    );
    collateralToken.safeTransferFrom(
      address(this),
      _ownerOf(tokenId),
      purchaseBalances[tokenId].collateralAmount
    );

    delete purchaseBalances[tokenId];
    super._burn(tokenId);
  }

  function claim(uint256 tokenId) external nonReentrant onlyOwner {
    require(
      address(claimableToken) != address(0),
      "Claimable token address not set"
    );
    claimableToken.approve(
      address(this),
      purchaseBalances[tokenId].collateralAmount
    );
    claimableToken.safeTransferFrom(
      address(this),
      _ownerOf(tokenId),
      purchaseBalances[tokenId].tokenAmount
    );

    delete purchaseBalances[tokenId];
    super._burn(tokenId);
  }
}
