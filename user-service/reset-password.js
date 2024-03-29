const utils = require("./utils");
const AWS = require("aws-sdk");
const { getToken } = require("./token");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (request) => {
  try {
    const { email } = request.pathParameters;

    if (!email) {
      return utils.send(400, {
        message: "Missing email path param",
      });
    }

    // check if user exist in our db
    const paramsScan = {
      TableName: "User",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const data = await dynamoDb.scan(paramsScan).promise();
    if (data.Items.length > 0) {
      const { id, email } = data.Items[0];

      // genereate new token
      const passwordToken = await getToken({ email, id }, "1 days");

      // update isEmailVerified field
      await dynamoDb
        .update({
          TableName: "User",
          Key: { id, email },
          UpdateExpression: "set #passwordToken = :passwordToken",
          ExpressionAttributeValues: {
            ":passwordToken": passwordToken,
          },
          ExpressionAttributeNames: {
            "#passwordToken": "passwordToken",
          },
        })
        .promise();

      // this should be frontend link

      const host = `https://www.localtraders.finance/reset-password/verify/${passwordToken}`;
      const emailForm = `<!doctype html><html><head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Localtraders</title><style>img{border:none;-ms-interpolation-mode:bicubic;max-width:100%}body{background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}table{border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%}table td{font-family:sans-serif;font-size:14px;vertical-align:top}.body{background-color:#f6f6f6;width:100%}.container{display:block;margin:0 auto !important;max-width:580px;padding:10px;width:580px}.content{box-sizing:border-box;display:block;margin:0 auto;max-width:580px;padding:10px}.main{background:#fff;border-radius:3px;width:100%}.wrapper{box-sizing:border-box;padding:20px}.content-block{padding-bottom:10px;padding-top:10px}.footer{clear:both;margin-top:10px;text-align:center;width:100%}.footer td, .footer p, .footer span, .footer a{color:#999;font-size:12px;text-align:center}h1,h2,h3,h4{color:#000;font-family:sans-serif;font-weight:400;line-height:1.4;margin:0;margin-bottom:30px}h1{font-size:35px;font-weight:300;text-align:center;text-transform:capitalize}p,ul,ol{font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;margin-bottom:15px}p li, ul li, ol li{list-style-position:inside;margin-left:5px}a{color:#3498db;text-decoration:underline}.btn{box-sizing:border-box;width:100%}.btn>tbody>tr>td{padding-bottom:15px}.btn table{width:auto}.btn table td{background-color:#fff;border-radius:5px;text-align:center}.btn a{background-color:#fff;border:solid 1px #3498db;border-radius:5px;box-sizing:border-box;color:#3498db;cursor:pointer;display:inline-block;font-size:14px;font-weight:bold;margin:0;padding:12px 25px;text-decoration:none;text-transform:capitalize}.btn-primary table td{background-color:#3498db}.btn-primary a{background-color:#3498db;border-color:#3498db;color:#fff}.last{margin-bottom:0}.first{margin-top:0}.align-center{text-align:center}.align-right{text-align:right}.align-left{text-align:left}.clear{clear:both}.mt0{margin-top:0}.mb0{margin-bottom:0}.preheader{color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0}.powered-by a{text-decoration:none}hr{border:0;border-bottom:1px solid #f6f6f6;margin:20px 0}@media only screen and (max-width: 620px){table[class=body] h1{font-size:28px !important;margin-bottom:10px !important}table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a{font-size:16px !important}table[class=body] .wrapper, table[class=body] .article{padding:10px !important}table[class=body] .content{padding:0 !important}table[class=body] .container{padding:0 !important;width:100% !important}table[class=body] .main{border-left-width:0 !important;border-radius:0 !important;border-right-width:0 !important}table[class=body] .btn table{width:100% !important}table[class=body] .btn a{width:100% !important}table[class=body] .img-responsive{height:auto !important;max-width:100% !important;width:auto !important}}@media all{.ExternalClass{width:100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%}.apple-link a{color:inherit !important;font-family:inherit !important;font-size:inherit !important;font-weight:inherit !important;line-height:inherit !important;text-decoration:none !important}#MessageViewBody a{color:inherit;text-decoration:none;font-size:inherit;font-family:inherit;font-weight:inherit;line-height:inherit}.btn-primary table td:hover{background-color:#34495e !important}.btn-primary a:hover{background-color:#34495e !important;border-color:#34495e !important}}</style></head><body class=""> <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span><table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"><tr><td>&nbsp;</td><td class="container"><div class="content"><table role="presentation" class="main"><tr><td class="wrapper"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td><p>Hi there,</p><p> Reset your password by clicking the link below.</p><table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"><tbody><tr><td align="left"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td> <a href="${host}" target="_blank">Reset Password</a></td></tr></tbody></table></td></tr></tbody></table><p>We may need to send you critical information about our service and it is important that we have an accurate email address.</p></td></tr></table></td></tr></table><div class="footer"><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="content-block"> <b>Localtraders</b> <span class="apple-link">Support Team</span> <br> Don't like these emails? <a href="#">Unsubscribe</a>.</td></tr><tr><td class="content-block powered-by"> Powered by <a href="#">Localtraders</a>.</td></tr></table></div></div></td><td>&nbsp;</td></tr></table></body></html>`;

      const emailResponse = await utils.sendEmail(
        email,
        "reset-password link",
        emailForm
      );
      console.log("#### email Response ####", emailResponse);

      if (emailResponse?.messageId) {
        return utils.send(200, {
          message: "reset-password link sent successfully",
          isEmailSend: true,
        });
      }
      return utils.send(400, {
        message: "reset-password link not sent",
        isEmailSend: false,
      });
    }

    return utils.send(404, {
      message: "User with this email not exists",
    });
  } catch (error) {
    console.log("#### error ####", error);
    return utils.send(400, {
      message: "Unable to reset password. something went wrong",
      error,
    });
  }
};
