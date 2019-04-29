const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const verifier = artifacts.require('Verifier');
const proofme = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Test solution functions', async function () {
        beforeEach(async function (){
            try{
                var verifierMe = await verifier.new({from: account_one});
                this.contract = await SolnSquareVerifier.new(verifierMe.address, {from: account_one});
            }catch(error){
                console.log("error in beforeeach: ", error);
            }
        })
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('a new solution can be added for contract - SolnSquareVerifier', async function(){
            let index = 3;
            let solver = accounts[3];
            try{
                await this.contract.addSolution(index, solver);
                console.log("If event emitted means the test passed. :) ");
            }catch(error){
                console.log("error in new solution can be added for contract: ", error);
            }
        })
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('an ERC721 token can be minted for contract - SolnSquareVerifier', async function(){
            let index = 4;
            let solver = accounts[4];
            let flag = false;
            try{
                if(await this.contract.mintNewToken(solver, index, proofme.proof.A,
                    proofme.proof.A_p, proofme.proof.B, proofme.proof.B_p, 
                    proofme.proof.C, proofme.proof.C_p, proofme.proof.H, 
                    proofme.proof.K, proofme.input)){
                        flag = true;
                }
            }catch(error){
                console.log("error in an ERC721 token can be minted for contract: ", error);
            }
            assert.equal(flag, true,"mint new token false.");
        })

    
    })
})