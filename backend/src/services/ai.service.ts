import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AIService {
  /**
   * Send a message to the AI and get a response
   */
  static async chat(userId: string, message: string, context?: string) {
    try {
      // Get user's learning context if available
      const userContext = context || await this.getUserLearningContext(userId);
      
      // Create system message based on context
      const systemMessage = this.createSystemMessage(userContext);
      
      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      // Save conversation to database
      await this.saveConversation(userId, message, response.choices[0].message.content || '');
      
      return {
        response: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error) {
      console.error('Error in AI chat:', error);
      throw new Error('Failed to get AI response');
    }
  }
  
  /**
   * Analyze a user's prompt and provide feedback
   */
  static async analyzePrompt(prompt: string, context?: string) {
    try {
      const analysisPrompt = `
        Analyze the following prompt for an AI model. Provide feedback on:
        1. Clarity: How clear and unambiguous is the prompt?
        2. Structure: Is it well-organized and logical?
        3. Completeness: Does it include all necessary context and instructions?
        4. Efficiency: Could it be more concise or optimized?
        5. Potential improvements: Specific suggestions for improvement.
        
        Context: ${context || 'General prompt engineering'}
        
        Prompt to analyze: "${prompt}"
        
        Provide your analysis in JSON format with the following structure:
        {
          "clarity": { "score": 1-10, "feedback": "explanation" },
          "structure": { "score": 1-10, "feedback": "explanation" },
          "completeness": { "score": 1-10, "feedback": "explanation" },
          "efficiency": { "score": 1-10, "feedback": "explanation" },
          "improvements": ["suggestion1", "suggestion2", ...],
          "overallScore": 1-10,
          "summary": "brief summary of analysis"
        }
      `;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an expert prompt engineer analyzing prompts." },
          { role: "user", content: analysisPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      });
      
      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error in prompt analysis:', error);
      throw new Error('Failed to analyze prompt');
    }
  }
  
  /**
   * Evaluate a user's prompt against a challenge
   */
  static async evaluatePrompt(userPrompt: string, challengeId: string) {
    try {
      // Get challenge details
      const challenge = await prisma.challenge.findUnique({
        where: { id: challengeId },
        include: {
          solution: true,
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
      
      if (!challenge) {
        throw new Error('Challenge not found');
      }
      
      // Create evaluation prompt
      const evaluationPrompt = `
        Evaluate the following user prompt against the challenge requirements.
        
        Challenge: ${challenge.title}
        Description: ${challenge.description}
        Difficulty: ${challenge.difficulty}
        Expected Solution: ${challenge.solution?.content || 'Not provided'}
        
        User's Prompt: "${userPrompt}"
        
        Evaluate the prompt and provide feedback in JSON format with the following structure:
        {
          "score": 1-100,
          "meetsRequirements": true/false,
          "feedback": "detailed feedback",
          "suggestions": ["suggestion1", "suggestion2", ...],
          "correctness": 1-10,
          "creativity": 1-10,
          "efficiency": 1-10
        }
      `;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an expert prompt engineer evaluating prompts against specific challenges." },
          { role: "user", content: evaluationPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1500,
        response_format: { type: "json_object" }
      });
      
      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error in prompt evaluation:', error);
      throw new Error('Failed to evaluate prompt');
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
} 