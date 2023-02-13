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
    TableName: "Add-Funds",
    Key: {id},
  };

  try {
    const data = await dynamoDb.get(params).promise();
    console.log({data})

    if (!data.Item) {
        return utils.send(404, {
          message: `Fund with id ${id} not found`,
          data: {},
        });
      }
    return utils.send(200, { message: "Fund retrieved successfully", data:data?.Item});
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve fund", error });
  }
};
