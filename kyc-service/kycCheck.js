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
      const requiredFields = ["userId"];
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

    const { userId } = body;

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
    if (data.Items[0].work_flow_internal === "no-id") {
      return utils.send(409, {
        message: "Please start KYC process first",
        status: "not-started",
      });
    }

    let isVerifiedKyc = false;

    const response = await onfido.axiosInstance.get(
      `https://api.eu.onfido.com/v3.6/workflow_runs/${data.Items[0].work_flow_internal}`
    );

    if(response.data.status === "approved"){
      isVerifiedKyc = true;
    }

    try {
        const paramsUpdate = {
          TableName: "kyc",
          Key: { id: data.Items[0].id },
          UpdateExpression: "set #work_flow_internal = :work_flow_internal, #status = :status, #isVerified = :isVerified",
          ExpressionAttributeValues: {
            ":work_flow_internal": response.data.id,
            ":status" : response.data.status,
            ":isVerified": isVerifiedKyc
          },
          ExpressionAttributeNames: {
            "#work_flow_internal": "work_flow_internal",
            "#status": "status",
            "#isVerified": "isVerified"
          },
        };
        await dynamoDbClient.update(paramsUpdate).promise();
      } catch (error) {
        throw new Error(error);
      }

    return utils.send(200, response.data);
  } catch (error) {
    console.log(error);
    return utils.send(400, {
      message: "Unable to get detail of kyc users. something went wrong",
      data: JSON.stringify(error),
    });
  }
};
