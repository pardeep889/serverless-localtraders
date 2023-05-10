const utils = require("../utils");
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const contract = require("./LctPrice.json");
const { ethers } = require("ethers");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {
  try {

      const SmartContractAddress = contract.networks[80001].address;
      const SmartContractABI = contract.abi;
      const address = "0x02F6f4E73E637543F2DF7D13B2ef2a076d112B5B"
      const privatekey = "f600bcbee9f9b691a450d1b264b4745ba82636f8cbe57748e181c345044a7287";
      const rpcurl = "https://polygon-mumbai.infura.io/v3/5d8b8285309649889e9e7f875f0c4294";
      console.log("***Started***");
      const provider = new Provider(privatekey, rpcurl);
      const web3 = new Web3(provider);
      const myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=local-traders&vs_currencies=usd`);
      const price = response.data['local-traders']['usd']

      console.log("USD PRICE:  ", price)

      const call = await myContract.methods.handleSetTokenPrice(Web3.utils.toWei(price.toString(), "ether")).send({
        from: address
      });

        console.log(call)

        console.log("done with all things");

          
    return utils.send(200, "ok");
  } catch (error) {
    console.log("Error", error)

    return utils.send(400, {
      message: "You are not Admin",
    });
  }
};