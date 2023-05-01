const utils = require("./utils");
const { verifyUser } = require("./token");
const AWS = require("aws-sdk");
const { onfido } = require("./onfido_setup");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async (request) => {

    if (!request.body) {
      return utils.send(400, {
        message: "request body is missing!",
      });
    }
  
    let body;
    try {
      body = JSON.parse(request.body);
    } catch (err) {
      return utils.send(400, {
        message: "request body is not a valid JSON",
      });
    }
  
    try {
      const requiredFields = ["firstName","lastName"]
      await utils.validateRequestBody(requiredFields, body);
    } catch (error) {
      return utils.send(400, {
        message: error.toString().slice(6).trim(),
      });
    }
    let response;
    try {
         response = await onfido.applicant.create(body);
    } catch (error) {
        return utils.send(400, {
            message: "Something is wrong",
            error: JSON.stringify(error)
          });
    }


    return utils.send(200, {
        message: "Applicant added successfully",
        response
      });
};
