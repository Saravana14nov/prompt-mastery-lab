import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { z } from 'zod';

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const updateProfileSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  preferences: z.any().optional()
});

export class AuthController {
  /**
   * Register a new user
   */
  static async register(req: Request, res: Response) {
    try {
      // Validate request body
      const { email, password, name } = registerSchema.parse(req.body);

      // Register user
      const result = await UserService.register(email, password, name);

      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }

      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message
        });
      }

      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }

  /**
   * Login user
   */
  static async login(req: Request, res: Response) {
    try {
      // Validate request body
      const { email, password } = loginSchema.parse(req.body);

      // Login user
      const result = await UserService.login(email, password);

      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }

      if (error instanceof Error) {
        return res.status(401).json({
          error: error.message
        });
      }

      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }

  /**
   * Get user profile
   */
  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({
          error: 'Not authenticated'
        });
      }

      const profile = await UserService.getProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({
          error: 'Not authenticated'
        });
      }

      // Validate request body
      const data = updateProfileSchema.parse(req.body);

      // Update profile
      const profile = await UserService.updateProfile(req.user.id, data);
      res.json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }

      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
} 