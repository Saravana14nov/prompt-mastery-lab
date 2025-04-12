
import { Module } from "@/types";

export const modules: Module[] = [
  // Basic Course Modules
  {
    id: "basic-intro",
    courseId: "basic-prompt-engineering",
    title: "Introduction to Prompt Engineering",
    description: "Learn the fundamental concepts and principles of prompt engineering.",
    lessons: 3,
    duration: "45 min",
    order: 1
  },
  {
    id: "basic-structure",
    courseId: "basic-prompt-engineering",
    title: "Prompt Structure and Components",
    description: "Understand the key components that make effective prompts.",
    lessons: 3,
    duration: "1 hour",
    order: 2
  },
  {
    id: "basic-clarity",
    courseId: "basic-prompt-engineering",
    title: "Clarity and Specificity",
    description: "Learn how to write clear and specific prompts to get better results.",
    lessons: 3,
    duration: "1 hour",
    order: 3
  },
  {
    id: "basic-iteration",
    courseId: "basic-prompt-engineering",
    title: "Prompt Iteration and Refinement",
    description: "Practice iterating and refining prompts to improve outcomes.",
    lessons: 3,
    duration: "1 hour 15 min",
    order: 4
  },
  
  // Intermediate Course Modules
  {
    id: "int-advanced-techniques",
    courseId: "intermediate-prompt-techniques",
    title: "Advanced Prompt Techniques",
    description: "Explore more sophisticated prompt engineering techniques.",
    lessons: 3,
    duration: "1 hour",
    order: 1
  },
  {
    id: "int-chain-of-thought",
    courseId: "intermediate-prompt-techniques",
    title: "Chain-of-Thought Prompting",
    description: "Guide AI through complex reasoning steps using chain-of-thought techniques.",
    lessons: 3,
    duration: "1 hour 15 min",
    order: 2
  },
  {
    id: "int-structured-output",
    courseId: "intermediate-prompt-techniques",
    title: "Structured Outputs",
    description: "Learn how to format prompts to get structured, parseable responses.",
    lessons: 3,
    duration: "1 hour 30 min",
    order: 3
  },
  {
    id: "int-few-shot",
    courseId: "intermediate-prompt-techniques",
    title: "Few-Shot Learning",
    description: "Use examples within prompts to teach AI the desired behavior or format.",
    lessons: 3,
    duration: "1 hour 15 min",
    order: 4
  },
  {
    id: "int-domain-specific",
    courseId: "intermediate-prompt-techniques",
    title: "Domain-Specific Prompting",
    description: "Tailor prompts for specific domains like code, creative writing, or data analysis.",
    lessons: 3,
    duration: "1 hour",
    order: 5
  },
  
  // Advanced Course Modules
  {
    id: "adv-prompt-chaining",
    courseId: "advanced-prompt-mastery",
    title: "Prompt Chaining",
    description: "Build complex workflows by chaining multiple prompts together.",
    lessons: 3,
    duration: "1 hour 30 min",
    order: 1
  },
  {
    id: "adv-system-design",
    courseId: "advanced-prompt-mastery",
    title: "AI System Design with Prompts",
    description: "Design complete AI systems using sophisticated prompt engineering.",
    lessons: 3,
    duration: "1 hour 45 min",
    order: 2
  },
  {
    id: "adv-multi-agent",
    courseId: "advanced-prompt-mastery",
    title: "Multi-Agent Prompting",
    description: "Create and coordinate multiple AI personas to solve complex problems.",
    lessons: 3,
    duration: "1 hour 30 min",
    order: 3
  },
  {
    id: "adv-robustness",
    courseId: "advanced-prompt-mastery",
    title: "Prompt Robustness and Reliability",
    description: "Develop techniques to make prompts more robust across different scenarios.",
    lessons: 3,
    duration: "1 hour 15 min",
    order: 4
  },
  {
    id: "adv-optimization",
    courseId: "advanced-prompt-mastery",
    title: "Token Optimization and Efficiency",
    description: "Optimize prompts for token usage and performance efficiency.",
    lessons: 3,
    duration: "1 hour",
    order: 5
  },
  {
    id: "adv-evaluation",
    courseId: "advanced-prompt-mastery",
    title: "Prompt Evaluation and Testing",
    description: "Learn systematic approaches to evaluate and test prompt effectiveness.",
    lessons: 3,
    duration: "1 hour",
    order: 6
  }
];
