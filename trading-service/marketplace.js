const utils = require("./utils");
const AWS = require("aws-sdk");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {
  try {
    const lctData = await (await axios.get("https://www.coingecko.com/price_charts/27936/usd/24_hours.json")).data;
    const btcData = await (await axios.get("https://www.coingecko.com/price_charts/27936/btc/24_hours.json")).data;
    const ethData = await (await axios.get("https://www.coingecko.com/price_charts/27936/eth/24_hours.json")).data;

    return utils.send(200, {
      message: "currencies retrieved successfully",
      marketData: {
        lctData,
        ethData,
        btcData,
      },
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to retrieve marketplace",
      error: JSON.stringify(error),
    });
  }
};
