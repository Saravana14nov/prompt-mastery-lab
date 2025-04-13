import { Request, Response } from 'express';
import { AIService } from '../services/ai.service';
import logger from '../utils/logger';
import { z } from 'zod';
import { chatSchema, analyzeSchema, evaluateSchema } from '../schemas';

// Validation schemas
export const chatSchema = z.object({
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

export const analyzeSchema = z.object({
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

export const evaluateSchema = z.object({
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

class AIController {
  static async chat(req: Request, res: Response) {
    try {
      const data = chatSchema.parse(req.body);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const response = await AIService.chat(userId, data.message, data.context, data.language);
      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      logger.error('Error in chat:', error);
      res.status(500).json({ error: 'Failed to process chat request' });
    }
  }

  static async analyze(req: Request, res: Response) {
    try {
      const data = analyzeSchema.parse(req.body);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const analysis = await AIService.analyze(
        userId,
        data.prompt,
        data.context,
        data.analysisType,
        data.includeExamples
      );
      res.json(analysis);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      logger.error('Error in analyze:', error);
      res.status(500).json({ error: 'Failed to analyze prompt' });
    }
  }

  static async evaluate(req: Request, res: Response) {
    try {
      const data = evaluateSchema.parse(req.body);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const evaluation = await AIService.evaluate(
        userId,
        data.prompt,
        data.challengeId,
        data.evaluationCriteria,
        data.includeFeedback
      );
      res.json(evaluation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      logger.error('Error in evaluate:', error);
      res.status(500).json({ error: 'Failed to evaluate prompt' });
    }
  }

  static async getAnalysis(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const analysis = await AIService.getAnalysis(id, userId);
      res.json(analysis);
    } catch (error) {
      logger.error('Error in getAnalysis:', error);
      res.status(500).json({ error: 'Failed to retrieve analysis' });
    }
  }

  static async getEvaluation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const evaluation = await AIService.getEvaluation(id, userId);
      res.json(evaluation);
    } catch (error) {
      logger.error('Error in getEvaluation:', error);
      res.status(500).json({ error: 'Failed to retrieve evaluation' });
    }
  }
}

export default AIController; 