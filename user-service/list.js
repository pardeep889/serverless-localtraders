const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
    const params = {
      TableName: "UserTable",
      // FilterExpression: 'attribute_not_exists(password)'
      ProjectionExpression: 'UserId,firstName,lastName, email'
    };
    const data = await dynamoDb.scan(params).promise();
    console.log("###dataa ####",data)
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
