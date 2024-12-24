const express = require('express');
const router = express.Router();
const { 
  sendSMS, 
  getHistory, 
  deleteMessage, 
  deleteAllMessages 
} = require('../controllers/smsController');

router.post('/send', sendSMS);
router.get('/history', getHistory);
router.delete('/message/:id', deleteMessage);
router.delete('/messages', deleteAllMessages);

module.exports = router;