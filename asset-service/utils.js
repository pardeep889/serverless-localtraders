"use strict";

const TABLE_NAME = "Asset";
const AWS = require("aws-sdk");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const send = (statusCode, data) => {
  const responseHeaders = {
    "Content-Type": "application/json",
    // Required for CORS support to work
    "Access-Control-Allow-Origin": "*",
    // Required for cookies, authorization headers with HTTPS
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "*",
  };
  return {
    statusCode: statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data, null, 2),
  };
};

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
      "wallet-" + Date.now() + Math.random().toString(36).substring(2, 15);
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

async function createAssetsForUser(userId, assets) {
  try {
    for (const asset of assets) {
      const assetId = Date.now() + Math.random().toString(36).substring(2, 15);
      const assetData = {
        assetId,
        userId,
        balance: asset.balance,
        assetName: asset.assetName,
        symbol: asset.symbol,
        address: " ",
      };

      const params = {
        TableName: "Asset",
        Item: assetData,
      };
      const resp = await dynamoDbClient.put(params).promise();
      return resp;
    }
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = {
  send,
  TABLE_NAME,
  initalizeWallet,
  createAssetsForUser,
};
