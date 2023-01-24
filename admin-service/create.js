const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const user = JSON.parse(event.body);
    let { firstName, lastName, email, password, phone } = user;

    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const hashedPassword = CryptoJS.SHA256(password).toString();

    if (!user) {
      return utils.send(400, {
        message: event.body,
        data: {},
      });
    }
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
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const data = await dynamoDbClient.scan(paramsScan).promise();
    if (data.Items.length > 0) {
      return utils.send(400, {
        data: {
          message: "User with this email already exists",
        },
      });
    }

    // add user to db
    const params = {
      TableName: "User",
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
    console.log("#### errorr ####", error);
    return utils.send(400, {
      message: "something went wrong",
      data: {},
    });
  }
};
