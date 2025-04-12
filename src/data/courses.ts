
import { Course } from "@/types";

export const courses: Course[] = [
  {
    id: "basic-prompt-engineering",
    title: "Basic Prompt Engineering",
    description: "Learn the fundamental concepts of prompt engineering and how to write clear, effective prompts for AI systems.",
    level: "basic",
    duration: "4 hours",
    modules: 4,
    lessons: 12,
    progress: 0,
    image: "/placeholder.svg"
  },
  {
    id: "intermediate-prompt-techniques",
    title: "Intermediate Prompt Techniques",
    description: "Advance your prompt engineering skills with more complex techniques like chain-of-thought and structured outputs.",
    level: "intermediate",
    duration: "6 hours",
    modules: 5,
    lessons: 15,
    progress: 0,
    image: "/placeholder.svg"
  },
  {
    id: "advanced-prompt-mastery",
    title: "Advanced Prompt Mastery",
    description: "Master advanced prompt engineering concepts like few-shot learning, prompt chaining, and specialized domain prompting.",
    level: "advanced",
    duration: "8 hours",
    modules: 6,
    lessons: 18,
    progress: 0,
    image: "/placeholder.svg"
  }
];
