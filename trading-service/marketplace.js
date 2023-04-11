const utils = require("./utils");
const AWS = require("aws-sdk");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {
  try {
    const lctData = await (await axios.get("https://www.coingecko.com/price_charts/27936/usd/90_days.json")).data;

    return utils.send(200, {
      message: "currencies retrieved successfully",
      marketData: {
        lctData
      },
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to retrieve marketplace",
      error: JSON.stringify(error),
    });
  }
};
