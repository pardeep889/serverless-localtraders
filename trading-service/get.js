const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {

  const { id } = request.pathParameters;
  if (!id) {
    return utils.send(400, {
      message: "Missing id path param",
      data: {},
    });
  }

  const params = {
    TableName: "trading-offer",
    Key: {
      id,
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    const offer = {
       
        "localTradeFees":"0%",
        "minBuyLimit":10,
        "maxBuyLimit":100,
        "tradeTimeLimit":"30",
        "sellerRate": 34125.12,
        "currency":"usd",
        'stockRate':"10%"
    }
    const buyer = {
        "name":"wiredBrood",
        "location":"kenya",
        "positiveFeedback" :12,
        "negativeFeedback":0,
        "idVerified":true,
        "emailVerified":true,
        "addressVerified":true,
        "phoneVerified":true,
        "averageTradeSpeed":"instant",
    }
    const feedBackOffer = {
        "name":"famousfiesh",
        "feedbackType" :'positive',
        "currency":"usd",
        "serviceProvider":"airtel money",
        "tradeSpeed":"very efficent"


    }
    const demoData = {...data?.Item,offer,buyer,feedBackOffer}
    return utils.send(200, { message: "trade retrieved successfully", data:demoData });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve trade", error });
  }
};
