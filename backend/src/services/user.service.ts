import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class UserService {
  /**
   * Register a new user
   */
  static async register(email: string, password: string, name?: string) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profile: {
          create: {} // Create empty profile
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    // Generate JWT token
    const token = this.generateToken(user);

    return { user, token };
  }

  /**
   * Login user
   */
  static async login(email: string, password: string) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true
      }
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    };
  }

  /**
   * Generate JWT token
   */
  private static generateToken(user: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  }) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );
  }

  /**
   * Get user profile
   */
  static async getProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profile: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string,
    data: {
      name?: string;
      bio?: string;
      avatar?: string;
      preferences?: any;
    }
  ) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        profile: {
          update: {
            bio: data.bio,
            avatar: data.avatar,
            preferences: data.preferences
          }
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        profile: true
      }
    });
  }
} 