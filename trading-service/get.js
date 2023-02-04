const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");

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
    console.log("#### resp data ####",data)
    return utils.send(200, { message: "User retrieved successfully", data });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve user", error });
  }
};
