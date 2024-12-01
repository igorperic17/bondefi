// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface PoolManager {
  function positionManager() external returns (address);

  function uniswapFactory() external returns (address);

  function createPoolAndAddLiquidity(
    address token0,
    address token1,
    uint256 amount0Desired,
    uint256 amount1Desired,
    uint24 feeTier //100% = 1000000
  ) external;
}
