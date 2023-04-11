
const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();


const assets = [
  { symbol: "btc", assetName: "Bitcoin", balance: 0 },
  { symbol: "eth", assetName: "Ethereum", balance: 0 },
  { symbol: "bnb", assetName: "Binance Coin", balance: 0 },
  { symbol: "tet", assetName: "Tether", balance: 0 },
  { symbol: "lct", assetName: "LOCAL TRADERS", balance: 0 },
  { symbol: "usdc", assetName: "USD COIN", balance: 0 },
  { symbol: "busd", assetName: "Binance USD", balance: 0 },
];


const send = (statusCode, data) => {
  const responseHeaders = {
    'Content-Type': 'application/json',
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': '*'
  };

  return {
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data, null, 2),
  };
};


async function validateRequestBody(allowedFields, body) {
  // Check if any fields other than the allowed fields are present

  const extraFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );
  if (extraFields.length > 0) {
    throw new Error(`Only ${allowedFields.join(", ")} fields are allowed`);
  }

  // Check if all allowed fields are present
  const missingFields = allowedFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `${missingFields.join(", ")} are required field`
    );
  }
}

const initalizeWallet = async (userId) => {
  try {
    // check if this userId already have the wallet
    const walletParams = {
      TableName: "Wallet",
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const isWalletAlreadyExists = await dynamoDbClient
      .scan(walletParams)
      .promise();
    if (isWalletAlreadyExists.Items.length) {
      throw new Error("user already have the wallet");
    }

    // create wallet for userId

    const walletId =
      "wid-" + Date.now() + Math.random().toString(36).substring(2, 15);
    const walletData = {
      walletId: walletId,
      userId,
      isWalletActive: false,
    };

    const params = {
      TableName: "Wallet",
      Item: walletData,
    };

    const walletResponse = await dynamoDbClient.put(params).promise();
    return walletResponse;
  } catch (err) {
    throw new Error(err);
  }
};

async function createAssetsForUser(userId) {
  try {
        // Create assets for userId
        const promises = assets.map((asset) => {
          const id = Date.now() + Math.random().toString(36).substring(2, 15);
          const assetData = {
            assetId: id,
            userId,
            balance: asset.balance,
            assetName: asset.assetName,
            symbol: asset.symbol,
            address: "",
          };
    
          const params = {
            TableName: "Asset",
            Item: assetData,
          };
    
          return dynamoDbClient.put(params).promise();
        });
    
        await Promise.all(promises);
    

  } catch (err) {
    throw new Error(err);
  }
}


async function retrieveAssetBalance(id, symbol) {
  // Code to retrieve sender's balance with symbol from database goes here
  try {
    const paramsScan = {
      TableName: "Asset",
      FilterExpression: "symbol = :symbol and userId = :userId",
      ExpressionAttributeValues: {
        ":symbol": symbol,
        ":userId": id,
      },
    };

    const data = await dynamoDbClient.scan(paramsScan).promise();
    return data.Items[0];
  } catch (error) {
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
    await dynamoDbClient.update(paramsUpdate).promise();
  } catch (error) {
    throw new Error(error);
  }
}
async function createTransaction(from, to, amount, symbol, type, txnId = "-", status="pending") {
  try {
    const trxn_id =
      "txn-" + Date.now() + Math.random().toString(36).substring(2, 15);
    const timestamp = "" + Date.now();

    const trxnData = {
      trxn_id,
      to,
      from,
      type,
      amount,
      symbol,
      timestamp,
      txnId,
      status
    };

    const params = {
      TableName: "Transaction",
      Item: trxnData,
    };

    await dynamoDbClient.put(params).promise();
  } catch (error) {
    console.log({error})
    throw new Error("something went wrong while creating the transaction");
  }
}

async function getStakingEndDate(months) {
  const currentDate = new Date();
  const endMonth = currentDate.getMonth() + months;
  const endYear = currentDate.getFullYear();
  if (endMonth > 11) {
    endMonth -= 12;
    endYear += 1;
  }
  const endDate = new Date(endYear, endMonth, 1);
  return ""+ endDate;
}

const interestRates = {
  6: 0.05, // 5%
  12: 0.1, // 10%
  24: 0.12, // 12%
};

async function createStack(userId,symbol,stakeAmount,timePeroidInMonths) {
  try {
    const stk_id =
      "stk-" + Date.now() + Math.random().toString(36).substring(2, 15);
    const added_on = "" + Date.now();
    const stakePeroidEndsOn = await getStakingEndDate(timePeroidInMonths)
    const interestRate = interestRates[timePeroidInMonths] || 0.05;
    console.log({stakePeroidEndsOn})
    const stakeData = {
      stk_id,
      userId,
      stakeAmount,
      timePeroidInMonths,
      symbol,
      added_on,
      interestRate,
      stakePeroidEndsOn
    };

    const params = {
      TableName: "Stakes",
      Item: stakeData,
    };

    await dynamoDbClient.put(params).promise();
  } catch (error) {
    console.log({error})
    throw new Error("something went wrong while creating the transaction");
  }
}


async function checkIfUserExistsForSymbol(userId,symbol) {

  const params = {
    TableName: "Asset",
    FilterExpression: "symbol = :symbol and userId = :userId",
    ExpressionAttributeValues: {
      ":symbol": symbol,
      ":userId": userId,
    },
  };

  const data = await dynamoDbClient.scan(params).promise();
  if (data.Items.length > 0) {
    return {isFound:true, resp : data.Items[0]}
  }

  return {isFound:false, resp : []}
}
module.exports = {
  send,
  initalizeWallet,
  createAssetsForUser,
  retrieveAssetBalance,
  updateBalance,
  createTransaction,
  createStack,
  validateRequestBody,
  checkIfUserExistsForSymbol
};
