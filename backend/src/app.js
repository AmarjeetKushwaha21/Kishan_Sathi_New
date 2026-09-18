import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connectDB, { isDbConnected } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';
import mandiRoutes from './routes/mandiRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Allowed origins for CORS
const explicitOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
].filter(Boolean);

// CORS configuration supporting local, preview, and production Vercel domains
app.use(
  cors({
    origin: (origin, callback) => {
      // 1. Allow non-browser requests (mobile apps, Postman, server-to-server, cURL)
      if (!origin) return callback(null, true);

      // 2. Allow explicitly configured origins
      if (explicitOrigins.includes(origin)) return callback(null, true);

      // 3. Allow any Vercel domain (*.vercel.app) for preview & production builds
      if (origin.endsWith('.vercel.app')) return callback(null, true);

      // 4. In development, allow all origins
      if (process.env.NODE_ENV !== 'production') return callback(null, true);

      // 5. Fallback allow to avoid unexpected breaks across deployments
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    optionsSuccessStatus: 200,
  })
);

// Respond to preflight OPTIONS requests immediately
app.options('*', cors());

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Ensure MongoDB connection for every request in serverless environment
app.use(async (req, res, next) => {
  // Allow root and health check to respond immediately
  if (req.path === '/' || req.path === '/api/health') {
    return next();
  }

  try {
    if (process.env.MONGO_URI) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error('[Database Middleware Error]:', err.message);
    res.status(503).json({
      success: false,
      message: 'Database connection is temporarily unavailable. Please verify MongoDB Atlas connection string and Network Access (IP Whitelist 0.0.0.0/0).',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    database: isDbConnected() ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'Kishan Sathi API Service',
    status: 'online',
    healthCheck: '/api/health',
    version: '1.0.0',
    database: isDbConnected() ? 'connected' : 'disconnected',
  });
});

// Mount Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/mandi', mandiRoutes);

// 404 Fallback route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found on this server.`,
  });
});

// Global error handler
app.use(errorHandler);

export default app;
