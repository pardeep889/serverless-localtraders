const utils = require("./utils");
const AWS = require("aws-sdk");
const { decodeToken } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
    const { token } = request.pathParameters;
    if (!token) {
      return utils.send(400, {
        message: "Missing token path param",
        data: {},
      });
    }
    const tokenResponse = await decodeToken(token);
    
    // check if user exist in our db
    const paramsScan = {
      TableName: utils.TABLE_NAME,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": tokenResponse?.data,
      },
    };

    const data = await dynamoDb.scan(paramsScan).promise();
    if (data.Items.length > 0) {
      const { id, email } = data.Items[0];
   
      // update isEmailVerified field
        await dynamoDb
        .update({
          TableName: utils.TABLE_NAME,
          Key: { id },
          UpdateExpression: "set #isEmailVerified = :isEmailVerified",
          ExpressionAttributeValues: {
            ":isEmailVerified": true,
          },
          ExpressionAttributeNames: {
            "#isEmailVerified": "isEmailVerified",
          },
        })
        .promise();

      return utils.send(200, {
        message: "vendor email is verified",
        isEmailVerified: true,
      });
    }

    return utils.send(404, {
      message: "vendor with this email not exists",
      isEmailVerified: false,
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to verify email. something went wrong",
      error,
    });
  }
};
