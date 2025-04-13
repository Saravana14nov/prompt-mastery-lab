import { Request, Response } from 'express';
import { AIService } from '../services/ai.service';
import { z } from 'zod';

// Validation schemas
const chatSchema = z.object({
  message: z.string().min(1),
  context: z.string().optional()
});

const analyzePromptSchema = z.object({
  prompt: z.string().min(1),
  context: z.string().optional()
});

const evaluatePromptSchema = z.object({
  prompt: z.string().min(1),
  challengeId: z.string().min(1)
});

export class AIController {
  /**
   * Chat with the AI tutor
   */
  static async chat(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const data = chatSchema.parse(req.body);
      const result = await AIService.chat(req.user.id, data.message, data.context);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      console.error('Error in chat controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Analyze a prompt
   */
  static async analyzePrompt(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const data = analyzePromptSchema.parse(req.body);
      const result = await AIService.analyzePrompt(data.prompt, data.context);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      console.error('Error in analyzePrompt controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Evaluate a prompt against a challenge
   */
  static async evaluatePrompt(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const data = evaluatePromptSchema.parse(req.body);
      const result = await AIService.evaluatePrompt(data.prompt, data.challengeId);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      if (error instanceof Error && error.message === 'Challenge not found') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Error in evaluatePrompt controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 