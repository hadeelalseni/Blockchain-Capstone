pragma solidity >=0.4.21 <0.6.0;
//pragma solidity ^0.5.2;

import './ERC721Mintable.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './Verifier.sol';
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable{
    Verifier public verifier;
    constructor(address verifierAddress) public{
        verifier = Verifier(verifierAddress);
    }
    // TODO define a solutions struct that can hold an index & an address
    // DONE :)
    struct Solution{
        uint _index;
        address _solAddress;
    }
    // TODO define an array of the above struct 
    // DONE :)
    Solution[] solutions;
    // TODO define a mapping to store unique solutions submitted
    // DONE :)
    mapping(address => Solution) uniqueSolutions;
    // TODO Create an event to emit when a solution is added
    // NOT SURE ABOUT PARAMETER :/
    event SolutionAdded(address solver);
    // TODO Create a function to add the solutions to the array and emit the event
    // DONE :)
    function addSolution(uint256 index, address solver)public {
        solutions.push(Solution(index, solver));
        emit SolutionAdded(solver);
    }
    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    mapping(bytes32 => address) solutionKeyToSolverMapping;
    function mintNewToken(address solver, uint256 index, uint[2] memory a, uint[2] memory a_p,
     uint[2][2] memory b, uint[2] memory b_p, uint[2] memory c, uint[2] memory c_p,
      uint[2] memory h, uint[2] memory k, uint[2] memory input) public returns(bool){
//Optionally you could also store the hash of the solution. Also, I want to mention that every solution MUST be unique, the CAN’T be two solutions that are equal. To verify that you can hash the solutions and use the hash as a key for a mapping of solutions
// I got this comment above from student knowldge and I hope I understood it and implement it right :)
        bytes32 solutionKey = keccak256(abi.encodePacked(a, a_p,b, b_p, c, c_p, h, k, input));
        require(solutionKeyToSolverMapping[solutionKey] == address(0), "The solution is submitted before.!");
        
        require((verifier.verifyTx(a, a_p,b, b_p, c, c_p, h, k, input) == true)," The prove you gave is wrong.");

        solutionKeyToSolverMapping[solutionKey] = solver;
        addSolution(index, solver);
        return mint(solver, index, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/");
        //super.mint(to, tokenId);
    }



}
  
