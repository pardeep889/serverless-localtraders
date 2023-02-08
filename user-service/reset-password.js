const utils = require("./utils");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
    const { email } = request.pathParameters;
    const {newPassword}= JSON.parse(request.body);
    console.log("### new password ####",newPassword)

    if (!email) {
      return utils.send(400, {
        message: "Missing email path param"
      });
    }
   
    if (!newPassword) {
        return utils.send(400, {
          message: "Missing new Password"
        });
      } 
     
    
    // check if user exist in our db
    const paramsScan = {
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const data = await dynamoDb.scan(paramsScan).promise();
    if (data.Items.length > 0) {
      const { id, email } = data.Items[0];
   
      // update isEmailVerified field
        await dynamoDb
        .update({
          TableName: "User",
          Key: { id, email },
          UpdateExpression: "set #password = :password",
          ExpressionAttributeValues: {
            ":password": newPassword,
          },
          ExpressionAttributeNames: {
            "#password": "password",
          },
        })
        .promise();

      return utils.send(200, {
        message: "password reset successfully",
      });
    }

    return utils.send(404, {
      message: "User with this email not exists"
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to reset. something went wrong",
      error,
    });
  }
};
