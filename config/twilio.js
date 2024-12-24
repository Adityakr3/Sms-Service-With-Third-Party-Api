const twilio = require('twilio');

// Initialize Twilio client with error handling
const initTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (!accountSid || !authToken) {
    console.error('Twilio credentials are missing');
    return null;
  }
  
  return twilio(accountSid, authToken);
};

module.exports = initTwilioClient;