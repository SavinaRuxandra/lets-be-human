const Transfer = artifacts.require("Transfer");
const Donor = artifacts.require("Donor");
const CharityOrganizations = artifacts.require("CharityOrganizations");

module.exports = function(deployer) {
  deployer.deploy(Transfer);
  deployer.deploy(Donor);
  deployer.deploy(CharityOrganizations)
};