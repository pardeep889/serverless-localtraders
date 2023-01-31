const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {

  const { userId } = request.pathParameters;
  if (!userId) {
    return utils.send(400, {
      message: "Missing userId path param",
      data: {},
    });
  }
  const isVerified = await verifyUser(request)
  if(isVerified.statusCode === 401) {
    // code to execute the specific route for admin user
    return {
        statusCode: 401,
        body: JSON.stringify({ 
            isVerified : false,
            error: isVerified.body
         })

    }
} 

  const params = {
    TableName: "AdminUser",
    Key: {
      uid: userId,
    },
  };

  try {
    const data = await dynamoDb.get(params).promise();
    return utils.send(200, { message: "User retrieved successfully", data });
  } catch (error) {
    return utils.send(400, { message: "Unable to retrieve user", error });
  }
};
