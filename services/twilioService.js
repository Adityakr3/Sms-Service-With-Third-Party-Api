const initTwilioClient = require('../config/twilio');

class TwilioService {
  constructor() {
    this.client = initTwilioClient();
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
  }

  async sendSMS(to, message) {
    try {
      if (!this.client) {
        throw new Error('Twilio client not initialized');
      }

      const response = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: to
      });
      
      return { success: true, sid: response.sid };
    } catch (error) {
      console.error('Twilio SMS error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new TwilioService();