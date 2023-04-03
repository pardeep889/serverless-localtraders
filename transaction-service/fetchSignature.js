const utils = require("./utils");
const ethers = require("ethers");


module.exports.handler = async (request) => {
  

  try {
    const message = Date.now();

    let privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';

    let wallet = new ethers.Wallet(privateKey);
    let messageHash = ethers.keccak256(
        ["address", "uint256"],
        [wallet.address, message]
      );
      console.log("messageHash", messageHash)
    let flatSig = await wallet.signMessage(messageHash);
    console.log("flatSig", flatSig);

    return utils.send(200, { message: "Signature retrieved successfully", signature: flatSig});
  } catch (error) {
    console.log(error)
    return utils.send(500, { message: "Something Went wrong", error: JSON.stringify(error)});
  }
};
