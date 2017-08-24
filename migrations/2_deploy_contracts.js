var BillCollectionContract = artifacts.require("./BillCollectionContract.sol");

module.exports = function(deployer) {
  deployer.deploy(BillCollectionContract);
};
