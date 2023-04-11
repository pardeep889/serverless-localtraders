const utils = require("./utils");
const AWS = require("aws-sdk");
const { default: axios } = require("axios");
const dataCOIN = require("./templatedata");

module.exports.handler = async (request) => {
  try {
    // const URL =
    //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d";
    // const currencies = await axios.get(URL);
    const targetSymbols = new Set(
      ["bnb", "btc", "eth", "usdt", "usdc", "busd"].map((val) =>
        val.toLowerCase()
      )
    );
    // const result = currencies?.data?.reduce((filtered, filterValue) => {
    //   const { symbol } = filterValue;
    //   if (targetSymbols.has(symbol.toLowerCase())) {
    //     filtered.push(filterValue);
    //   }
    //   return filtered;
    // }, []);

    let lctObject = {};

    try {
      const LCDTURL = "https://api.coingecko.com/api/v3/coins/collectcoin-2";
      const lcdResponse = await axios.get(LCDTURL);
      const newResp = lcdResponse?.data;

      const restructureResp = {
        id: newResp?.meta?.id,
        symbol: "LCT",
        name: "Localtraders",
        image:
          "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/LCT3.png",
        current_price: newResp?.market_data?.current_price?.usd,
        market_cap: newResp?.market_data?.market_cap?.usd,
        market_cap_rank: newResp?.market_cap_rank,
        high_24h: newResp?.market_data?.high_24h?.usd,
        price_change_24h: newResp?.market_data?.price_change_24h,
        price_change_percentage_24h:
          newResp?.market_data?.price_change_percentage_24h,
        market_cap_change_24h: newResp?.market_data?.market_cap_change_24h,
        market_cap_change_percentage_24h:
          newResp?.market_data?.market_cap_change_percentage_24h,
        price_change_percentage_7d_in_currency:
          newResp?.market_data?.price_change_percentage_24h_in_currency?.usd,
        total_volume: newResp?.market_data?.total_volume?.usd,
        low_24h: newResp?.market_data?.low_24h?.usd,
        circulating_supply: newResp?.market_data?.circulating_supply,
        total_supply: newResp?.market_data?.total_supply,
        max_supply: newResp?.market_data?.max_supply,
        sparkline_in_7d: {
          price: [ null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null],
        },
        full_data: newResp,
      };
      lctObject = restructureResp;
    } catch (error) {
      lctObject = {
        symbol: "LCT",
        name: "Localtraders",
        image:
          "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/LCT3.png",
        current_price: 0.01477266,
        market_cap: 0,
        market_cap_rank: null,
        high_24h: 0.01568689,
        price_change_24h: -0.000549959216251,
        price_change_percentage_24h: -3.5892,
        market_cap_change_24h: 0,
        market_cap_change_percentage_24h: 0,
        price_change_percentage_7d_in_currency: -3.5892,
        total_volume: 10323.84,
        low_24h: 0.01477022,
        circulating_supply: 0,
        total_supply: 100000000,
        max_supply: 100000000,
        sparkline_in_7d: {},
        full_data: null
      };
    }

    const result = dataCOIN.reduce((filtered, filterValue) => {
      const { symbol } = filterValue;
      if (targetSymbols.has(symbol.toLowerCase())) {
        filtered.push(filterValue);
      }
      return filtered;
    }, []);

    return utils.send(200, {
      message: "currencies retrieved successfully",
      data: [...result, lctObject],
    });
  } catch (error) {
    console.log("pardeep", error);
    return utils.send(400, {
      message: "Unable to retrieve currencies",
      error: JSON.stringify(error),
    });
  }
};
