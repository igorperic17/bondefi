// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract ERC20Token is AccessControl, ERC20Burnable, Pausable {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

  string private _name;
  string private _symbol;

  constructor() ERC20("", "") {}

  function initialize(
    string calldata tokenName,
    string calldata tokenSymbol,
    address admin,
    address minter
  ) external {
    _name = tokenName;
    _symbol = tokenSymbol;
    _grantRole(DEFAULT_ADMIN_ROLE, admin);
    _grantRole(MINTER_ROLE, minter);
    _grantRole(PAUSER_ROLE, admin);
  }

  function name() public view virtual override returns (string memory) {
    return _name;
  }

  function symbol() public view virtual override returns (string memory) {
    return _symbol;
  }

  function mint(address to, uint256 amount) external virtual {
    require(
      hasRole(MINTER_ROLE, _msgSender()),
      "ERC20Token: must have minter role to mint"
    );
    require(!paused(), "minting while paused");
    _mint(to, amount);
  }

  function pause() external virtual {
    require(
      hasRole(PAUSER_ROLE, _msgSender()),
      "ERC20Token: must have pauser role to pause"
    );
    _pause();
  }

  function unpause() external virtual {
    require(
      hasRole(PAUSER_ROLE, _msgSender()),
      "ERC20Token: must have pauser role to unpause"
    );
    _unpause();
  }
}
