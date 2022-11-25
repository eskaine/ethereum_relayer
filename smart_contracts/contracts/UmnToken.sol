//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

uint256 constant MAX_TOKEN = 1000000;

contract UmnToken is ERC20 {
    uint32 private _ethToUmn = 1;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, MAX_TOKEN * 10**uint(decimals()));
    }
}
