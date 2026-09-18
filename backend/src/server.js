import dotenv from 'dotenv';
import path from 'node:path';
import app from './app.js';
import connectDB from './config/db.js';

// Load environment variables from backend/.env
dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Attempt MongoDB connection (graceful fallback if local Mongo is not running)
    await connectDB();

    // Start Express listener
    const server = app.listen(PORT, () => {
      console.log('====================================================');
      console.log(`🌾 Kishan Sathi Backend Server running in [${process.env.NODE_ENV || 'development'}] mode`);
      console.log(`🚀 API Base URL: http://localhost:${PORT}`);
      console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`💻 Client URL:   ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
      console.log('====================================================');
    });

    // Graceful shutdown handlers
    const shutdown = (signal) => {
      console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('[Server] Closed remaining connections. Exiting process.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (reason, promise) => {
      console.error('[Unhandled Rejection at]:', promise, 'reason:', reason);
    });
  } catch (error) {
    console.error('[Server Error] Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
