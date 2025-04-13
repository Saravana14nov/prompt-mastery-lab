import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/courses
 * @desc    Create a new course
 * @access  Private (Admin only)
 */
router.post('/', authenticate, authorize('ADMIN'), CourseController.createCourse);

/**
 * @route   GET /api/courses
 * @desc    Get all courses with optional filtering
 * @access  Public
 */
router.get('/', CourseController.getCourses);

/**
 * @route   GET /api/courses/:courseId
 * @desc    Get a course by ID
 * @access  Public
 */
router.get('/:courseId', CourseController.getCourseById);

/**
 * @route   PUT /api/courses/:courseId
 * @desc    Update a course
 * @access  Private (Admin only)
 */
router.put('/:courseId', authenticate, authorize('ADMIN'), CourseController.updateCourse);

/**
 * @route   DELETE /api/courses/:courseId
 * @desc    Delete a course
 * @access  Private (Admin only)
 */
router.delete('/:courseId', authenticate, authorize('ADMIN'), CourseController.deleteCourse);

/**
 * @route   POST /api/courses/:courseId/modules
 * @desc    Create a new module in a course
 * @access  Private (Admin only)
 */
router.post('/:courseId/modules', authenticate, authorize('ADMIN'), CourseController.createModule);

/**
 * @route   PUT /api/modules/:moduleId
 * @desc    Update a module
 * @access  Private (Admin only)
 */
router.put('/modules/:moduleId', authenticate, authorize('ADMIN'), CourseController.updateModule);

/**
 * @route   DELETE /api/modules/:moduleId
 * @desc    Delete a module
 * @access  Private (Admin only)
 */
router.delete('/modules/:moduleId', authenticate, authorize('ADMIN'), CourseController.deleteModule);

/**
 * @route   POST /api/modules/:moduleId/lessons
 * @desc    Create a new lesson in a module
 * @access  Private (Admin only)
 */
router.post('/modules/:moduleId/lessons', authenticate, authorize('ADMIN'), CourseController.createLesson);

/**
 * @route   PUT /api/lessons/:lessonId
 * @desc    Update a lesson
 * @access  Private (Admin only)
 */
router.put('/lessons/:lessonId', authenticate, authorize('ADMIN'), CourseController.updateLesson);

/**
 * @route   DELETE /api/lessons/:lessonId
 * @desc    Delete a lesson
 * @access  Private (Admin only)
 */
router.delete('/lessons/:lessonId', authenticate, authorize('ADMIN'), CourseController.deleteLesson);

/**
 * @route   GET /api/courses/:courseId/progress
 * @desc    Get user progress for a course
 * @access  Private
 */
router.get('/:courseId/progress', authenticate, CourseController.getCourseProgress);

export default router; 