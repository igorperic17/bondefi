// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBancorFormula {
  function calculatePurchaseReturn(
    uint256 startingPrice,
    uint256 supply,
    uint256 connectorBalance,
    uint32 connectorWeight,
    uint256 depositAmount
  ) external view returns (uint256);

  function maxRatio() external view returns (uint32);
}
