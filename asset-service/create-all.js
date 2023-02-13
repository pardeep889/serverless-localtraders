const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const utils = require("./utils");

const assets = [
  { symbol: "btc", assetName: "Bitcoin", balance: 0 },
  { symbol: "eth", assetName: "Ethereum", balance: 0 },
  { symbol: "bnb", assetName: "Binance Coin", balance: 0 },
  { symbol: "tet", assetName: "Tether", balance: 0 },
  { symbol: "lct", assetName: "LOCAL TRADERS", balance: 0 },
  { symbol: "usdc", assetName: "USD COIN", balance: 0 },
  { symbol: "busd", assetName: "Binance USD", balance: 0 },
];

module.exports.handler = async (requst) => {
  if (!requst.body) {
    return utils.send(400, {
      message: "request body is missing!",
    });
  }

  const body = JSON.parse(requst.body);
  if (!body?.userId) {
    return utils.send(400, {
      message: "userId is missing from body.",
    });
  }
  const userId = body.userId;
  // wallet setup
  try {
    await utils.initalizeWallet(userId);
  } catch (err) {
    return utils.send(400, {
      message: "something went wrong during wallet setup",
      error: "" + err,
    });
  }
  try {
    // create assets for userId
    await utils.createAssetsForUser(userId, assets);
    return utils.send(200, {
      message: "wallet and assets created successfully.",
    });
  } catch (err) {
    return utils.send(400, {
      message: "unable to create assets for user",
      error: "" + err,
    });
  }
};
