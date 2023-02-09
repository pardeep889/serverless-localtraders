const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

exports.handler = async event => {
    console.log('event', event);

    const body = JSON.parse(event.body);

    if (!body || !body.email || !body.code || !body.phoneNumber) {
        return Responses._400({ message: 'missing email, phoneNumber or code from the body' });
    }

 
    try {

           // check if user exist in our db
    const paramsScan = {
        TableName: "User",
        FilterExpression: "email = :email and code = :code",
        ExpressionAttributeValues: {
          ":email": body.email,
          ":code" : body.code
        },
      };
  
      const data = await dynamoDb.scan(paramsScan).promise();
      if (data.Items.length > 0) {
        const { id, email } = data.Items[0];
     
        // update isEmailVerified field
          await dynamoDb
          .update({
            TableName: "User",
            Key: { id, email },
            UpdateExpression: "set #phoneNumber = :phoneNumber , #isPhoneVerified = :isPhoneVerified",
            ExpressionAttributeValues: {
              ":phoneNumber": body.phoneNumber,
              ":isPhoneVerified": true
            },
            ExpressionAttributeNames: {
              "#phoneNumber": "phoneNumber",
              "#isPhoneVerified" : "isPhoneVerified"
            },
          })
          .promise();
  
        return Responses._200({
          message: "phone Number is verified",
          isPhoneVerified: true,
        });
      }
  
      return Responses._400({
        message: "either email or code is not matched",
        isPhoneVerified: false,
      });

    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: 'text failed to send' });
    }
};
