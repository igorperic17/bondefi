// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";

import "./Purchase.sol";

contract PurchaseFactory {
  address public baseContract;
  event PurchaseManagerCreated(address indexed contractAddress);

  constructor(address _baseContract) {
    baseContract = _baseContract;
  }

  function createPurchaseManager(
    string memory name,
    string memory symbol,
    string memory metadataURI,
    address creator
  ) public returns (address) {
    address purchaseNft = Clones.clone(baseContract);
    Purchase(purchaseNft).initialize(name, symbol, metadataURI, creator);
    emit PurchaseManagerCreated(purchaseNft);
    return purchaseNft;
  }
}
