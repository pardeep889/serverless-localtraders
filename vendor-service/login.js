const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const { getToken } = require("./token");

module.exports.handler = async (req) => {
  try {
    if (!req.body) {
      return utils.send(400, {
        message: "Missing password and email",
      });
    }

    let { email, password } = JSON.parse(req.body);

    if (!email) {
      return utils.send(400, {
        message: "Missing email",
      });
    }

    if (!password) {
      return utils.send(400, {
        message: "Missing Password",
      });
    }

    const params = {
      TableName: "Vendor",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const data = await dynamoDbClient.scan(params).promise();
    if (data.Items.length != 1) {
      return utils.send(404, {
        data: {
          isAuth: false,
          message: "Auth Failed {Email not Found}",
        },
      });
    }
    if (data.Items) {
      const isMatch =
        CryptoJS.SHA256(password).toString() ===
        data.Items[0].password.toString();
      if (!isMatch) {
        return utils.send(400, {
          data: {
            isAuth: false,
            message: "Auth Failed {Wrong Password}",
          },
        });
      }
      const token = await getToken(email, "1 days");
      const { password: pwd, passwordToken, ...resp } = data.Items[0];

      return utils.send(200, {
        data: {
          isAuth: true,
          user: { ...resp, token },
        },
      });
    } else {
      return utils.send(400, {
        data: {
          isAuth: false,
          user: "Username or password is wrong",
        },
      });
    }
  } catch (error) {

    return utils.send(400, {
      isAuth: false,
      message: "something went wrong.",
      error: ""+error,
    });
  }
};
