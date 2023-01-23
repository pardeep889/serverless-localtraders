const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  const { userId } = request.pathParameters;
  if (!userId) {
    return utils.send(400, {
      message: "Missing userId path param",
      data: {},
    });
  }
  console.log("###",userId)
  const params = {
    TableName: "UserTable",
    Key: {
      UserId: userId,
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    return utils.send(200, { message: "User retrieved successfully", data });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve user", error });
  }
};
