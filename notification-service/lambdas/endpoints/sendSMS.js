const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

exports.handler = async event => {
    console.log('event', event);

    const body = JSON.parse(event.body);

    if (!body || !body.phoneNumber || !body.message) {
        return Responses._400({ message: 'missing phone number or messsage from the body' });
    }

    const AttributeParams = {
        attributes: {
            DefaultSMSType: 'Promotional',
        },
    };

    const messageParams = {
        Message: body.message,
        PhoneNumber: body.phoneNumber,
    };

    try {
        await SNS.setSMSAttributes(AttributeParams).promise();
        await SNS.publish(messageParams).promise();

        const params = {
            TableName: "User",
         };
          const data = await dynamoDb.scan(params).promise();
          console.log("###dataa ####",data)
         
        return Responses._200({ message: 'text has been sent',data: data.Items});
    } catch (error) {
        console.log('error', error);
        return Responses._400({ message: 'text failed to send' });
    }
};
