const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    if (!event.body) {
      return utils.send(400, {
        message: "request body is missing!",
      });
    }

    let user;
    try {
      user = JSON.parse(event.body);
    } catch (err) {
      return utils.send(400, {
        message: 'request body  is not a valid JSON',
      });
        }

        if (!user.email || !user.firstName|| !user.lastName || !user.password) {

          return utils.send(422, {
            message: 'missing email, firstName, lastName or password from the body',
          });
      }
    let { firstName, lastName, email, password, phone } = user;

    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const hashedPassword = CryptoJS.SHA256(password).toString();

 
    const USER = {
      uid: id,
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phone,
      password: hashedPassword,
    };

    // first check if email already exits
    const paramsScan = {
      TableName: "AdminUser",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const data = await dynamoDbClient.scan(paramsScan).promise();
    if (data.Items.length > 0) {
      return utils.send(409, {
        data: {
          message: "User with this email already exists",
        },
      });
    }

    // add user to db
    const params = {
      TableName: "AdminUser",
      Item: USER,
    };

    await dynamoDbClient.put(params).promise();
    const { password: pwd, ...resp } = USER;
    return utils.send(200, {
      data: {
        isAuth: true,
        user: resp,
      },
    });
  } catch (error) {
 
    return utils.send(500, {
      message: "something went wrong",
      error : error + ""
    });
  }
};
