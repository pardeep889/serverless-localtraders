const jwt = require("jsonwebtoken");
const SECRET_KEY = "1CqYItlDxnxWbVUaT18lFHVTNA7kFgDvy5Qcbuzif4tIaa0137admin";

const getToken = async (user, expiry) =>  jwt.sign(
    {
      data: user,
    },
    SECRET_KEY,
    { expiresIn: expiry }
  );

const decodeToken = async(val) =>{
  try {
    
 
  if (val && val != undefined) {
    const resp = await jwt.verify(val, SECRET_KEY);
    console.log("#### resp #####", resp);
    return resp
  }
} catch (error) {
    return null
}
}

const verifyUser = async (req) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (token && token != undefined) {
      const resp = await jwt.verify(token, SECRET_KEY);
      console.log("#### resp #####", resp);

      return {
        statusCode: 200,
        body: JSON.stringify({ isVerified: true }),
      };
    }
    return {
        statusCode: 401,
        body: JSON.stringify({ isVerified: false }),
      };
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify({ isVerified: false, error:error?.message }),
    };
  }
};

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
    statusCode,
    headers: responseHeaders,
    body: JSON.stringify(data, null, 2),
  };
};

module.exports = {
  getToken,
  verifyUser,
  send,
  decodeToken
};
