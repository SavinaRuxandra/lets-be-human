//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Donor {
    
    mapping(address => string) private donor;

    function getDonorUsername(address accountAddress) public view returns (string memory) {
        return donor[accountAddress];
    }

    function setDonorUsername(address accountAddress, string calldata username) public {
        donor[accountAddress] = username;
    }
}