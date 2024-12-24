const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use a default MongoDB URI if not provided
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sms-panel';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;