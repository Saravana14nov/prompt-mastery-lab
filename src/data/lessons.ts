
import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  // Just adding a couple of sample lessons for demonstration
  {
    id: "basic-intro-lesson1",
    moduleId: "basic-intro",
    title: "What is Prompt Engineering?",
    description: "An introduction to prompt engineering and its importance in AI interactions.",
    content: `
# What is Prompt Engineering?

Prompt engineering is the process of designing and refining inputs to AI systems in order to get the most effective outputs. As modern AI systems like ChatGPT, Claude, and others are fundamentally large language models trained on vast amounts of text data, the way we communicate with them dramatically affects their responses.

## Why Prompt Engineering Matters

Good prompt engineering:

- **Improves output quality** - Well-engineered prompts lead to more accurate, relevant, and useful AI responses.
- **Saves time and resources** - Efficient prompts reduce the need for multiple iterations and clarifications.
- **Enables new applications** - Many complex AI use cases only become possible through advanced prompting techniques.
- **Reduces errors and hallucinations** - Proper prompting can minimize AI errors and confabulations.

## The Core Principles

At its heart, prompt engineering involves:

1. **Clarity** - Being explicit and unambiguous in your instructions
2. **Context** - Providing the AI with relevant background information
3. **Structure** - Organizing your prompt in a logical way
4. **Constraints** - Setting appropriate boundaries for the AI's response
5. **Examples** - Demonstrating the expected output format or style

## Basic vs. Advanced Prompt Engineering

Prompt engineering exists on a spectrum of complexity:

- **Basic prompting** involves straightforward questions or instructions
- **Advanced prompting** includes techniques like few-shot learning, chain-of-thought reasoning, and prompt chaining

In this course, we'll start with fundamentals and progressively build to more sophisticated techniques.

## Your First Prompt

Let's analyze a simple prompt:

\`\`\`
Explain quantum computing in simple terms.
\`\`\`

This prompt is clear but very open-ended. A more engineered version might be:

\`\`\`
Explain quantum computing in simple terms that a 10-year-old would understand. Use 3-4 short paragraphs and include a simple analogy. Don't use technical jargon.
\`\`\`

The second prompt provides much more guidance on the expected output, leading to a more tailored response.

In the next lesson, we'll look at the fundamental components that make up an effective prompt.
`,
    duration: "15 min",
    order: 1
  },
  {
    id: "basic-intro-lesson2",
    moduleId: "basic-intro",
    title: "The Anatomy of an Effective Prompt",
    description: "Understanding the key components and structure of effective prompts.",
    content: `
# The Anatomy of an Effective Prompt

Not all prompts are created equal. Understanding the common elements of effective prompts will help you create instructions that AI systems can understand and act upon correctly.

## Key Components of Effective Prompts

### 1. Instruction

The core of your prompt is the instruction - what you want the AI to do. This should be clear, specific, and actionable.

**Example:**
\`Write a product description for a waterproof Bluetooth speaker.\`

### 2. Context

Context provides background information that helps the AI understand the situation or requirements better.

**Example:**
\`I run an outdoor adventure equipment store targeting hikers and campers aged 25-40.\`

### 3. Input Data

This is the specific information the AI needs to work with.

**Example:**
\`The speaker has 20-hour battery life, is shock-resistant, has a carabiner clip, and comes in orange, green, and black.\`

### 4. Output Format

Specifying the desired format helps ensure you get results in the way you need them.

**Example:**
\`Format the description as 3-4 short paragraphs with bullet points for features. Include a catchy headline.\`

### 5. Tone and Style

Instructions about the voice, tone, or style guide the "personality" of the response.

**Example:**
\`Use an adventurous, energetic tone that appeals to outdoor enthusiasts.\`

### 6. Length Constraints

Guidance on how detailed or concise the response should be.

**Example:**
\`Keep the total description under 200 words.\`

### 7. Examples (optional)

Examples of desired outputs can clarify your expectations.

**Example:**
\`Here's an example of the tone I'm looking for: "Conquer the wilderness without sacrificing your soundtrack!"\`

## Putting It All Together

Let's combine these elements into a comprehensive prompt:

\`\`\`
Write a product description for a waterproof Bluetooth speaker. I run an outdoor adventure equipment store targeting hikers and campers aged 25-40. The speaker has 20-hour battery life, is shock-resistant, has a carabiner clip, and comes in orange, green, and black.

Format the description as 3-4 short paragraphs with bullet points for features. Include a catchy headline. Use an adventurous, energetic tone that appeals to outdoor enthusiasts. Keep the total description under 200 words.

Example tone: "Conquer the wilderness without sacrificing your soundtrack!"
\`\`\`

## Common Mistakes to Avoid

- **Being too vague** - "Write something about speakers" doesn't give enough direction
- **Contradictory instructions** - Asking for "comprehensive detail" but also "keep it very brief"
- **Overwhelming with requirements** - Too many specific demands can confuse the model
- **No clear purpose** - Not specifying what the output will be used for

In the next lesson, we'll practice building prompts with these components in mind.
`,
    duration: "15 min",
    order: 2
  }
];
