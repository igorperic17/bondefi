// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../lib/uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "../../lib/uniswap/v3-core/contracts/interfaces/IUniswapV3Factory.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PoolManager.sol";

contract UniswapV3LiquidityManager is PoolManager {
  INonfungiblePositionManager private _positionManager;
  IUniswapV3Factory private _uniswapFactory;
  uint24 public constant DEFAULT_FEE_TIER = 3000; // Fee tier of 0.3%
  uint24 public constant MAX_FEE_TIER = 1000000; // 100%

  constructor(address __positionManager, address __uniswapFactory) {
    _positionManager = INonfungiblePositionManager(__positionManager);
    _uniswapFactory = IUniswapV3Factory(__uniswapFactory);
  }

  function positionManager() external view override returns (address) {
    return address(_positionManager);
  }

  function uniswapFactory() external view override returns (address) {
    return address(_uniswapFactory);
  }

  function createPoolAndAddLiquidity(
    address token0,
    address token1,
    uint256 amount0Desired,
    uint256 amount1Desired,
    uint24 feeTier //100% = 1000000
  ) external {
    require(feeTier < MAX_FEE_TIER, "Fee tier too high");
    require(
      _uniswapFactory.getPool(token0, token1, feeTier) == address(0),
      "Pool already exists, cannot create"
    );
    IERC20(token0).approve(address(_positionManager), amount0Desired);
    IERC20(token1).approve(address(_positionManager), amount1Desired);

    _uniswapFactory.createPool(token0, token1, feeTier);

    INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager
      .MintParams({
        token0: token0,
        token1: token1,
        fee: feeTier,
        tickLower: -887272, // Minimum tick range
        tickUpper: 887272, // Maximum tick range
        amount0Desired: amount0Desired,
        amount1Desired: amount1Desired,
        amount0Min: 0,
        amount1Min: 0,
        recipient: msg.sender,
        deadline: block.timestamp + 30 minutes
      });

    (, , uint256 amount0, uint256 amount1) = _positionManager.mint(params);

    require(
      amount0 == 0 && amount1 == 0,
      "Token amounts not 0, pool creation failed"
    );
  }
}
