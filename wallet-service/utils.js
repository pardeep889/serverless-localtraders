'use strict';

const TABLE_NAME = "Wallet";

const send = (statusCode, data) => {
  const responseHeaders = {
    'Content-Type': 'application/json',
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',  
    'Access-Control-Allow-Methods': '*',

    // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Credentials': true
  };
  return {
      statusCode: statusCode,
      headers: responseHeaders,
      body: JSON.stringify(
        data,
        null,
        2
      ),
    };
};

module.exports = {
    send,
    TABLE_NAME
}