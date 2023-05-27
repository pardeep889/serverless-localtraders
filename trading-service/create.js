const AWS = require("aws-sdk");
const utils = require("./utils");


const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    let {username,paymentMethodCategory,paymentMethod,avgTime,price,currency,type,location } = body;

    try {
      const requiredFields = ["userId","paymentMethodCategory","paymentMethod","avgTime","price","currency","type","location"]
      await utils.validateRequestBody(requiredFields, body);
    } catch (error) {
      return utils.send(400, {
        message: error.toString().slice(6).trim(),
      });
    }

    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const createdAt = Date.now()

    // add user to db
    const params = {
      TableName: "trading-offer",
      Item: {
        id,
        username,
        paymentMethodCategory,
        paymentMethod,
        price,
        currency,
        location,
        avgTime,
        type,
        createdAt
      },
    };

    const resp = await dynamoDbClient.put(params).promise();
    return utils.send(200, {
      data: {
        isAuth: true,
        data : resp,
      },
    });
  } catch (error) {
    console.log(error)
    return utils.send(400, {
      message: "something went wrong",
      data: {},
    });
  }
};
