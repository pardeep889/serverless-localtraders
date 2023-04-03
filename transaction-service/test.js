const ethers = require("ethers")


const callme = async() =>{
    const timestamp = Date.now();

    
    const message = ethers.utils.solidityKeccak256(
        ['address', 'address', 'address'],
        [
          process.env.CONTRACT_ADDRESS,
          process.env.ADMIN_ADDRESS,
          timestamp,
        ],
      );

      const arrayifyMessage = ethers.utils.arrayify(message);
      const flatSignature = await new ethers.Wallet(process.env.PRIVATE_KEY).signMessage(arrayifyMessage);


}
    
callme()

//   console.log("messageHash", messageHash)
// let flatSig =  wallet.signMessage(messageHash);
// console.log("flatSig", flatSig);
