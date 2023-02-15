const utils = require("./utils");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
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
        message: "request for create  body is not a valid JSON",
      });
    }

    if (!body.from || !body.to || !body.amount || !body.symbol || !body.type) {
      return utils.send(400, {
        message: "missing to , from , symbol or amount fields from the body",
      });
    }

    let { symbol, amount, from, to, type } = body;
    const symbol_lowerCase = symbol.toLowerCase();

    // add entry to body table

    const trxn_id =
      "trxn-" + Date.now() + Math.random().toString(36).substring(2, 15);
    const timestamp = "" + Date.now();

    const trxnData = {
      trxn_id,
      to,
      from,
      type,
      amount,
      symbol: symbol_lowerCase,
      timestamp,
    };

    const params = {
      TableName: "Transaction",
      Item: trxnData,
    };

    await dynamoDb.put(params).promise();
    return utils.send(200, {
      message: "transaction added successfuly",
    });
  } catch (error) {
    return utils.send(400, {
      message: "something went wrong while creating the transaction.",
      error: error + "",
    });
  }
};
