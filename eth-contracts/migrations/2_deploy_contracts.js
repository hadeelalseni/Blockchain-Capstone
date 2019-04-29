// migrating the appropriate contracts
var verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC721Mintable = artifacts.require("./ERC721Mintable.sol");

module.exports = function(deployer) {
/*  let verifierAddress = '0x533c017Df55E27A7Eba6A6eff26d8635EDa1dc56';
  deployer.deploy(verifier, verifierAddress).then(()=>{
    return deployer.deploy(SolnSquareVerifier, verifier.address).then(() => {
      let config = {
        localhost: {
            url: 'http://localhost:7545',
            verifierAdd: verifier.address,
            SolnSquareVerifierAdd: SolnSquareVerifier.address
        }
      }
    })
  })*/


  deployer.deploy(verifier).then(() => 
  deployer.deploy(SolnSquareVerifier, verifier.address));
}


