import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth';
import { rateLimit } from 'express-rate-limit';
import { validateRequest } from '../middleware/validate';
import { cacheMiddleware, invalidateCache } from '../utils/cache';
import { z } from 'zod';

const router = Router();

// Rate limiting for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Validation schemas
const chatSchema = z.object({
  message: z.string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message must be less than 1000 characters')
    .refine(msg => msg.trim().length > 0, 'Message cannot be only whitespace'),
  context: z.string()
    .max(5000, 'Context must be less than 5000 characters')
    .optional(),
  language: z.enum(['en', 'es', 'fr', 'de'])
    .default('en')
    .optional()
});

const analyzeSchema = z.object({
  prompt: z.string()
    .min(1, 'Prompt cannot be empty')
    .max(2000, 'Prompt must be less than 2000 characters')
    .refine(p => p.trim().length > 0, 'Prompt cannot be only whitespace'),
  context: z.string()
    .max(5000, 'Context must be less than 5000 characters')
    .optional(),
  analysisType: z.enum(['basic', 'detailed', 'comprehensive'])
    .default('basic')
    .optional(),
  includeExamples: z.boolean()
    .default(false)
    .optional()
});

const evaluateSchema = z.object({
  prompt: z.string()
    .min(1, 'Prompt cannot be empty')
    .max(2000, 'Prompt must be less than 2000 characters')
    .refine(p => p.trim().length > 0, 'Prompt cannot be only whitespace'),
  challengeId: z.string()
    .uuid('Invalid challenge ID format')
    .refine(id => id.length === 36, 'Challenge ID must be 36 characters'),
  evaluationCriteria: z.array(z.string())
    .min(1, 'At least one evaluation criterion is required')
    .max(5, 'Maximum 5 evaluation criteria allowed')
    .optional(),
  includeFeedback: z.boolean()
    .default(true)
    .optional()
});

// Apply rate limiting to all AI routes
router.use(aiLimiter);

// Chat with AI tutor
router.post('/chat', 
  authenticate, 
  validateRequest({ body: chatSchema }),
  invalidateCache('^/api/ai/chat'),
  AIController.chat
);

// Analyze a prompt
router.post('/analyze', 
  authenticate, 
  validateRequest({ body: analyzeSchema }),
  invalidateCache('^/api/ai/analyze'),
  AIController.analyzePrompt
);

// Evaluate a prompt against a challenge
router.post('/evaluate', 
  authenticate, 
  validateRequest({ body: evaluateSchema }),
  invalidateCache('^/api/ai/evaluate'),
  AIController.evaluatePrompt
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