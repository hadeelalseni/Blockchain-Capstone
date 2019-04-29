// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
// DONE :)
const verifier = artifacts.require('Verifier');
/*var Web3 = require('web3');

if (typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
   } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}*/

// - use the contents from proof.json generated from zokrates steps
// DONE :)
const proofme = require('../../zokrates/code/square/proof');

contract('TestSquareVerifier', accounts =>{
    const account_one = accounts[0];
    const account_two = accounts[1];

    beforeEach('Test verification with in/correct proof', async function(){
        try{
            this.contract = await verifier.new({from: account_one});
        }catch(error){
            console.log("this.contract = await verifier.new({from: account_one}); this line have error :l", error);
        }
        
    })

// Test verification with correct proof
    it('verification with correct proof', async function () {
        let flag = false;
        try{
            if(await this.contract.verifyTx(proofme.proof.A,
                proofme.proof.A_p, proofme.proof.B, proofme.proof.B_p, 
                proofme.proof.C, proofme.proof.C_p, proofme.proof.H, 
                proofme.proof.K, proofme.input)){
                 flag = true;
            }//web3.utils.utf8ToHex
        }catch(error){
            console.log("verification with correct proof ERROR: ", error);
        }
        assert.equal(flag, true,"the proof is wrong.");
    })

// Test verification with incorrect proof
    it('verification with incorrect proof', async function () {
/*        let a = [proofme.proof.A[0], proofme.proof.A[1]];
        let ap = [proofme.proof.A_p[0], proofme.proof.A_p[1]];
        let b = [[proofme.proof.B[0], proofme.proof.B[1]], proofme.proof.B[0], proofme.proof.B[1]];
        let bp = [proofme.proof.B_p[0], proofme.proof.B_p[1]];
        let c = [proofme.proof.C[0], proofme.proof.C[1]];
        let cp = [proofme.proof.C_p[0], proofme.proof.C_p[1]];
        let h = [proofme.proof.H[0], proofme.proof.H[1]];
        let k = [proofme.proof.K[0], proofme.proof.K[1]];
        let input =[proofme.input[0], proofme.input[1]];
        let arr = ['hadeel', 'array'];
        console.log(arr);
        console.log("yarab  a: " + a);
        console.log("yarab  ab: " + ap);
        console.log("yarab  b: " + b);
        console.log(proofme.proof.A[0]);
        console.log(proofme.proof.A);*/
        let flag = true;
    
        try{
            
            //I just swap first two :) 
            if(await this.contract.verifyTx(proofme.proof.A_p, 
                proofme.proof.A, proofme.proof.B, proofme.proof.B_p, 
                proofme.proof.C, proofme.proof.C_p, proofme.proof.H, 
                proofme.proof.K, proofme.input)){
                flag = false
                }
        }catch(error){
            console.log("verification with incorrect proof ERROR: ", error);
        }
        assert.equal(flag, false,"the proof is not wrong.");
    })

})





    

