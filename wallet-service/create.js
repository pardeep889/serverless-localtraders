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
  console.log("## body @### ", body);
  if (!body?.userId || !body?.balance) {
    return utils.send(400, {
      message: "missing userId, balance or isWalletActive from the body",
    });
  }
  let { userId, balance, isWalletActive } = body;

  try {
    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const walletData = {
      walletId: id,
      userId,
      balance,
      isWalletActive,
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
