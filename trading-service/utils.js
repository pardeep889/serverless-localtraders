'use strict';

const send = (statusCode, data) => {
  const responseHeaders = {
    'Content-Type': 'application/json',
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',  
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
    send
}