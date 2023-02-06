const utils = require("./utils");
const AWS = require("aws-sdk");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {

  try {

    const API_KEY = "6a2b84bd-59b5-409b-83ec-2dd38d982e4d"
    const URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    
   const currencies = await axios.get(URL, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY
      }
    })
    return utils.send(200, { message: "currencies retrieved successfully", data:currencies?.data?.data });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve currencies", error });
  }
};
