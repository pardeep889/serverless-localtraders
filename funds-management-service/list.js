const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyAdmin } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {


    const isVerified = await verifyAdmin(request);
    if (isVerified.statusCode === 401) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          isVerified: false,
          error: "Access Forbidden",
        }),
      };
    }

    const params = {
      TableName: "Add-Funds",
  };

    const data = await dynamoDb.scan(params).promise();
    const response = {
      message: "Request successful",
      data: data.Items,
    };
    return utils.send(200, response);
  } catch (error) {
    return utils.send(400, {
      message: "Unable to retrive funds. something went wrong",
      data: error,
    });
  }
};
