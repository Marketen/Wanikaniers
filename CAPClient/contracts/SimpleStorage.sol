// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  event test(address from, uint number);

  function set(uint x) public {
    storedData = x;
    emit test(msg.sender, x);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
