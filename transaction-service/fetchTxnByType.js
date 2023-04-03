const utils = require("./utils");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    if (!request.body) {
      return utils.send(400, {
        message: "request body is missing!",
      });
    }

    let body = JSON.parse(request.body);

    if (!body.userId || !body.type) {
      return utils.send(400, {
        message: "missing type or userId",
      });
    }
    const {userId, type} = body;
    const trxnParams = {
        TableName: "Transaction",
        FilterExpression: "#userId = :userId or #type =:type",
        ExpressionAttributeNames: {
          "#userId": "userId",
          "#type": "type",
        },
        ExpressionAttributeValues: {
          ":userId": userId,
          ":type": type,
        },
      };
  
      const trxnResponse = await dynamoDb.scan(trxnParams).promise();
      if (trxnResponse.Items.length === 0) {
        return utils.send(200, {
          message: "User doesn't have any transaction .",
          trxns: [],
        });
      }
      return utils.send(200, {
        message: "Transactions fetched successfully",
        trxns: trxnResponse.Items,
      });
  } catch (error) {
    console
    return utils.send(400, {
      message: "Something went wrong",
      error: JSON.stringify(error),
    });
  }
};
