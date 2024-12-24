const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  phoneNumbers: [{
    type: String,
    required: true
  }],
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);