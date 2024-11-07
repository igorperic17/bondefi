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

  function calculateSaleReturn(
    // uint256 startingPrice,
    uint256 supply,
    uint256 connectorBalance,
    uint32 connectorWeight,
    uint256 sellAmount
  ) external view returns (uint256);

  function calculateCrossReserveReturn(
    // uint256 startingPrice,
    uint256 fromConnectorBalance,
    uint32 fromConnectorWeight,
    uint256 toConnectorBalance,
    uint32 toConnectorWeight,
    uint256 amount
  ) external view returns (uint256);
}
