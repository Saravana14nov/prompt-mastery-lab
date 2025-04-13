import express from 'express';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { rateLimit } from 'express-rate-limit';
import AIController from '../controllers/ai.controller';
import { chatSchema, analyzeSchema, evaluateSchema } from '../utils/validation';
import { cacheMiddleware, invalidateCache } from '../utils/cache';

const router = express.Router();

// Rate limiting middleware
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
}) as express.RequestHandler;

// Apply rate limiting to all AI routes
router.use(aiLimiter);

// Chat with AI tutor
router.post(
  '/chat',
  authenticate,
  validateRequest(chatSchema),
  invalidateCache('^/api/ai/chat'),
  AIController.chat
);

// Analyze prompt
router.post(
  '/analyze',
  authenticate,
  validateRequest(analyzeSchema),
  invalidateCache('^/api/ai/analyze'),
  AIController.analyze
);

// Evaluate prompt against challenge
router.post(
  '/evaluate',
  authenticate,
  validateRequest(evaluateSchema),
  invalidateCache('^/api/ai/evaluate'),
  AIController.evaluate
);

// Cache analysis results for 1 hour
router.get('/analysis/:id', 
  authenticate,
  cacheMiddleware(3600),
  AIController.getAnalysis
);

// Cache evaluation results for 1 hour
router.get('/evaluation/:id', 
  authenticate,
  cacheMiddleware(3600),
  AIController.getEvaluation
);

export default router; 