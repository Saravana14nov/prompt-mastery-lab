
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  lessons: number;
  progress?: number;
  image?: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  progress?: number;
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  order: number;
  completed?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  instructions: string;
  hints: string[];
  evaluation: string;
}

export interface UserPrompt {
  id: string;
  challengeId: string;
  content: string;
  score: number;
  feedback: string;
  createdAt: Date;
}
