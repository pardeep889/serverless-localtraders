const AWS = require("aws-sdk");
const utils = require("./utils");


const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const bodyRequest = JSON.parse(event.body);
    let { category,provider,symbol,icon } = bodyRequest;

    const id = Date.now() + Math.random().toString(36).substring(2, 15);

    if (!bodyRequest) {
      return utils.send(400, {
        message: event.body,
        data: {},
      });
    }
    const data = {
        id: id,
        category,
        provider,
        symbol,
        icon
    };

    // add user to db
    const params = {
      TableName: "PaymentMethod",
      Item: data,
    };

    await dynamoDbClient.put(params).promise();
    return utils.send(200, {
      message:"payment method added successfully",
      data :{}
    });
  } catch (error) {
    console.log("#### errorr ####", error);
    return utils.send(400, {
      message: "something went wrong",
      data: {},
    });
  }
};
