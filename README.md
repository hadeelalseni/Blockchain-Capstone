# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Steps to run the project: 
- `npm install`
- `npm install openzeppelin-solidity`
- `truffle compile`
- `truffle migrate --reset`
- `truffle test test/TestERC721Mintable.js`
- `truffle test test/TestSquareVerifier.js`
- `truffle test test/TestSolnSquareVerifier.js`
- `truffle migrate --network rinkeby`

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

#Steps from mentor: 
Also, since you're most likely using an updated version of zokrates, you'll need to modify the instructions a bit:

Here are the steps I did:

- Deleted all files under zokrates/code/square except square.code
- docker run -v //c/Users/Hadeel/Desktop/Hadeel-Blockchain-Capstone/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash
- Ran docker and mounted the directory
- Inside the vm, cd code/square
- Typed ls to make sure that nothing is there except square.code
- ~/zokrates compile -i square.code
- ~/zokrates setup --proving-scheme pghr13
- ~/zokrates compute-witness -a 3 9
- ~/zokrates generate-proof --proving-scheme pghr13
- ~/zokrates export-verifier --proving-scheme pghr13
- exited the vm
- removed the preceeding zeros in the input array of proof.json
- Deleted the existing Verifier.sol in eth-contracts/contracts and replaced it with the newly generated - - Verifier.sol under zokrates/code/square
- Deleted the existing build folder with rm -rf build
- truffle compile
- truffle test
- Now verifyTx outputs true when given a valid proof!





- `git push -f origin master`