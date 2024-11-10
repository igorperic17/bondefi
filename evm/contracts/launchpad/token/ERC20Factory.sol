// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";

import "./ERC20Token.sol";

contract ERC20Factory {
  address public baseContract;

  event ERC20Created(address indexed contractAddress);
  event ERC20BaseUpdated(address indexed contractAddress);

  constructor(address _baseContract) {
    baseContract = _baseContract;
  }

  //TODO: deploy using create2 to use the same address across different chains
  function createERC20(
    string memory name,
    string memory symbol,
    address admin,
    address minter
  ) external returns (address) {
    address newContract = Clones.clone(baseContract);
    ERC20Token(newContract).initialize(name, symbol, admin, minter);
    emit ERC20Created(newContract);
    return newContract;
  }
}
