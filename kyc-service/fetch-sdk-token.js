const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");
const { onfido } = require("./onfido_setup");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {

    const { userId } = request.pathParameters;

    if (!userId) {
      return utils.send(400, {
        message: "Missing userId path param",
      });
    }
    

    const isVerified = await verifyUser(request);
    if (isVerified.statusCode === 401) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          isVerified: false,
          error: "Access Forbidden",
        }),
      };
    }

    const response = await onfido.sdkToken.generate({
        applicantId: userId
    });


   

    return utils.send(200, response);
  } catch (error) {
    return utils.send(400, {
      message: "Unable to get detail of kyc users. something went wrong",
      data: error,
    });
  }
};