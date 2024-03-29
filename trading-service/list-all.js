const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
    const params = {
      TableName: "trading-offer",
    };

    const data = await dynamoDb.scan(params).promise();
    const response = {
      message: "Request successful",
      data: data.Items,
    };
    return utils.send(200, response);
  } catch (error) {
    return utils.send(400, {
      message: "Unable to get trades. something went wrong",
      data: error,
    });
  }
};
