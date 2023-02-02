const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
  const { category } = request.pathParameters;
    console.log("### category ####",category)
    const params = {
      TableName: "PaymentServiceProvider",
      FilterExpression: "category = :category",
      ExpressionAttributeValues: {
        ":category": category,
      },
      ProjectionExpression: "providerId,providerName,icon,symbol",

    };

    const data = await dynamoDb.scan(params).promise();

    console.log("##### query data #####",data)
    const response = {
      message: "Request successful",
      data: data.Items,
    };
    return utils.send(200, response);
  } catch (error) {
    return utils.send(400, {
      message: "Unable to payment category. something went wrong",
      data: error,
    });
  }
};
