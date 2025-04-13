import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';
import { z } from 'zod';
import {
  createCourseSchema,
  updateCourseSchema,
  createModuleSchema,
  updateModuleSchema,
  createLessonSchema,
  updateLessonSchema
} from '../schemas';

export class CourseController {
  /**
   * Create a new course
   */
  static async createCourse(req: Request, res: Response) {
    try {
      const data = createCourseSchema.parse(req.body);
      const course = await CourseService.createCourse(data);
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get all courses with optional filtering
   */
  static async getCourses(req: Request, res: Response) {
    try {
      const filters = {
        level: req.query.level as 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | undefined,
        search: req.query.search as string | undefined
      };
      const courses = await CourseService.getCourses(filters);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get a course by ID
   */
  static async getCourseById(req: Request, res: Response) {
    try {
      const course = await CourseService.getCourseById(req.params.courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update a course
   */
  static async updateCourse(req: Request, res: Response) {
    try {
      const data = updateCourseSchema.parse(req.body);
      const course = await CourseService.updateCourse(req.params.courseId, data);
      res.json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete a course
   */
  static async deleteCourse(req: Request, res: Response) {
    try {
      await CourseService.deleteCourse(req.params.courseId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Create a new module
   */
  static async createModule(req: Request, res: Response) {
    try {
      const data = createModuleSchema.parse(req.body);
      const module = await CourseService.createModule(req.params.courseId, data);
      res.status(201).json(module);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update a module
   */
  static async updateModule(req: Request, res: Response) {
    try {
      const data = updateModuleSchema.parse(req.body);
      const module = await CourseService.updateModule(req.params.moduleId, data);
      res.json(module);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete a module
   */
  static async deleteModule(req: Request, res: Response) {
    try {
      await CourseService.deleteModule(req.params.moduleId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Create a new lesson
   */
  static async createLesson(req: Request, res: Response) {
    try {
      const data = createLessonSchema.parse(req.body);
      const lesson = await CourseService.createLesson(req.params.moduleId, data);
      res.status(201).json(lesson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update a lesson
   */
  static async updateLesson(req: Request, res: Response) {
    try {
      const data = updateLessonSchema.parse(req.body);
      const lesson = await CourseService.updateLesson(req.params.lessonId, data);
      res.json(lesson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors
        });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete a lesson
   */
  static async deleteLesson(req: Request, res: Response) {
    try {
      await CourseService.deleteLesson(req.params.lessonId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get course progress for a user
   */
  static async getCourseProgress(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const progress = await CourseService.getCourseProgress(
        req.user.id,
        req.params.courseId
      );
      res.json(progress);
    } catch (error) {
      if (error instanceof Error && error.message === 'Course not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 