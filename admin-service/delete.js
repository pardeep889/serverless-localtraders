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

  const params = {
    TableName: "UserTable",
    Key: {
      UserId: userId,
    },
  };

  try {
    const user = await dynamoDb.get(params).promise();
    console.log("### user ###", user);
    if (!user.Item) {
      return utils.send(404, { message: "User not found" });
    }

    const data = await dynamoDb.delete(params).promise();
    return utils.send(200, { message: "User deleted successfully", data });
  } catch (error) {
    return utils.send(400, { message: "Unable to delete user", error });
  }
};
