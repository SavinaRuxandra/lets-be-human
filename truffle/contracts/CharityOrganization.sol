//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract CharityOrganizations {

    struct CharityOrganization {
        string email;
        string name;
        string description;
        string phoneNumber;
    }
    
    mapping(address => CharityOrganization) private charityOrganization;
    CharityOrganization[] private charityOrganizations;

    function addCharityOrganization(address accountAddress, string memory email, string memory name, string memory description, string memory phoneNumber) public {
        charityOrganization[accountAddress] = CharityOrganization(email, name, description, phoneNumber);
        charityOrganizations.push(charityOrganization[accountAddress]);
    }

    function getCharityOrganizationByAddress(address accountAddress) view public returns (CharityOrganization memory) {
        return charityOrganization[accountAddress];
    }

    function getAllCharityOrganizations() view public returns (CharityOrganization[] memory) {
        return charityOrganizations;
    }
}