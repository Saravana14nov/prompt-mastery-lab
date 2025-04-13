import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CourseService {
  /**
   * Create a new course
   */
  static async createCourse(data: {
    title: string;
    description: string;
    level: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  }) {
    return prisma.course.create({
      data,
      include: {
        modules: true
      }
    });
  }

  /**
   * Get all courses with optional filtering
   */
  static async getCourses(filters?: {
    level?: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
    search?: string;
  }) {
    return prisma.course.findMany({
      where: {
        level: filters?.level,
        OR: filters?.search
          ? [
              { title: { contains: filters.search, mode: 'insensitive' } },
              { description: { contains: filters.search, mode: 'insensitive' } }
            ]
          : undefined
      },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    });
  }

  /**
   * Get a course by ID with all its modules and lessons
   */
  static async getCourseById(courseId: string) {
    return prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                challenges: true
              }
            }
          }
        }
      }
    });
  }

  /**
   * Update a course
   */
  static async updateCourse(
    courseId: string,
    data: {
      title?: string;
      description?: string;
      level?: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
    }
  ) {
    return prisma.course.update({
      where: { id: courseId },
      data,
      include: {
        modules: true
      }
    });
  }

  /**
   * Delete a course
   */
  static async deleteCourse(courseId: string) {
    return prisma.course.delete({
      where: { id: courseId }
    });
  }

  /**
   * Create a new module in a course
   */
  static async createModule(
    courseId: string,
    data: {
      title: string;
      description: string;
      order: number;
    }
  ) {
    return prisma.module.create({
      data: {
        ...data,
        courseId
      },
      include: {
        lessons: true
      }
    });
  }

  /**
   * Update a module
   */
  static async updateModule(
    moduleId: string,
    data: {
      title?: string;
      description?: string;
      order?: number;
    }
  ) {
    return prisma.module.update({
      where: { id: moduleId },
      data,
      include: {
        lessons: true
      }
    });
  }

  /**
   * Delete a module
   */
  static async deleteModule(moduleId: string) {
    return prisma.module.delete({
      where: { id: moduleId }
    });
  }

  /**
   * Create a new lesson in a module
   */
  static async createLesson(
    moduleId: string,
    data: {
      title: string;
      content: any; // JSON content
      order: number;
    }
  ) {
    return prisma.lesson.create({
      data: {
        ...data,
        moduleId
      },
      include: {
        challenges: true
      }
    });
  }

  /**
   * Update a lesson
   */
  static async updateLesson(
    lessonId: string,
    data: {
      title?: string;
      content?: any; // JSON content
      order?: number;
    }
  ) {
    return prisma.lesson.update({
      where: { id: lessonId },
      data,
      include: {
        challenges: true
      }
    });
  }

  /**
   * Delete a lesson
   */
  static async deleteLesson(lessonId: string) {
    return prisma.lesson.delete({
      where: { id: lessonId }
    });
  }

  /**
   * Get user progress for a course
   */
  static async getCourseProgress(userId: string, courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                challenges: true
              }
            }
          }
        }
      }
    });

    if (!course) {
      throw new Error('Course not found');
    }

    const progress = await prisma.progress.findMany({
      where: {
        userId,
        lessonId: {
          in: course.modules.flatMap(module => 
            module.lessons.map(lesson => lesson.id)
          )
        }
      }
    });

    return {
      course,
      progress: progress.reduce((acc, curr) => {
        acc[curr.lessonId] = curr;
        return acc;
      }, {} as Record<string, typeof progress[0]>)
    };
  }
} 