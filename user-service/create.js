const AWS = require("aws-sdk");
const utils = require("./utils");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const userId = event.body;
  console.log("##### body ###",event.body)
  if (!userId) {
    return utils.send(400, {
      message: event.body,
      data: {},
    });
  }

  const USER = {
    UserId: "123",
  };
  const params = {
    TableName: "UserTable",
    Item: USER,
  };

  try {
    await dynamoDbClient.put(params).promise();
    return utils.send(200, { data: USER });

  } catch (error) {
    console.log("#### errorr ####",error)
    return utils.send(400, {
      message: "Unable to create user",
      data: USER,
    });
  }
};
