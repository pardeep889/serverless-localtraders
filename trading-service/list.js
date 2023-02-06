const AWS = require("aws-sdk");
const utils = require("./utils");

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  try {
    let typeFilter = event.queryStringParameters?.type;
    let payWithFilter = event.queryStringParameters?.paymentMethodCategory;
    let locationFilter = event.queryStringParameters?.location;
    let priceRangeFilter = event.queryStringParameters?.priceRange;
    let limit = event.queryStringParameters?.limit;
    let offset = event.queryStringParameters?.offset;
    let paymentMethodFilter = event.queryStringParameters?.paymentMethod;
    let currencyFilter = event.queryStringParameters?.currency;

    if (!typeFilter && !payWithFilter && !locationFilter && !priceRangeFilter && !limit && !offset && !paymentMethodFilter && !currencyFilter) {
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
      filterExpression += `#paymentMethodCategory = :paymentMethodCategory${i}`;
      expressionAttributeValues[`:paymentMethodCategory${i}`] = payWithFilter;
      expressionAttributeNames[`#paymentMethodCategory`] = "paymentMethodCategory";
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
      }

      if (paymentMethodFilter) {
        if (filterExpression.length > 0) {
          filterExpression += " and ";
        }
        filterExpression += `#paymentMethod = :paymentMethod${i}`;
        expressionAttributeValues[`:paymentMethod${i}`] = paymentMethodFilter;
        expressionAttributeNames[`#paymentMethod`] = "paymentMethod";
      }

      if (currencyFilter) {
        if (filterExpression.length > 0) {
          filterExpression += " and ";
        }
        filterExpression += `#currency = :currency${i}`;
        expressionAttributeValues[`:currency${i}`] = currencyFilter;
        expressionAttributeNames[`#currency`] = "currency";
      }
    // retrieve filtered data from db
    const params = {
      TableName: "trading-offer",
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      Limit: parseInt(limit),
      ExclusiveStartKey: offset ? JSON.parse(offset): undefined,
    };


    const resp = await dynamoDbClient.scan(params).promise();
    
    return utils.send(200, {
        data: resp.Items,
        offset: resp.LastEvaluatedKey
    });
  } catch (error) {
    console.log("#### error ###",error)
    return utils.send(400, {
      message: "something went wrong",
      data: {},
    });
  }
};
