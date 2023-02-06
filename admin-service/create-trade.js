const AWS = require("aws-sdk");
const { verifyUser } = require("./token");
const utils = require("./utils");


const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {


    const isVerified = await verifyUser(event);
    if (isVerified.statusCode === 401) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          isVerified: false,
          error: "Access Forbidden",
        }),
      };
    }
    const offerdata = JSON.parse(event.body);
    let {username,paymentMethodCategory,paymentMethod,avgTime,price,currency,type,location } = offerdata;

    const id = Date.now() + Math.random().toString(36).substring(2, 15);
    const createdAt = Date.now()


    if (!offerdata) {
      return utils.send(400, {
        message: event.body,
        data: {},
      });
    }

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
 
    return utils.send(400, {
      message: "something went wrong",
      data: {},
    });
  }
};
