const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (req) => {
  try {
    let { email, password } = JSON.parse(req.body);
    const params = {
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    //   Limit: 1,
    };
    const data = await dynamoDbClient.scan(params).promise();
    if (data.Items.length != 1) {
      return utils.send(400, {
        data: {
          isAuth: false,
          message: "Auth Failed {Email not Found}",
        },
      });
    }
    if (data.Items) {
      const isMatch =
        CryptoJS.SHA256(password).toString() === data.Items[0].password.toString();
      if (!isMatch) {
        return utils.send(400, {
          data: {
            isAuth: false,
            message: "Auth Failed {Wrong Password}",
          },
        });
      }
      
      const {password:pwd, ...resp } = data.Items[0];
      return utils.send(200, {
        data: {
          isAuth: true,
          user : resp
        },
      });
    }
  } catch (error) {
    console.log(error);
    return utils.send(400, {
      message: "something went wrong.",
      data: {},
    });
  }
};
