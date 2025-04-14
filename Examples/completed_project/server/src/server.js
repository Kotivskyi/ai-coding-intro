const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const connectDB = require('./utils/db');
const config = require('./config/config');
require('dotenv').config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors(config.security.cors)); // Enable CORS with config
app.use(express.json()); // Parse JSON bodies
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging

// Rate limiting
const limiter = rateLimit(config.api.rateLimit);
app.use(limiter);

// API Routes
app.use(`${config.api.prefix}/health`, require('./routes/health.routes'));
app.use(`${config.api.prefix}/auth`, require('./routes/auth.routes'));
app.use(`${config.api.prefix}/chats`, require('./routes/chat.routes'));
// Add more routes here as we create them

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'AI Chat API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 