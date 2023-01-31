const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");
const { getToken } = require("./token");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (req) => {
  try {
    let { email, password } = JSON.parse(req.body);
    const params = {
      TableName: "AdminUser",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
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
      const token = await getToken(email,300)
      const {password:pwd, ...resp } = data.Items[0];
   
      return utils.send(200, {
        data: {
          isAuth: true,
          user : {...resp,token}
        },
      });
    }else{ 
      return utils.send(400, {
        data: {
          isAuth: false,
          user : 'Username or password is wrong'
        },
      });
    }
  } catch (error) {
    return utils.send(400, {
      isAuth: false,
      message: "something went wrong.",
      error: "For development check cloudwatch logs"
    });
  }
};
