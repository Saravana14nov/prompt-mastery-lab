import { z } from 'zod';

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