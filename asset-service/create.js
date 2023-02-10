const utils = require("./utils");
const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  if (!event.body) {
    return utils.send(400, {
      message: "request body is missing!",
    });
  }
  const body = JSON.parse(event.body);
  if (
    !body?.userId ||
    !body?.balance ||
    !body?.assetName ||
    !body?.address ||
    !body?.symbol
  ) {
    return utils.send(400, {
      message:
        "missing userId, balance , assetName, symbol or address from the body",
    });
  }
  let { userId, balance, assetName, address, symbol, logoUrl } = body;

  try {
    // check if user exist in our db
    const paramsScan = {
      TableName: utils.TABLE_NAME,
      FilterExpression: "symbol = :symbol and userId = :userId",
      ExpressionAttributeValues: {
        ":symbol": symbol,
        ":userId": userId,
      },
    };

    const data = await dynamoDbClient.scan(paramsScan).promise();
    if (data.Items.length > 0) {
      return utils.send(200, {
        message: "user already have asset with this symbol.",
        body: [],
      });
    }

    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const assetData = {
      assetId: id,
      userId,
      balance,
      assetName,
      address,
      symbol,
      logoUrl,
    };

    const params = {
      TableName: utils.TABLE_NAME,
      Item: assetData,
    };

    const response = await dynamoDbClient.put(params).promise();
    return utils.send(200, {
      message: "asset created successfully",
      body: response,
    });
  } catch (err) {
    return utils.send(500, {
      message: "Internal Server Error",
      body: "" + err,
    });
  }
};
