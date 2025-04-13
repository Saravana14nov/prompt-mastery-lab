import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import aiRoutes from './routes/ai.routes';
import logger, { stream, requestLogger, errorLogger } from './utils/logger';
import { swaggerSpec } from './utils/swagger';
import { 
  promMiddleware, 
  aiMetricsMiddleware, 
  cacheMetricsMiddleware,
  register
} from './utils/monitoring';

// Load environment variables
config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Create Express application
const app = express();

// Middleware
// Enable CORS for frontend requests
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:5173']
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Request logging
app.use(morgan('combined', { stream }));
app.use(requestLogger);

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Prometheus metrics
app.use(promMiddleware);
app.use(aiMetricsMiddleware);
app.use(cacheMetricsMiddleware);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Prompt Mastery Lab API Documentation'
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// 404 handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorLogger);
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
      details: err.message
    });
  }

  // Default error response
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
  logger.info(`Metrics available at http://localhost:${PORT}/metrics`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Closing HTTP server and Prisma client...');
  await prisma.$disconnect();
  process.exit(0);
}); 