import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title must be less than 100 characters')
    .refine(title => title.trim().length > 0, 'Title cannot be only whitespace'),
  description: z.string()
    .min(1, 'Description cannot be empty')
    .max(500, 'Description must be less than 500 characters')
    .refine(desc => desc.trim().length > 0, 'Description cannot be only whitespace'),
  level: z.enum(['BASIC', 'INTERMEDIATE', 'ADVANCED'])
    .default('BASIC')
});

export const updateCourseSchema = createCourseSchema.partial();

export const createModuleSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title must be less than 100 characters')
    .refine(title => title.trim().length > 0, 'Title cannot be only whitespace'),
  description: z.string()
    .min(1, 'Description cannot be empty')
    .max(500, 'Description must be less than 500 characters')
    .refine(desc => desc.trim().length > 0, 'Description cannot be only whitespace'),
  order: z.number()
    .int('Order must be an integer')
    .min(0, 'Order must be non-negative')
});

export const updateModuleSchema = createModuleSchema.partial();

export const createLessonSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(100, 'Title must be less than 100 characters')
    .refine(title => title.trim().length > 0, 'Title cannot be only whitespace'),
  content: z.any(), // JSON content
  order: z.number()
    .int('Order must be an integer')
    .min(0, 'Order must be non-negative')
});

export const updateLessonSchema = createLessonSchema.partial(); 