//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
import '../../interfaces/IUmnToken.sol';

uint256 constant MAX_TOKEN_MODIFIER = 10000;

contract UmnToken is ERC2771Context, ERC20, IUmnToken {
    mapping(address => uint256) private _balances;
    uint256 private _remainingAmount = MAX_TOKEN_MODIFIER * 10**uint(decimals());

    event Bought(address indexed who, uint256 amount);

    modifier enoughAmount(uint256 amount) {
        require(_remainingAmount >= amount, 'Insufficient UMN token!');
        _;
    }

    constructor(MinimalForwarder forwarder, string memory name, string memory symbol) ERC2771Context(address(forwarder)) ERC20(name, symbol) {
        _mint(msg.sender, _remainingAmount);
    }

    function buy(uint256 amount) external {
        _reduceAmount(amount);
        address owner = _msgSender();
        _balances[owner] += amount;

        emit Bought(owner, amount);
    }

    function getBalance(address user) external view returns (uint256) {
        return _balances[user];
    }

    function _reduceAmount(uint256 amount) internal enoughAmount(amount) {
        _remainingAmount -= amount;
    }

    function _msgSender() internal view override(Context, ERC2771Context)
      returns (address sender) {
      sender = ERC2771Context._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Context)
      returns (bytes calldata) {
      return ERC2771Context._msgData();
    }
}
