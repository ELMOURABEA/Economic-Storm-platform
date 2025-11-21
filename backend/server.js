const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { getPool, closePool } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(compression()); // Compress responses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined')); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Economic Storm Platform API'
  });
});

// API Info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Economic Storm Platform API',
    version: process.env.API_VERSION || 'v1',
    endpoints: {
      projects: '/api/v1/projects',
      marketing: '/api/v1/marketing',
      business: '/api/v1/business',
      databank: '/api/v1/databank',
      ai: '/api/v1/ai'
    },
    documentation: 'https://github.com/ELMOURABEA/Economic-Storm-platform'
  });
});

// API Routes
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}/projects`, require('./routes/projects'));
app.use(`/api/${apiVersion}/ai`, require('./routes/ai'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    console.log('🔍 Testing database connection...');
    await getPool();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Economic Storm Platform API Server                  ║
║                                                           ║
║   Status: Running                                         ║
║   Port: ${PORT}                                           ║
║   Environment: ${process.env.NODE_ENV || 'development'}                                  ║
║   API Version: ${apiVersion}                                         ║
║                                                           ║
║   Health Check: http://localhost:${PORT}/health           ║
║   API Info: http://localhost:${PORT}/api                  ║
║                                                           ║
║   📊 SQL Server: Connected                                ║
║   🤖 Gemini AI: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Not Configured'}                             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server gracefully...');
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\nSIGINT received, closing server gracefully...');
  await closePool();
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
