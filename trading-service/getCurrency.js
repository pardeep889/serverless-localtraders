const utils = require("./utils");
const AWS = require("aws-sdk");
const { default: axios } = require("axios");

module.exports.handler = async (request) => {

  try {
    const URL='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d'
    const currencies = await axios.get(URL)
    const targetSymbols = new Set(['bnb', 'btc', 'eth','usdt','usdc','busd'].map((val) => val.toLowerCase()));
    const result = currencies?.data?.reduce((filtered, filterValue) => {
      const {symbol } = filterValue;
      if (targetSymbols.has(symbol.toLowerCase())) {
        filtered.push(filterValue);
      }
      return filtered;
    }, []);

    return utils.send(200, { message: "currencies retrieved successfully", data:result });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve currencies", error });
  }
};
