const AWS = require("aws-sdk");
const utils = require("./utils");


const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    const bodyRequest = JSON.parse(event.body);
    let { category,icon} = bodyRequest;

    const id = Date.now() + Math.random().toString(36).substring(2, 15);

    if (!bodyRequest) {
      return utils.send(400, {
        message: event.body,
        data: {},
      });
    }


    // first check if category already exits
    const paramsScan = {
        TableName: "PaymentCategory",
        FilterExpression: "category = :category",
        ExpressionAttributeValues: {
          ":category": category,
        },
      };
  
      const data = await dynamoDbClient.scan(paramsScan).promise();
      if (data.Items.length > 0) {
        return utils.send(400, {
          data: {
            message: "this category is already exists",
          },
        });
      }
  

    const params = {
        TableName: 'PaymentCategory',
        Item: {
          id,
          category,
          icon
        }
      };
      
      const resp = await dynamoDbClient.put(params).promise();
      
      return utils.send(200, {
        message:"payment category added successfully",
        data :resp
      });
  } catch (error) {
    console.log("#### errorr ####", error);
    return utils.send(400, {
      message: "something went wrong",
      data: {},
    });
  }
};
