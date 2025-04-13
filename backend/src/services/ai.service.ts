import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import logger from '../utils/logger';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AIService {
  /**
   * Send a message to the AI and get a response
   */
  static async chat(userId: string, message: string, context?: string, language: string = 'en') {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system' as const, content: `You are a helpful AI tutor. Respond in ${language}.` },
          ...(context ? [{ role: 'system' as const, content: `Context: ${context}` }] : []),
          { role: 'user' as const, content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const reply = response.choices[0]?.message?.content || 'No response generated';

      // Store the chat in the database
      await prisma.conversation.create({
        data: {
          userId,
          message,
          response: reply,
          context,
          language
        }
      });

      return { reply };
    } catch (error) {
      logger.error('Error in AI chat service:', error);
      throw error;
    }
  }
  
  /**
   * Analyze a user's prompt and provide feedback
   */
  static async analyze(
    userId: string,
    prompt: string,
    context?: string,
    analysisType: 'basic' | 'detailed' | 'comprehensive' = 'basic',
    includeExamples: boolean = false
  ) {
    try {
      const systemPrompt = this.getAnalysisPrompt(analysisType, includeExamples);
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system' as const, content: systemPrompt },
          ...(context ? [{ role: 'system' as const, content: `Context: ${context}` }] : []),
          { role: 'user' as const, content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 2000
      });

      const analysis = response.choices[0]?.message?.content || 'No analysis generated';

      // Store the analysis in the database
      const result = await prisma.analysis.create({
        data: {
          userId,
          prompt,
          context,
          type: analysisType,
          includeExamples,
          result: analysis
        }
      });

      return { id: result.id, analysis };
    } catch (error) {
      logger.error('Error in AI analysis service:', error);
      throw error;
    }
  }
  
  /**
   * Evaluate a user's prompt against a challenge
   */
  static async evaluate(
    userId: string,
    prompt: string,
    challengeId: string,
    evaluationCriteria?: string[],
    includeFeedback: boolean = true
  ) {
    try {
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        include: {
          criteria: true
        }
      });

      if (!challenge) {
        throw new Error('Challenge not found');
      }

      const criteria = evaluationCriteria || challenge.criteria.map(c => c.description);
      const systemPrompt = this.getEvaluationPrompt(criteria, includeFeedback);

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system' as const, content: systemPrompt },
          { role: 'system' as const, content: `Challenge: ${challenge.description}` },
          { role: 'user' as const, content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const evaluation = response.choices[0]?.message?.content || 'No evaluation generated';

      // Store the evaluation in the database
      const result = await prisma.evaluation.create({
        data: {
          userId,
          prompt,
          challengeId,
          criteria,
          includeFeedback,
          result: evaluation
        }
      });

      return { id: result.id, evaluation };
    } catch (error) {
      logger.error('Error in AI evaluation service:', error);
      throw error;
    }
  }
  
  /**
   * Get user's learning context based on their progress
   */
  private static async getUserLearningContext(userId: string): Promise<string> {
    try {
      // Get user's recent progress
      const recentProgress = await prisma.progress.findMany({
        where: { userId },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        include: {
          lesson: {
            include: {
              module: {
                include: {
                  course: true
                }
              }
            }
          }
        }
      });
      
      if (recentProgress.length === 0) {
        return 'New user with no learning history';
      }
      
      // Build context from recent lessons
      const context = recentProgress.map(p => 
        `Course: ${p.lesson.module.course.title}, Module: ${p.lesson.module.title}, Lesson: ${p.lesson.title}`
      ).join('; ');
      
      return `User is learning about: ${context}`;
    } catch (error) {
      console.error('Error getting user context:', error);
      return 'Unable to retrieve learning context';
    }
  }
  
  /**
   * Create system message for AI based on user context
   */
  private static createSystemMessage(context: string): string {
    return `
      You are an AI tutor specializing in prompt engineering. Your role is to help users learn how to create effective prompts for AI models.
      
      ${context}
      
      Provide helpful, educational responses that:
      1. Explain concepts clearly
      2. Give specific examples
      3. Suggest improvements to user prompts
      4. Encourage experimentation and learning
      5. Stay within ethical boundaries
      
      If the user asks about something outside prompt engineering, politely redirect them back to the topic.
    `;
  }
  
  /**
   * Save conversation to database
   */
  private static async saveConversation(userId: string, userMessage: string, aiResponse: string) {
    try {
      // In a real implementation, you would save this to a conversations table
      // For now, we'll just log it
      console.log(`Conversation saved for user ${userId}`);
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }

  static async getAnalysis(id: string, userId: string) {
    const analysis = await prisma.analysis.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!analysis) {
      throw new Error('Analysis not found');
    }

    return analysis;
  }

  static async getEvaluation(id: string, userId: string) {
    const evaluation = await prisma.evaluation.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!evaluation) {
      throw new Error('Evaluation not found');
    }

    return evaluation;
  }

  private static getAnalysisPrompt(type: string, includeExamples: boolean): string {
    let prompt = 'Analyze the following prompt based on these criteria:\n';
    
    switch (type) {
      case 'comprehensive':
        prompt += '- Clarity and specificity\n';
        prompt += '- Goal alignment\n';
        prompt += '- Constraints and requirements\n';
        prompt += '- Edge cases and potential issues\n';
        prompt += '- Language and tone\n';
        prompt += '- Context completeness\n';
        break;
      case 'detailed':
        prompt += '- Clarity and specificity\n';
        prompt += '- Goal alignment\n';
        prompt += '- Constraints and requirements\n';
        break;
      default: // basic
        prompt += '- Clarity and specificity\n';
        prompt += '- Goal alignment\n';
    }

    if (includeExamples) {
      prompt += '\nProvide examples of how the prompt could be improved.';
    }

    return prompt;
  }

  private static getEvaluationPrompt(criteria: string[], includeFeedback: boolean): string {
    let prompt = 'Evaluate the following prompt against these criteria:\n';
    criteria.forEach(c => prompt += `- ${c}\n`);
    
    if (includeFeedback) {
      prompt += '\nProvide specific feedback and suggestions for improvement.';
    }

    return prompt;
  }
} 