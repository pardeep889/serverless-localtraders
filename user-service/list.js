const utils = require("./utils");
const AWS = require("aws-sdk");

// Provide the credentials directly in the code
AWS.config.update({
  accessKeyId: "AKIA5YLWMZDYU7LU5DMS",
  secretAccessKey: "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",
  region: "us-east-1",
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
    const params = {
      TableName: "UserTable",
    };
    const data = await dynamoDb.scan(params).promise();
    const response = {
      message: "Request successful",
      data: data.Items,
    };
    return utils.send(200, response);
  } catch (error) {
    return utils.send(400, {
      message: "Unable to get users. something went wrong",
      data: "something went wrong.",
    });
  }
};
