// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
    uint256 storedData;
    mapping(address => uint256) public balance;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function request(uint256 amount) external {
        balance[msg.sender] = balance[msg.sender] + amount;
    }

    function getBalance(address _addr) external view returns (uint256) {
        return balance[_addr];
    }
}
