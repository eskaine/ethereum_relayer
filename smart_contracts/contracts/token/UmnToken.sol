//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../../interfaces/UmnTokenInterface.sol";

uint256 constant MAX_TOKEN = 1000000;

contract UmnToken is ERC20, UmnTokenInterface {
    mapping(address => uint256) private _balances;
    uint32 private _ethToUmn = 1;
    uint256 private _remainingAmount = MAX_TOKEN * 10**uint(decimals());

    event BuyEvent(address indexed _purchaser, uint _amount);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, _remainingAmount);
    }

    function buy(address purchaser, uint256 amount) external {
        _reduceAmount(amount);
        _balances[purchaser] += amount;
        
        emit BuyEvent(purchaser, amount);
    }

    function _reduceAmount(uint256 amount) internal {
        require(_remainingAmount >= amount, "Insufficient UMN token!");
        _remainingAmount -= amount;
    }
}
