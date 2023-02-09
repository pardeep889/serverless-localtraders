const utils = require("./utils");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const CryptoJS = require("crypto-js");

module.exports.handler = async (request) => {
  try {
    if (!request.body) {
      return utils.send(400, {
        message: "Missing oldpassword, newPassword, email",
      });
    }
    const { newPassword, oldPassword, email } = JSON.parse(request.body);

    if (!newPassword) {
      return utils.send(400, {
        message: "Missing new Password",
      });
    }

    if (!oldPassword) {
      return utils.send(400, {
        message: "Missing old Password",
      });
    }

    if (!email) {
      return utils.send(400, {
        message: "Missing Email",
      });
    }

    // check if user exists with this email id

    const params = {
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const data = await dynamoDb.scan(params).promise();
    if (data.Items.length != 1) {
      return utils.send(404, {
        message: "Email not Found",
      });
    }
    if (data.Items) {
      const { id, email } = data.Items[0];

      const isMatch =
        CryptoJS.SHA256(oldPassword).toString() ===
        data.Items[0].password.toString();
      if (!isMatch) {
        return utils.send(400, {
          message: "old password doesn't match. Please fill correct password",
        });
      }

      // code to update new password

      const newhashedPassword = CryptoJS.SHA256(newPassword).toString();

      // update isEmailVerified field
      await dynamoDb
        .update({
          TableName: "User",
          Key: { id, email },
          UpdateExpression: "set #password = :password",
          ExpressionAttributeValues: {
            ":password": newhashedPassword,
          },
          ExpressionAttributeNames: {
            "#password": "password",
          },
        })
        .promise();
    }

    return utils.send(200, {
      message: "Password changed successfully",
    });
  } catch (error) {
    return utils.send(400, {
      message: "Unable to change password. something went wrong",
      error,
    });
  }
};
