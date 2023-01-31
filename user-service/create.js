const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  
  console.log("##### body ###", event.body);
  const user = JSON.parse(event.body);
  let { firstName, lastName, email, password} = user;

  if (!user) {
    return utils.send(400, {
      message: event.body,
      data: {},
    });
  }
  const hashedPassword = CryptoJS.SHA256(password).toString();
  const id = Date.now() + Math.random().toString(36).substring(2, 15);
  
  console.log("#######",user.firstName,id)
  const USER = {
    UserId: id,
    firstName,
    lastName,
    email,
    password:hashedPassword
  };


   // first check if email already exits
   const paramsScan = {
    TableName: "UserTable",
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


  const params = {
    TableName: "UserTable",
    Item: USER,
  };

  try {
    await dynamoDbClient.put(params).promise();
    return utils.send(200, { data: USER });
  } catch (error) {
    console.log("#### errorr ####", error);
    return utils.send(400, {
      message: "Unable to create user",
      data: USER,
    });
  }
};
