//SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract CharityOrganizations {

    struct CharityOrganization {
	    address accountAddress;
        string email;
        string name;
        string description;
        string phoneNumber;
    }
    
    mapping(address => CharityOrganization) private charityOrganization;
    CharityOrganization[] private charityOrganizations;

    function addCharityOrganization(address accountAddress, string memory email, string memory name, string memory description, string memory phoneNumber) public {
        charityOrganization[accountAddress] = CharityOrganization(accountAddress, email, name, description, phoneNumber);
        charityOrganizations.push(charityOrganization[accountAddress]);
    }

    function updateCharityOrganization(address accountAddress, string memory email, string memory name, string memory description, string memory phoneNumber) public {
        charityOrganization[accountAddress] = CharityOrganization(accountAddress, email, name, description, phoneNumber);
        for(uint i=0; i < charityOrganizations.length; i++)
            if(charityOrganizations[i].accountAddress == accountAddress)
                charityOrganizations[i] =  CharityOrganization(accountAddress, email, name, description, phoneNumber);
    }

    function getCharityOrganizationByAddress(address accountAddress) view public returns (CharityOrganization memory) {
        return charityOrganization[accountAddress];
    }

    function getAllCharityOrganizations() view public returns (CharityOrganization[] memory) {
        return charityOrganizations;
    }
}