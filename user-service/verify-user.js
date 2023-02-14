const utils = require("./utils");
const AWS = require("aws-sdk");
const { decodeToken } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  const { token } = request.pathParameters;
  if (!token) {
    return utils.send(400, {
      message: "Missing token path param",
      data: {},
    });
  }

  try {
    // decode token
    const tokenResponse = await decodeToken(token);
    if (!tokenResponse.isVerified) {
      return utils.send(400, {
        isVerified: tokenResponse.isVerified,
        error: "invalid token",
      });
    }
    // check if user exist in our db
    const paramsScan = {
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": tokenResponse?.data,
      },
    };

    const data = await dynamoDb.scan(paramsScan).promise();
    const { password, ...resp } = data.Items[0];

    return utils.send(200, { isVerified: true, data: resp });
  } catch (error) {

    return utils.send(400, {
      message: "something went wrong during user verification",
      error: "" + error,
    });
  }
};
