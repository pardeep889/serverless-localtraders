const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.storeIPAddress = async (event) => {
    
  const ipAddress = event['requestContext']['identity']['sourceIp'];
  const userAgent = event['requestContext']['identity']['userAgent'];
  const params = {
    TableName: 'IPAddressTableStore', // Replace with your DynamoDB table name
    Key: {
        ipAddress,
    },
  };

  try {
    const { Item } = await dynamoDB.get(params).promise();
    if (Item) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'IP address already exists' }),
      };
    }
    await dynamoDB.put({
        TableName: "IPAddressTableStore",
        Item: {ipAddress, date: Date.now(), userAgent},
      }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'IP address stored successfully' }),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error storing IP address' }),
    };
  }
};