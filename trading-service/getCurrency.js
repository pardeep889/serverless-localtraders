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

    // second api

    const LCDTURL = "https://widget.nomics.com/api/assets/LCT3/BUSD/"
    const lcdResponse = await axios.post(LCDTURL)
    const newResp = lcdResponse?.data

    const restructureResp = {
      "id" : newResp?.meta?.id,
      "symbol": newResp?.meta?.symbol,
      "name": newResp?.meta?.name,
      "image": newResp?.meta?.logo_url,
      "current_price": newResp?.meta?.price,
      "market_cap": newResp?.meta?.market_cap_dominance,
      "market_cap_rank": newResp?.meta?.rank,
      "high_24h": newResp?.meta?.high,
      "price_change_24h": newResp?.day.price_change,
      "price_change_percentage_24h": newResp?.day.price_change_pct,
      "market_cap_change_24h": newResp?.day.volume_change,
      "market_cap_change_percentage_24h": newResp?.day.volume_change_pct,
      "ath_date": newResp?.meta?.price_timestamp,
      "last_updated": newResp?.meta?.price_timestamp,
      "sparkline_in_7d": {
        "price" : newResp?.history
      }
    }

    return utils.send(200, { message: "currencies retrieved successfully", data:[...result,restructureResp] });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve currencies", error });
  }
};
