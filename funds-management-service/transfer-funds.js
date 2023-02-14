const utils = require("./utils");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function retrieveAssetBalance(id, symbol) {
  // Code to retrieve sender's balance with symbol from database goes here
  try {
    console.log({ id, symbol });

    const paramsScan = {
      TableName: "Asset",
      FilterExpression: "symbol = :symbol and userId = :userId",
      ExpressionAttributeValues: {
        ":symbol": symbol,
        ":userId": id,
      },
    };

    const data = await dynamoDb.scan(paramsScan).promise();
    console.log({ data });
    return data.Items[0];
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
}

// Update sender's balance in database
async function updateBalance(assetId, updatedBalance) {
  try {
    const paramsUpdate = {
      TableName: "Asset",
      Key: { assetId: assetId },
      UpdateExpression: "set #balance = :balance",
      ExpressionAttributeValues: {
        ":balance": updatedBalance,
      },
      ExpressionAttributeNames: {
        "#balance": "balance",
      },
    };
    await dynamoDb.update(paramsUpdate).promise();
  } catch (error) {
    console.log("upated error", { error });
    throw new Error(error);
  }
}
async function createTransaction(recipient_id) {
  // Code to retrieve recipient's balance from database goes here
}



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
        message: "request for add body is not a valid JSON",
      });
    }

    console.log("####  #####", body);
    if (!body.sender_id || !body.recipient_id || !body.amount || !body.symbol) {
      return utils.send(400, {
        message: "missing sender_id, recipient_id, symbol or amount the body",
      });
    }

    const sender_id = body.sender_id;
    const amount = parseFloat(body.amount);
    const symbol = body.symbol;
    const recipient_id = body.recipient_id;

    // check if user exits

    const senderResp = await retrieveAssetBalance(sender_id, symbol);
    console.log("sender rr##### ", { senderResp });

    if (!senderResp) {
      return utils.send(400, {
        message: `sender user doesn't exists or  doesn't have ${symbol} symbol`,
      });
    }

    if (parseFloat(senderResp?.balance) < amount) {
      return utils.send(400, {
        message: "sender doesn't have sufficient balance to transfer",
      });
    }

    const updated_balance_of_sender = parseFloat(senderResp?.balance) - amount;
    console.log({ updated_balance_of_sender });

    // get the balance of receipient for required symbol
    const receipientResp = await retrieveAssetBalance(recipient_id, symbol);
    console.log("receipent rr##### ", { receipientResp });

    if (!receipientResp) {
      return utils.send(400, {
        message: `receiver user doesn't exists or  doesn't have ${symbol} symbol`,
      });
    }

    const updated_balance_of_receiver =
      parseFloat(receipientResp?.balance) + amount;
    console.log({ updated_balance_of_receiver });

    // update balance for sender and receiver
    await updateBalance(senderResp.assetId, updated_balance_of_sender);
    await updateBalance(receipientResp.assetId, updated_balance_of_receiver);

    //   update balance for request symbo
    return utils.send(200, {
      message: "transfer success",
    });
  } catch (error) {
    console.log("####### vvvv #####", { error });
    return utils.send(400, {
      message: "Unable to add funds. something went wrong",
      error: "" + error,
    });
  }
};
