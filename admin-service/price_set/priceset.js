const utils = require("../utils");
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const contract = require("./LctPrice.json");
const { ethers } = require("ethers");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {
  try {

      const SmartContractAddress = contract.networks[56].address;
      const SmartContractABI = contract.abi;
      const address = "0xc1C6C591CE35040BcdB97b8804f416aCDe4e0Fbd"
      const privatekey = "852bd29840031532729d4e1982ebf848aff18300d57d50b30ea77d41096222b5";
      const rpcurl = "https://bsc.getblock.io/c873d1a2-990d-4dbd-8d14-025c58db2ccc/mainnet/";
      console.log("***Started***");
    

      const provider = new Provider(privatekey, rpcurl);
      const web3 = new Web3(provider);
      const myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=local-traders&vs_currencies=bnb`);
      const price = response.data['local-traders']['bnb']

      
      const checkOldPrice = await myContract.methods.getTokenPrice().call();
      console.log("checkOldPrice in wei", checkOldPrice)
      const oldPrice = parseFloat(Web3.utils.fromWei(checkOldPrice));
      
      console.log("USD PRICE:  ", price, "old Price", oldPrice);


      const unitPrice = price.toFixed(7);
      const   unitPriceOld = oldPrice.toFixed(7);
      console.log(unitPrice, unitPriceOld, "NOW")
      if(unitPrice == unitPriceOld){
        return utils.send(200, {
          realPrice: price,
          unitPrice,
          unitPriceOld,
          opration: "Currently We are checking with 4 decimal places  and round off",
          realOldPrice: oldPrice, 
          message: "old price can be used"

        });
      }else{
        const call = await myContract.methods.handleSetTokenPrice(Web3.utils.toWei(price.toString(), "ether")).  send({
            from: address
          });
          
            console.log(call)    
          console.log("done with all things");      
        return utils.send(200, {
          price, 
          message: "New price set"
        });
      }

      

     
  } catch (error) {
    console.log("Error", error)

    return utils.send(400, {
      message: "Price did not set Something went wrong",
      trace: JSON.stringify(error),
    });
  }
};