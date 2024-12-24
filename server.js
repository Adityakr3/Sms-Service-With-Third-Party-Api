require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const validateEnv = require('./utils/validateEnv');
const errorHandler = require('./middleware/errorHandler');
const smsRoutes = require('./routes/sms');

const app = express();
const PORT = process.env.PORT || 3000;

// Validate environment variables
if (!validateEnv()) {
  console.error('Environment validation failed');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
connectDB().catch(() => process.exit(1));

// Routes
app.use('/api/sms', smsRoutes);

// Error handling
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});