const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");
const { getToken } = require("./token");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (req) => {
  try {

    if (!req.body) {
      return utils.send(400, {
        message: "Missing password and email",
      });
    }

    let { email, password } = JSON.parse(req.body);

    if (!email) {
      return utils.send(422, {
        message: "Missing email",
      });
    }

    if (!password) {
      return utils.send(422, {
        message: "Missing Password",
      });
    }

    const params = {
      TableName: "AdminUser",
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
 
      const isMatch =
        CryptoJS.SHA256(password).toString() === data.Items[0].password.toString();
      if (!isMatch) {
        return utils.send(401, {
          data: {
            isAuth: false,
            message: "Auth Failed {Wrong Password}",
          },
        });
      }
      const token = await getToken(email,'1 days')
      const {password:pwd, ...resp } = data.Items[0];
   
      return utils.send(200, {
        data: {
          isAuth: true,
          user : {...resp,token}
        },
      });
    
  } catch (error) {
    return utils.send(500, {
      isAuth: false,
      message: "Internal Server Error",
      error : error + ""
    });
  }
};
