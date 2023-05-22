const utils = require("./utils");
const { verifyUser } = require("./token");
const AWS = require("aws-sdk");
const { onfido } = require("./onfido_setup");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

async function createKyc(data) {
  try {
    const id = "kid" + Date.now() + Math.random().toString(36).substring(2, 15);
    const timestamp = "" + Date.now();

    const kycData= {
      id,
      ...data,
      timestamp,
      status : "not_started",
      isVerified : false

    };
    // register user
    const params = {
      TableName: "kyc",
      Item: kycData,
    };

    await dynamoDbClient.put(params).promise();
    return kycData;
  } catch (error) {
    console.log({ error });
    throw new Error("something went wrong while register the kyc request");
  }
}


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
  console.log(body)


    try {
      const requiredFields = ["userId","firstName","lastName"]
      await utils.validateRequestBody(requiredFields, body);
    } catch (error) {
      return utils.send(400, {
        message: error.toString().slice(6).trim(),
      });
    }

    try {
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
      
      let {userId,firstName,lastName } = body;
  
      // first check if userId already exits
      const paramsScan = {
        TableName: "kyc",
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      };
  
      const data = await dynamoDbClient.scan(paramsScan).promise();
      if (data.Items.length > 0) {
        return utils.send(409, {
          message: "already request for kyc verification",
        });
      }
    let response = await onfido.applicant.create(body);

    
      // add entry to kyc table
    const KycDetails = {
      userId,
      firstName,
      lastName,
      app_id: response.id,
      work_flow_internal: "no-id"
    };

   const resp =  await createKyc(KycDetails)
   
    return utils.send(200, {
      message: "kyc request submitted successfully.",
      data: resp
    });
  } catch (error) {
    console.log(error)
    return utils.send(400, {
      message: "Unable to submit kyc request. something went wrong",
      error: error + "",
    });
  }
};
