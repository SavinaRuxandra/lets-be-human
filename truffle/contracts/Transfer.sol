//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Transfer {

    constructor() payable {}

    function pay(address payable _to) public payable {
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

}