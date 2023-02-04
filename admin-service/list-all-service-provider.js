const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
 
    const params = {
      TableName: "PaymentServiceProvider",
    };

    const data = await dynamoDb.scan(params).promise();

    console.log("##### query data #####",data)
    const response = {
      message: "Request successful",
      data: data.Items,
    };
    return utils.send(200, response);
  } catch (error) {
    console.log("### error ####",error)
    return utils.send(400, {
      message: "Unable to payment category. something went wrong",
      data: error,
    });
  }
};
