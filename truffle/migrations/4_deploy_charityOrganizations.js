const CharityOrganizations = artifacts.require("CharityOrganizations");

module.exports = function(deployer) {
  deployer.deploy(CharityOrganizations)
};