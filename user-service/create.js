const AWS = require("aws-sdk");
const utils = require("./utils");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const user = JSON.parse(event.body);
  console.log("##### body ###", event.body);
  if (!user) {
    return utils.send(400, {
      message: event.body,
      data: {},
    });
  }
  console.log("#######",user.firstName,user.id)
  const USER = {
    UserId: user.id,
    firstname: user.firstName,
    lastname: user.lastName,
    walletId: user.walletId,
    email: user.email,
    phone : user.phone
  };
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
