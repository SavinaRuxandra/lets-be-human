const Transfers = artifacts.require("Transfers");

module.exports = function(deployer) {
  deployer.deploy(Transfers);
};