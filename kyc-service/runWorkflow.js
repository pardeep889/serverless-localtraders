const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");
const { onfido } = require("./onfido_setup");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {

    let body;
    try {
      body = JSON.parse(request.body);
    } catch (err) {
      return utils.send(400, {
        message: "request body is not a valid JSON",
      });
    }

    try {
        const requiredFields = ["userId"]
        await utils.validateRequestBody(requiredFields, body);
      } catch (error) {
        return utils.send(400, {
          message: error.toString().slice(6).trim(),
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

    const {userId } = body;

    // check User exists or not First 
    const paramsScan = {
        TableName: "kyc",
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      };
  
      const data = await dynamoDbClient.scan(paramsScan).promise();
      if (!data.Items.length > 0) {
        return utils.send(409, {
          message: "Can't Run Workflow app_id not valid",
        });
      }

      console.log(data)


    const response = await onfido.workflowRun.create({
        applicantId: data.Items[0].app_id,
        workflowId: "adaab140-be24-457c-bff3-59a38ec1d598"
    });

    try {
        const paramsUpdate = {
          TableName: "kyc",
          Key: { id: data.Items[0].id },
          UpdateExpression: "set #work_flow_internal = :work_flow_internal, #status = :status",
          ExpressionAttributeValues: {
            ":work_flow_internal": response.id,
            ":status" : response.status

          },
          ExpressionAttributeNames: {
            "#work_flow_internal": "work_flow_internal",
            "#status": "status"
          },
        };
        await dynamoDbClient.update(paramsUpdate).promise();
      } catch (error) {
        throw new Error(error);
      }


    return utils.send(200, response);
  } catch (error) {
    console.log(error)
    return utils.send(400, {
      message: "Unable to get detail of kyc users. something went wrong",
      data: JSON.stringify(error),
    });
  }
};