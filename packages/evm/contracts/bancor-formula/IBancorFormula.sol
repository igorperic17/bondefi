// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBancorFormula {
  function calculatePurchaseReturn(
    uint256 startingPrice,
    uint8 decimals,
    uint256 supply,
    uint256 reserveBalance,
    uint32 reserveRatio,
    uint256 depositAmount
  ) external view returns (uint256);

  function calculateTokenPrice(
    uint256 startingPrice,
    uint8 tokenDecimals,
    uint256 collateralReserves,
    uint256 tokenSupply,
    uint32 reserveRatio
  ) external pure returns (uint256);

  function maxRatio() external pure returns (uint32);
}
