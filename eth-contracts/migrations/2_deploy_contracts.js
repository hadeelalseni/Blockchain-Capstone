// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");

module.exports = function(deployer) {

  let name   = "Hadeel Alsini";
  let symbol = "H.A";
  let baseURI  = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1"
  //deployer.deploy(SquareVerifier);
  //deployer.deploy(SolnSquareVerifier);
  deployer.deploy(ERC721Mintable, name, symbol, baseURI);
};
