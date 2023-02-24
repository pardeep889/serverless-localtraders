const AWS = require("aws-sdk");
const { verifyUser } = require("./token");
const utils = require("./utils");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
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
    let typeFilter = event.queryStringParameters?.type;
   
    if (!typeFilter) {
        const param1 = {
            TableName: "Transaction",
            };
        const resp = await dynamoDbClient.scan(param1).promise();
        return utils.send(200, {
            data: resp.Items,
        });
    }

    let filterExpression = "";
    let expressionAttributeValues = {};
    let expressionAttributeNames = {};
  
    if (typeFilter) {
      filterExpression += `#type = :type`;
      expressionAttributeValues[`:type`] = typeFilter;
      expressionAttributeNames[`#type`] = "type";
    }

    // retrieve filtered data from db
    const params = {
      TableName: "Transaction",
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
    };


    const resp = await dynamoDbClient.scan(params).promise();
    
    return utils.send(200, {
        data: resp.Items,
    });
  } catch (error) {
    console.log("#### error ###",error)
    return utils.send(400, {
      message: "something went wrong",
      data: {},
    });
  }
};
