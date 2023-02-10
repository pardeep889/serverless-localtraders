'use strict';

const TABLE_NAME = "Asset";

const send = (statusCode, data) => {
  const responseHeaders = {
    'Content-Type': 'application/json',
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',  
    // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': '*'
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