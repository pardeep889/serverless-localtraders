const utils = require("./utils");
const AWS = require("aws-sdk");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {
  try {
    const lctData = await (await axios.get("https://api.coingecko.com/api/v3/coins/local-traders/market_chart?vs_currency=usd&days=90")).data;

    return utils.send(200, {
      message: "currencies retrieved successfully",
      marketData: {
        lctData
      },
    });
  } catch (error) {
    console.log(error)
    return utils.send(400, {
      message: "Unable to retrieve marketplace",
      error: JSON.stringify(error),
    });
  }
};
