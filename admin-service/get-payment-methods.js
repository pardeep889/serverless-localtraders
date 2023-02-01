const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {

  const params = {
    TableName: "PaymentMethod"
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    const response = {
      message: "Request successful",
      data: data.Items,
    };
    return utils.send(200, response);
   } catch (error) {
    return utils.send(400, { message: "Unable to retrieve payment methods", error });
  }
};
