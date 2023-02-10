const utils = require("./utils");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { default: axios } = require("axios");

module.exports.handler = async (event) => {
  const { userId } = event.pathParameters;

  if (!userId) {
    return utils.send(400, {
      message: 'The path parameter "userId" is required.',
    });
  }

  try {
    const walletParams = {
      TableName: utils.TABLE_NAME,
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const walletData = await dynamoDb.scan(walletParams).promise();
    if (walletData.Items.length === 0) {
      return utils.send(200, {
        message: "User doesn't created a wallet yet or user doesn't exists.",
        wallet: [],
        assets: [],
      });
    }
    
    const assetParams = {
      TableName: "Asset",
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const assetData = await dynamoDb.scan(assetParams).promise();
    if (assetData.Items.length === 0) {
      return utils.send(200, {
        message: "wallet fetched successfully",
        wallet: {... walletData.Items[0],balance:0},
        assets: [],
      });
    }

    const currencies = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d");
    const usdBalance = currencies?.data?.reduce((totalBalance, filterValue) => {
      const { symbol, current_price: usdPrice } = filterValue;
      assetData.Items.forEach((asset) => {
        if (symbol.toLowerCase() === asset.symbol.toLowerCase()) {
          totalBalance += +usdPrice * +asset.balance;
        }
      });
      return totalBalance;
    }, 0);


	console.log("### usd Balance ###",usdBalance)
    return utils.send(200, {
      message: "wallet fetched successfully",
      wallet: { ...walletData.Items[0], balance: usdBalance},
      assets: assetData.Items,
    });
  } catch (err) {
    console.log("### err ###", err);
    return utils.send(404, {
      message: "error occured while fetching the wallet table.",
    });
  }
};
