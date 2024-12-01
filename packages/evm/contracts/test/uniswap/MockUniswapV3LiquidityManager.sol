// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../lib/uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "../../lib/uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "../../lib/uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import ".././../launchpad/uniswap/PoolManager.sol";

contract MockUniswapV3LiquidityManager is PoolManager {
  address public positionManager;
  address public uniswapFactory;
  uint24 public constant DEFAULT_FEE_TIER = 3000; // Fee tier of 0.3%
  uint24 public constant MAX_FEE_TIER = 1000000; // 100%

  event CreatePoolAndAddLiquidityCalled(
    address token0,
    address token1,
    uint256 amount0Desired,
    uint256 amount1Desired,
    uint24 feeTier
  );

  constructor() {}

  function createPoolAndAddLiquidity(
    address token0,
    address token1,
    uint256 amount0Desired,
    uint256 amount1Desired,
    uint24 feeTier //100% = 1000000
  ) external {
    emit CreatePoolAndAddLiquidityCalled(
      token0,
      token1,
      amount0Desired,
      amount1Desired,
      feeTier
    );
  }
}
