var Credential = artifacts.require("./Credential.sol");

module.exports = function(deployer) {
  deployer.deploy(Credential);
};
