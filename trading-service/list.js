const AWS = require("aws-sdk");
const utils = require("./utils");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    console.log("## quwery ####",event.queryStringParameters)
    let typeFilter = event.queryStringParameters?.type;
    let payWithFilter = event.queryStringParameters?.payWith;
    let locationFilter = event.queryStringParameters?.location;
    let priceRangeFilter = event.queryStringParameters?.priceRange;
    console.log("## quwery w####",event.queryStringParameters)

    if (!typeFilter && !payWithFilter && !locationFilter && !priceRangeFilter) {
        const param1 = {
            TableName: "trading-offer",
            };
        const resp = await dynamoDbClient.scan(param1).promise();
        return utils.send(200, {
            data: resp.Items,
        });
    }

    let filterExpression = "";
    let expressionAttributeValues = {};
    let expressionAttributeNames = {};
    let i = 0;

    if (typeFilter) {
      filterExpression += `#type = :type${i}`;
      expressionAttributeValues[`:type${i}`] = typeFilter;
      expressionAttributeNames[`#type`] = "type";
      i++;
    }

    if (payWithFilter) {
      if (filterExpression.length > 0) {
        filterExpression += " and ";
      }
      filterExpression += `#payWith = :payWith${i}`;
      expressionAttributeValues[`:payWith${i}`] = payWithFilter;
      expressionAttributeNames[`#payWith`] = "payWith";
      i++;
    }

    if (locationFilter) {
      if (filterExpression.length > 0) {
        filterExpression += " and ";
      }
      filterExpression += `#location = :location${i}`;
      expressionAttributeValues[`:location${i}`] = locationFilter;
      expressionAttributeNames[`#location`] = "location";
    }

    if (priceRangeFilter) {
        if (filterExpression.length > 0) {
          filterExpression += " and ";
        }
        filterExpression += `#price < :price${i}`;
        expressionAttributeValues[`:price${i}`] = parseInt(priceRangeFilter);
        expressionAttributeNames[`#price`] = "price";
        // filterExpression += `#price BETWEEN :priceMin${i} AND :priceMax${i}`;
        // expressionAttributeValues[`:priceMin${i}`] = 0;
        // expressionAttributeValues[`:priceMax${i}`] = parseInt(priceRangeFilter);
        // expressionAttributeNames[`#price`] = "price";
      }
    // retrieve filtered data from db
    const params = {
      TableName: "trading-offer",
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
