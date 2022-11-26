//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Messenger {
    mapping(address => string[]) private _messages;

    function messagesOf(address account) external view returns (string[] memory) {
        return _messages[account];
    }
}
