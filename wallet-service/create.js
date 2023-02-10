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
  if (!body?.userId) {
    return utils.send(400, {
      message: "missing userId from the body",
    });
  }
  let { userId } = body;

  try {
    const walletParams = {
      TableName: utils.TABLE_NAME,
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const isWalletAlreadyExists = await dynamoDbClient
      .scan(walletParams)
      .promise();
    if (isWalletAlreadyExists.Items.length) {
      return utils.send(200, {
        message: "user already created the wallet",
      });
    }

    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const walletData = {
      walletId: id,
      userId,
      isWalletActive: false,
    };

    const params = {
      TableName: utils.TABLE_NAME,
      Item: walletData,
    };

    const response = await dynamoDbClient.put(params).promise();
    return utils.send(200, {
      message: "wallet created successfully",
      body: response,
    });
  } catch (err) {
    console.log("### erro ###", err);
    return utils.send(500, {
      message: "Internal Server Error",
      body: "" + err,
    });
  }
};
