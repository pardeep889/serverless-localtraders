const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyAdmin } = require("./token");
const { default: axios } = require("axios");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const ListTokens = {
  btc: "bitcoin",
  bnb: "binancecoin",
  busd: "binance-usd",
  eth: "ethereum",
  usdc: "usd-coin",
  tet: "tether",
};

const convertToUsd = async (from, to) => {
  const tokenId = ListTokens[from];
  console.log({ tokenId, to });
  const resp = await axios.get(
    `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`
  );
  console.log("##### from to #####", resp.data);

  // const resp = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=${to}`);
  // const currentTokenPrice = resp.data ? resp.data[ListTokens[from]]: 0
  return Object.values(resp.data)[0];
};

const getSymbolsDetails = async (fromSymbol, toSymbol) => {
  const coingecko = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
  );

  const targetSymbols = new Set(
    [fromSymbol, toSymbol].map((val) => val.toLowerCase())
  );
  const result = coingecko?.data?.reduce((filtered, filterValue) => {
    const { symbol } = filterValue;
    if (targetSymbols.has(symbol.toLowerCase())) {
      // filtered.push(filterValue);
      filtered[symbol] = filterValue;
    }
    return filtered;
  }, {});
  return result;
};

const getUser = async (email) => {
  const params = {
    TableName: "User",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  const result = await dynamoDb.scan(params).promise();
  return result.Items[0];
};

const checkIfAssetExitsForSymbol = async (symbol, userId) => {
  console.log({ symbol, userId });
  // check if user exist in our db
  const paramsScan = {
    TableName: "Asset",
    FilterExpression: "symbol = :symbol and userId = :userId",
    ExpressionAttributeValues: {
      ":symbol": symbol,
      ":userId": userId,
    },
  };

  const data = await dynamoDb.scan(paramsScan).promise();
  console.log({ data });
  return data.Items[0];
};

module.exports.handler = async (request) => {
  try {
    // const isVerified = await verifyAdmin(request);
    // if (isVerified.statusCode === 401) {
    //   return {
    //     statusCode: 401,
    //     body: JSON.stringify({
    //       isVerified: false,
    //       error: "Access Forbidden",
    //     }),
    //   };
    // }

    if (!request.body) {
      return utils.send(400, {
        message: "request body is missing!",
      });
    }

    let body;
    try {
      body = JSON.parse(request.body);
    } catch (err) {
      return utils.send(400, {
        message: "request for add body is not a valid JSON",
      });
    }

    if (!body.fromSymbol || !body.toSymbol || !body.amount || !body.userId) {
      return utils.send(400, {
        message: "missing fromSymbol, userId,toSymbol or amount the body",
      });
    }

    let { toSymbol, amount, fromSymbol, userId } = body;

    const fromAssetBalance = await utils.retrieveAssetBalance(
      userId,
      fromSymbol
    );
    console.log("sender rr##### ", { fromAssetBalance });

    if (!fromAssetBalance) {
      return utils.send(400, {
        message: ` user doesn't exists or  doesn't have ${symbol} symbol`,
      });
    }

    if (parseFloat(fromAssetBalance?.balance) < +amount) {
      return utils.send(400, {
        message: "user with this asset doesn't have sufficient balance to swap",
      });
    }

    const updated_balance_of_from_symbol =
      parseFloat(fromAssetBalance?.balance) - amount;
    console.log({ updated_balance_of_from_symbol });

    // get latest token price
    const resp = await convertToUsd(fromSymbol, toSymbol);
    const amountToBeAddedInToSymbol = +resp * +amount;
    // const resp = await getSymbolsDetails(fromSymbol,toSymbol,amount)
    console.log(amountToBeAddedInToSymbol);

    // get the balance of receipient for required symbol
    const toSymbolResp = await utils.retrieveAssetBalance(userId, toSymbol);
    console.log("receipent rr##### ", { toSymbolResp });

    if (!toSymbolResp) {
      return utils.send(400, {
        message: `user doesn't exists or  doesn't have ${toSymbol} toSymbol`,
      });
    }

    const updated_balance_of_to_symbol =
      parseFloat(toSymbolResp?.balance) + amountToBeAddedInToSymbol;
    console.log({ updated_balance_of_to_symbol });

    // update balance for sender and receiver
    await utils.updateBalance(fromAssetBalance.assetId, updated_balance_of_from_symbol);
    await utils.updateBalance(
        toSymbolResp.assetId,
      updated_balance_of_to_symbol
    );

    // create transactions
    // await utils.createTransaction(userId, userId, amount, symbol, "swap");

    return utils.send(200, {
      message: "funds SWAP successfuly",
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to SWAP funds. something went wrong",
      error: error + "",
    });
  }
};
