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
    const assetParams = {
      TableName: utils.TABLE_NAME,
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const assetResponse = await dynamoDb.scan(assetParams).promise();
    if (assetResponse.Items.length === 0) {
      return utils.send(200, {
        message: "User doesn't have any assets .",
        assets: [],
      });
    }
    
    return utils.send(200, {
      message: "Assets fetched successfully",
      assets: assetResponse.Items,
    });
  } catch (err) {
    console.log("### err ###", err);
    return utils.send(404, {
      message: "error occured while fetching the asset table.",
    });
  }
};
