const Donors = artifacts.require("Donors");

module.exports = function(deployer) {
  deployer.deploy(Donors);
};