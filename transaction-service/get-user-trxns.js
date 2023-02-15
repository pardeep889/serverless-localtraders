const utils = require("./utils");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { userId } = event.pathParameters;

  if (!userId) {
    return utils.send(400, {
      message: 'The path parameter "userId" is required.',
    });
  }

  try {
    const trxnParams = {
        TableName: "Transaction",
        FilterExpression: "#from = :from or #to =:to",
        ExpressionAttributeNames: {
          "#from": "from",
          "#to": "to",

        },
        ExpressionAttributeValues: {
          ":from": userId,
          ":to": userId,

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
  } catch (err) {
    console.log("### err ###", err);
    return utils.send(404, {
      message: "error occured while fetching the trxn table.",
    });
  }
};
