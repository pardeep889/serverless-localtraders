const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {

    const { userId } = request.pathParameters;

    if (!userId) {
      return utils.send(400, {
        message: "Missing userId path param",
      });
    }

    const isVerified = await verifyUser(request);
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
        TableName: "kyc",
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      };
  
    const data = await dynamoDb.scan(params).promise();
    if(data.Items.length === 0){
      return utils.send(404, {
        message: "No user found with this id"
      });
    }
    const response = {
      message: "Request successful",
      data: data.Items,
    };
    return utils.send(200, response);
  } catch (error) {
    return utils.send(400, {
      message: "Unable to get detail of kyc users. something went wrong",
      data: error,
    });
  }
};