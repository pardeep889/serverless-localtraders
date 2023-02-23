const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const { getToken } = require("./token");

module.exports.handler = async (request) => {
  if (!request.body) {
    return utils.send(400, {
      message: "request body is missing!",
    });
  }

  let body;
  try {
    body = JSON.parse(request.body);
  } catch (err) {
    return utils.send(400, {
      message: "request body is not a valid JSON",
    });
  }

  try {
    await utils.validateRequestBody(["email", "password"], body);
  } catch (error) {
    return utils.send(400, {
      message: error.toString().slice(6).trim(),
    });
  }


  let { email, password } = body;
  try {
    const params = {
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const data = await dynamoDbClient.scan(params).promise();
    if (data.Items.length != 1) {
      return utils.send(404, {
          isAuth: false,
          message: "Auth Failed {Email not Found}",
      });
    }
    if (data.Items) {
      const isMatch =
        CryptoJS.SHA256(password).toString() ===
        data.Items[0].password.toString();
      if (!isMatch) {
        return utils.send(400, {
            isAuth: false,
            message: "Auth Failed {Wrong Password}",
        });
      }
      const token = await getToken(email, "1 days");
      const { password: pwd, passwordToken, ...resp } = data.Items[0];

      return utils.send(200, {
          isAuth: true,
          user: { ...resp, token }
      });
    } else {
      return utils.send(400, {
          isAuth: false,
          user: "Username or password is wrong",
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
