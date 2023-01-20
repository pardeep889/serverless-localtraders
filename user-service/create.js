const AWS = require("aws-sdk");
const utils = require("./utils");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const userId = event.body;
  if (!userId) {
    return utils.send(400, {
      message: event.body,
      data: {},
    });
  }

  const USER = {
    UserId: userId,
  };
  const params = {
    TableName: "UserTable",
    Item: USER,
  };

  try {
    await dynamoDbClient.put(params).promise();
  } catch (error) {
    return utils.send(400, {
      message: "Unable to create user",
      data: USER,
    });
  }
  utils.send(200, { data: USER.UserId });
};
