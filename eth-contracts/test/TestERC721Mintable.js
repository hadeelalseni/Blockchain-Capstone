//var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');
var ERC721Mintable = artifacts.require('ERC721Mintable');
var verifier = artifacts.require('Verifier');

contract('TestERC721Mintable', accounts => {
     
    const account_one = accounts[0];
    const account_two = accounts[1];
    const baseURI  = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
    var _totalSubbly = 0;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            //this.contract = await ERC721MintableComplete.new({from: account_one});
            //this.contract = await ERC721Mintable.new({from: account_one});

            // TODO: mint multiple tokens

            let name   = "Hadeel Alsini";
            let symbol = "H.A";
            try{
                var verifierMe = await verifier.new({from: account_one});
                this.contract = await ERC721Mintable.new(verifierMe.address, {from: account_one});
            }catch(error){
                console.log("error in beforeeach: ", error);
            }
            
            
            //this.contract = await ERC721Mintable.new(name, symbol, baseURI, {from: account_one});

            // Mint 01
            const tokenId01 = 01;
            const account01 = accounts[2];
            await this.contract.mint(account01, tokenId01, {from: account_one});
            _totalSubbly = _totalSubbly + 1;
            //console.log("NAME: "+await ERC721Mintable.methods.getName());

            // Mint 02
            const tokenId02 = 02;
            const account02 = accounts[3];
            //let token02 = await ERC721Mintable.new(name, symbol, baseURI,{from: account_one});
            await this.contract.mint(account02, tokenId02, {from: account_one});
            _totalSubbly = _totalSubbly + 1;
            
            // Mint 03
            const tokenId03 = 03;
            const account03 = accounts[4];
            //let token03 = await ERC721Mintable.new(name, symbol, baseURI,{from: account_one});
            await this.contract.mint(account03, tokenId03, {from: account_one});
            _totalSubbly = _totalSubbly + 1;

            // Mint 04         
            const tokenId04 = 04;
            const account04 = accounts[5];
            //let token04 = await ERC721Mintable.new(name, symbol, baseURI,{from: account_one});
            await this.contract.mint(account04, tokenId04, {from: account_one});
            _totalSubbly = _totalSubbly + 1;
            // Mint 05         
            const tokenId05 = 05;
            const account05 = accounts[6];
            //let token05 = await ERC721Mintable.new(name, symbol, baseURI,{from: account_one});
            await this.contract.mint(account05, tokenId05, {from: account_one});
            _totalSubbly = _totalSubbly + 1;
        })

        it('should return total supply', async function () { 
            let totalSubbly = await this.contract.totalSupply();
            console.log(totalSubbly);
            assert.equal(totalSubbly,_totalSubbly,"Total subblu did not match.");
            
        })

        it('should get token balance', async function () { 
             // Mint 02
             const tokenId02 = 02;
             const account02 = accounts[3];
             //let token02 = await ERC721Mintable.new(name, symbol, baseURI,{from: account_one});
            //await this.contract.mint(account02, tokenId02, baseURI, {from: account_one});
            let tokenBalance = await this.contract.balanceOf(account02);
            assert.equal(tokenBalance, 1, "the number of tokens owned by thos addres is wrong.");
            
        })

        it('should return token uri', async function () { 
            const tokenId02 = 02;
            let base = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2";
            let uri = await this.contract.tokenURI(tokenId02);//.call(tokenId02);
            assert.equal(uri, base, "URI did not match.");
            
        })

        it('should transfer token from one owner to another', async function () { 
            const account04 = accounts[5];
            const tokenId03 = 03;
            const account03 = accounts[4];
            let owner = account03;
            let to = account04;
            //await this.contract._transferFrom(owner, to, tokenId03).call({from: owner});
            await this.contract.From(owner, to, tokenId03, {from: owner});
            let newOwner = await this.contract.ownerOf(tokenId03);
            assert.equal(newOwner, to, "The token did not transfered to another owner.");
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            var verifierMe = await verifier.new({from: account_one});
            this.contract = await ERC721Mintable.new(verifierMe.address, {from: account_one});
            //this.contract = await ERC721Mintable.new({from: account_one});
            let name     = "Hadeel Alsini";
            let symbol   = "H.A";
            let baseURI  = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1"

            //this.contract = await ERC721Mintable.new(name, symbol, baseURI, {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            const tokenId06 = 06;
            const account06 = accounts[7];
            let flag = true;
            try{
                await this.contract.mint(account06, tokenId06, {from: account_two});
            }catch(err){
                //console.log("in catch that is mean the test successed. :)");
                flag = false;
            }            
            assert.equal(flag, false);
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner({from: account_one});
            assert.equal(owner, account_one,"The owner did not match. :L");
            
        })

    });
})