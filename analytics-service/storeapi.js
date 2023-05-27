const AWS = require("@serverless")

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.storeIPAddress = async (event) => {
  const { ipAddress } = JSON.parse(event.body);

  const params = {
    TableName: 'IPAddressTable', // Replace with your DynamoDB table name
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
    

    await dynamoDB.put(params).promise();
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