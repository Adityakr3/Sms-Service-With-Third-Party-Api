const Message = require('../models/Message');
const twilioService = require('../services/twilioService');
const { validatePhoneNumbers } = require('../utils/validators');

const sendSMS = async (req, res, next) => {
  try {
    const { phoneNumbers, message } = req.body;
    
    if (!validatePhoneNumbers(phoneNumbers)) {
      return res.status(400).json({ error: 'Invalid phone numbers format' });
    }
    
    const newMessage = new Message({ phoneNumbers, message });
    
    const results = await Promise.all(
      phoneNumbers.map(number => twilioService.sendSMS(number, message))
    );
    
    newMessage.status = results.every(r => r.success) ? 'sent' : 'failed';
    await newMessage.save();
    
    res.json({ message: 'SMS batch processed', results });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const messages = await Message.find()
      .sort({ sentAt: -1 })
      .limit(100);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteAllMessages = async (req, res, next) => {
  try {
    await Message.deleteMany({});
    res.json({ message: 'All messages deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendSMS,
  getHistory,
  deleteMessage,
  deleteAllMessages
};