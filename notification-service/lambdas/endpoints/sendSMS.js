const Responses = require("../common/API_Responses");
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const SNS = new AWS.SNS({ apiVersion: "2010-03-31" });

function generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

exports.handler = async (event) => {

  const body = JSON.parse(event.body);

  const code = generateCode();

  if (!body || !body.phoneNumber || !body.email) {
    return Responses._400({
      message: "missing phone number or email from the body",
    });
  }

 
  const AttributeParams = {
    attributes: {
      DefaultSMSType: "Transactional",
    },
  };

  const messageParams = {
    Message: "Hello from Local Traders your verification code is: "+code,
    PhoneNumber: body.phoneNumber,
  };

  try {
    await SNS.setSMSAttributes(AttributeParams).promise();
    await SNS.publish(messageParams).promise();

    // check if user exist in our db
    const paramsScan = {
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": body.email,
      },
    };
    console.log(code)

    const data = await dynamoDb.scan(paramsScan).promise();
    // console.log(data)
    if (data.Items.length > 0) {
      const { id, email } = data.Items[0];

      // update isEmailVerified field
      await dynamoDb
        .update({
          TableName: "User",
          Key: { id, email },
          UpdateExpression: "set #code = :code",
          ExpressionAttributeValues: {
            ":code": code,
          },
          ExpressionAttributeNames: {
            "#code": "code",
          },
        })
        .promise();

      return Responses._200({
        message: "text has been sent",
        otp: code,
      });
    }else{
      
      return Responses._200({
        message: "User not Found"
      })}
  } catch (error) {
    console.log("error", error);
    return Responses._400({ message: "text failed to send" });
  }
};
