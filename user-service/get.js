const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  console.log("### request ####",request)
  const { id } = request.pathParameters;
  if (!id) {
    return utils.send(400, {
      message: "Missing id path param",
      data: {},
    });
  }
  console.log("###",id)
  const params = {
    TableName: "User",
    Key: {
      id: id,
    },
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return utils.send(200, { message: "User retrieved successfully", data });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve user", error });
  }
};
