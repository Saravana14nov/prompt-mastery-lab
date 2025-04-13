import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: adminPassword,
        name: 'Admin User',
        role: 'ADMIN',
        profile: {
          create: {
            bio: 'System Administrator',
            preferences: {
              theme: 'dark',
              notifications: true
            }
          }
        }
      }
    });

    // Create sample course
    const course = await prisma.course.create({
      data: {
        title: 'Introduction to Prompt Engineering',
        description: 'Learn the basics of prompt engineering and how to create effective prompts for AI models.',
        level: 'BASIC',
        modules: {
          create: [
            {
              title: 'Understanding Prompts',
              description: 'Learn what prompts are and how they work with AI models.',
              order: 1,
              lessons: {
                create: [
                  {
                    title: 'What is a Prompt?',
                    content: {
                      sections: [
                        {
                          type: 'text',
                          content: 'A prompt is a text input that tells an AI model what you want it to do.',
                          formatting: { heading: 2 }
                        },
                        {
                          type: 'example',
                          prompt: 'Write a story about a magical forest.',
                          expectedOutput: {
                            type: 'story',
                            length: 'short',
                            elements: ['magical', 'forest', 'characters']
                          }
                        }
                      ]
                    },
                    order: 1
                  }
                ]
              }
            }
          ]
        }
      }
    });

    console.log('Database initialized with sample data:');
    console.log('Admin user:', admin.email);
    console.log('Sample course:', course.title);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 