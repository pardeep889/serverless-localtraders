const utils = require("./utils");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {

  try {
    const LCDTURL = "https://widget.nomics.com/api/assets/LCT3/BUSD/"
    const lcdResponse = await axios.post(LCDTURL)
  
    return utils.send(200, { message: "request successfully", data:lcdResponse?.data });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve market-cap for lct", erro:error+"" });
  }
};
