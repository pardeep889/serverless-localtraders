const AWS = require("aws-sdk");
const utils = require("./utils");
const CryptoJS = require("crypto-js");
const { getToken } = require("./token");
const nodemailer = require("nodemailer");
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  if (!event.body) {
    return utils.send(400, {
      message: "request body is missing!",
    });
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return utils.send(400, {
      message: "request body is not a valid JSON",
    });
  }

  if (
    !body.email ||
    !body.firstName ||
    !body.lastName ||
    !body.phoneNumber ||
    !body.countryCode ||
    !body.message
  ) {
    return utils.send(400, {
      message:
        "missing email, firstName, lastName, countryCode, message or phoneNumber from the body",
    });
  }

  let { firstName, lastName, email, phoneNumber, countryCode, message } = body;

  const id = Date.now() + Math.random().toString(36).substring(2, 15);

  try {
    const contactData = {
      id,
      firstName,
      lastName,
      email,
      message,
      countryCode,
      phoneNumber,
    };

    const params = {
      TableName: "ContactUs",
      Item: contactData,
    };

    await dynamoDbClient.put(params).promise();

    // send email to admin
    const contentForAdminMail = utils.emailTemplateWithMessage(firstName,lastName,email,phoneNumber,message)
    const emailAdminResponse = await utils.sendEmailToAdmin(email,contentForAdminMail)

    // send email to user that his request recieved 

    const emailResponse = await utils.sendEmail(
      email,
      "Your request recieved successfully",
      utils.thanksGivingEmailTemplate
    );
    console.log("#### email Response ####", emailResponse);

    return utils.send(200, {
      data: {

        isEmailSend: emailResponse?.messageId ? true : false,
      },
    });
  } catch (error) {
    if (error?.code === "MessageRejected") {
      return utils.send(200, {
        message: "vendor created successfully",
        data: { ...vendor, isEmailSend: false, token },
      });
    }

    console.log("#### error ####", error);
    return utils.send(400, {
      message: "something went wrong",
      error: "" + error,
    });
  }
};
