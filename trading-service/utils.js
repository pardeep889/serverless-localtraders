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


module.exports = {
    send,
    validateRequestBody
}