// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import "../../lib/uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";

/*
    Mock contract that informs about what function has been called by emitting the function selector.

    It's possible to retrieve the function called with a snippet like this:

    const ethers = require("ethers");

    const abi = [
        // Add the ABI of your contract here
    ];
    const iface = new ethers.utils.Interface(abi);

    const selector = "0x12345678"; // Replace with the emitted selector
    const functionName = iface.getFunction(selector).name;
    console.log("Function name:", functionName);

    This contract needs to be improved to handle mocking return values, otherwise it will revert when a return value is expected

*/

contract MockContract {
  event FunctionSelector(bytes4 selector);
  event EthReceived(uint256 amount);

  fallback() external payable {
    bytes4 selector;

    if (msg.data.length >= 4) {
      selector = msg.sig;
    }

    emit FunctionSelector(selector);
  }

  receive() external payable {
    emit EthReceived(msg.value);
  }
}
