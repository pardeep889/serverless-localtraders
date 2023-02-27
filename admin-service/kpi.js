const utils = require("./utils");
const AWS = require("aws-sdk");
const { verifyUser } = require("./token");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
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

    const kycStatus = request.queryStringParameters?.kycStatus;
    const userStatus = JSON.parse(request.queryStringParameters?.userStatus);
    const tradeType = request.queryStringParameters?.tradeType;

    let kyc;
    let users;
    let trades;
    let vendors;

    let userParams;
    let tradeParams;
    let vendorParams;
    let kycParams;

    // Get total number of users
    if (userStatus === undefined) {
      userParams = {
        TableName: "User",
        Select: "COUNT",
      };
    } else {
      userParams = {
        TableName: "User",
        Select: "COUNT",
        FilterExpression: "#isEmailVerified = :isEmailVerified", // Use an expression attribute name
        ExpressionAttributeNames: {
          "#isEmailVerified": "isEmailVerified", // Map the expression attribute name to the actual attribute name
        },
        ExpressionAttributeValues: {
          ":isEmailVerified": userStatus,
        },
      };
    }
    users = await dynamoDb.scan(userParams).promise();

    // Get total number of vendors
    vendorParams = {
      TableName: "Vendor",
      Select: "COUNT",
    };
    vendors = await dynamoDb.scan(vendorParams).promise();

    // Get total number of trades
    if (!tradeType) {
      tradeParams = {
        TableName: "trading-offer",
        Select: "COUNT",
      };
    } else {
      tradeParams = {
        TableName: "trading-offer",
        Select: "COUNT",
        FilterExpression: "#type = :type", // Use an expression attribute name
        ExpressionAttributeNames: {
          "#type": "type", // Map the expression attribute name to the actual attribute name
        },
        ExpressionAttributeValues: {
          ":type": tradeType,
        },
      };
    }
    trades = await dynamoDb.scan(tradeParams).promise();

    // Get total KYC count
    if (kycStatus === undefined) {
      kycParams = {
        TableName: "kyc",
        Select: "COUNT",
      };
    } else {
      kycParams = {
        TableName: "kyc",
        Select: "COUNT",
        FilterExpression: "#status = :statusValue", // Use an expression attribute name
        ExpressionAttributeNames: {
          "#status": "status", // Map the expression attribute name to the actual attribute name
        },
        ExpressionAttributeValues: {
          ":statusValue": kycStatus,
        },
      };
    }
    kyc = await dynamoDb.scan(kycParams).promise();

    //
    const response = {
      message: "Request successful",
      users,
      vendors,
      trades,
      kyc: kyc,
    };
    return utils.send(200, response);
  } catch (error) {
    return utils.send(400, {
      message: "something went wrong",
      error: error + "",
    });
  }
};
