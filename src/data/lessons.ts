import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  // MODULE 1: Introduction to Prompting
  {
    id: "intro-what-is-prompt-eng",
    moduleId: "basic-intro",
    title: "What is Prompt Engineering?",
    description: "An introduction to prompt engineering and its importance in AI interactions.",
    content: `
# What is Prompt Engineering?

Prompt engineering is the skill of communicating effectively with AI systems through carefully designed text instructions called prompts. Think of it as learning to speak a new language - the language of AI.

When you interact with an AI like Claude, ChatGPT, or other large language models, the quality of your results depends significantly on how you frame your requests. A well-crafted prompt can be the difference between receiving a generic, unhelpful response and getting precisely the information or assistance you need.

## Why Prompt Engineering Matters

The core principle of prompt engineering is understanding that these AI systems don't "think" the way humans do. While they appear conversational, they're actually predicting what text should come next based on patterns they've learned from vast amounts of data. Your prompt is essentially guiding this prediction process.

## The Core Components

Effective prompts generally share these characteristics:

- **Clarity** in describing what you want
- **Sufficient context** for the AI to understand your request
- **Appropriate formatting** that helps structure the response
- **The right level of specificity** for your needs

## Practice Example

Compare these two prompts:

\`\`\`
"Tell me about dogs."
\`\`\`

versus:

\`\`\`
"Explain the care requirements for first-time dog owners, including feeding, exercise, and training basics for medium-sized breeds."
\`\`\`

The second prompt is much more likely to generate helpful, specific information for someone looking to adopt their first dog.
`,
    duration: "15 min",
    order: 1
  },
  {
    id: "intro-how-ai-understands",
    moduleId: "basic-intro",
    title: "How AI Understands Prompts",
    description: "Understanding how AI processes and responds to prompts helps you design more effective instructions.",
    content: `
# How AI Understands Prompts

When you send a prompt to an AI, it processes your text within what's called a "context window" - the amount of text it can consider at one time. This window includes your current prompt and, in a conversation, the previous exchanges as well.

## AI's Limitations and Processing

Unlike humans, AI doesn't have intuition or assumptions based on lived experience. It doesn't "know" what you're thinking or what might seem obvious from context unless explicitly stated. This is why being clear and comprehensive in your prompts is so important.

AI systems interpret your prompts as patterns to match and extend. They don't have goals, intentions, or understanding in the human sense. Instead, they predict what text would most likely follow your prompt based on their training data.

## Common Misconceptions

Some common misconceptions about AI understanding include:

- Assuming the AI "knows" what you want without explicit instructions
- Believing the AI can read between the lines like a human
- Expecting the AI to remember information outside the current conversation
- Thinking more words always leads to better responses

## Practice Exercise

Try to identify why this prompt might confuse an AI:

\`\`\`
"I need that information from yesterday that I was talking about."
\`\`\`

The issue is that this prompt lacks specificity and assumes the AI remembers what "that information" refers to, even if it was discussed in a previous, separate conversation.
`,
    duration: "15 min",
    order: 2
  },
  {
    id: "intro-basic-prompt-structure",
    moduleId: "basic-intro",
    title: "Basic Prompt Structure",
    description: "Learn the fundamental components of well-structured prompts.",
    content: `
# Basic Prompt Structure

A well-structured prompt typically contains several key elements:

- **Clear instruction**: The specific task or information request
- **Relevant context**: Background information the AI needs
- **Format specification**: How you want the response structured
- **Examples**: (When helpful) Demonstrations of desired outputs
- **Constraints**: Any limitations or specific requirements

## Breaking Down the Structure

Let's break down a basic prompt structure:

\`\`\`
I need [specific task] about [subject].
The context is [relevant background].
Please format the response as [desired format].
\`\`\`

For example:

\`\`\`
I need a summary of recent research on plant-based diets.
The context is that I'm writing a health newsletter for seniors.
Please format the response as 5 key findings, each with 1-2 sentences of explanation.
\`\`\`

This prompt is clear about what information is needed, why it's needed, and how it should be presented.

## Practice Exercise

Transform this vague prompt into a well-structured one:

\`\`\`
"Tell me about climate change solutions."
\`\`\`

Improved version:

\`\`\`
"Explain 3-4 promising technologies for addressing climate change. For each technology, describe how it works, its current stage of development, and its potential impact. I'm a college student preparing for a class presentation, so please use clear, accessible language."
\`\`\`
`,
    duration: "20 min",
    order: 3
  },
  
  // MODULE 2: Crafting Basic Prompts
  {
    id: "crafting-specific-clear",
    moduleId: "basic-structure",
    title: "Being Specific and Clear",
    description: "Learn how to avoid vague requests and create prompts with appropriate specificity.",
    content: `
# Being Specific and Clear

Vague prompts lead to generic responses. When your prompt lacks specificity, the AI has to make assumptions about what you want, often resulting in broad, general information that may not address your actual needs.

## Levels of Specificity

Consider these levels of specificity:

- **Too vague**: "Tell me about stars."
- **Better**: "Explain how stars form and evolve."
- **Specific**: "Describe the life cycle of a medium-mass star like our sun, from formation to eventual fate."
- **Very specific**: "Explain the key stages in our sun's life cycle for a high school astronomy presentation, including proto-star formation, main sequence, red giant phase, and white dwarf stage, with approximate timelines for each phase."

## Finding the Right Balance

The appropriate level of specificity depends on your needs, but you generally want to:

- Clearly state your objective
- Specify any relevant constraints or parameters
- Indicate the depth of information needed
- Mention your purpose or use case when relevant

## Practice Exercise

Rewrite these vague prompts to be more specific:

\`\`\`
"Help me with math."
"Give me ideas for my presentation."
\`\`\`
`,
    duration: "20 min",
    order: 1
  },
  {
    id: "crafting-providing-context",
    moduleId: "basic-structure",
    title: "Providing Context",
    description: "Learn why context matters and how to include the right background information in your prompts.",
    content: `
# Providing Context

Context gives the AI important background information that helps it generate more relevant, personalized responses. Good context can include:

- **Your goal or purpose**: Why you need this information
- **Your audience**: Who will be reading or using the response
- **Your level of expertise**: How technical or simple the response should be
- **Relevant constraints**: Time limits, word counts, or other restrictions
- **Prior knowledge**: What you already know about the topic

## Context in Action

For example, compare:

\`\`\`
"Tell me about quantum computing."
\`\`\`

Versus:

\`\`\`
"I'm a software developer with no physics background. Explain quantum computing basics in a way that relates to classical computing concepts I'd be familiar with. I'm trying to understand if I should be learning about quantum algorithms for my career."
\`\`\`

The second prompt provides context about your background, knowledge level, and why you need the information, which helps the AI tailor its response appropriately.

## Practice Exercise

Add appropriate context to this prompt:

\`\`\`
"List healthy meal options."
\`\`\`
`,
    duration: "15 min",
    order: 2
  },
  {
    id: "crafting-formatting-requests",
    moduleId: "basic-structure",
    title: "Formatting Your Requests",
    description: "Learn how to request specific formats and structures in AI responses.",
    content: `
# Formatting Your Requests

Specifying the format you want can make AI responses much more useful and easier to use. Some common formats you can request include:

- **Lists**: Bullet points or numbered lists for easy scanning
- **Tables**: Organized comparison of multiple items or attributes
- **Step-by-step instructions**: Sequential processes or procedures
- **Pros and cons**: Balanced evaluation of options
- **Q&A format**: Information organized as questions and answers
- **Sections with headings**: Organized chunks of information

## Format Example

For example:

\`\`\`
"Explain the basic principles of effective public speaking. Format your response as a numbered list of 5-7 key principles, with each principle having a clear, concise title and 2-3 sentences of explanation."
\`\`\`

This format request helps organize the information in a way that's easy to read and remember.

## Practice Exercise

Add formatting instructions to this prompt:

\`\`\`
"Tell me ways to improve my productivity while working from home."
\`\`\`
`,
    duration: "20 min",
    order: 3
  },
  
  // MODULE 3: Practice and Refinement
  {
    id: "practice-common-mistakes",
    moduleId: "basic-clarity",
    title: "Common Prompt Mistakes",
    description: "Learn about typical pitfalls in prompt writing and how to avoid them.",
    content: `
# Common Prompt Mistakes

Even experienced users make prompt mistakes. Being aware of common pitfalls can help you avoid them:

- **Being too vague**: "Tell me about business" is too broad to get useful information.
- **Being overly complex**: Long, convoluted prompts with multiple questions and requirements can confuse the AI or lead to partial responses.
- **Using ambiguous language**: Words or phrases with multiple interpretations create confusion.
- **Omitting critical context**: Leaving out information the AI needs to give an appropriate response.
- **Asking for speculation presented as fact**: Requesting the AI to make predictions or claims beyond its capabilities.
- **Contradictory requirements**: Asking for both brevity and exhaustive detail, for example.
- **Assuming prior conversation knowledge**: Starting new sessions with references to previous conversations.

## Identifying Problems

When your prompt isn't getting the results you want, check for these common issues:
- Is your request clear and specific?
- Have you provided necessary context?
- Are your instructions consistent?
- Is your request reasonable for an AI's capabilities?

## Practice Exercise

Identify and fix the problems in this prompt:

\`\`\`
"I mentioned something about that topic we discussed, can you elaborate on it more and give me a really detailed but quick explanation that covers everything important?"
\`\`\`
`,
    duration: "20 min",
    order: 1
  },
  {
    id: "practice-iterative-prompting",
    moduleId: "basic-clarity",
    title: "Iterative Prompting",
    description: "Learn how to refine your prompts based on AI responses to get better results.",
    content: `
# Iterative Prompting

Prompt engineering is often an iterative process. Your first prompt might not get you exactly what you need, but you can use each response to refine your approach.

## The Iterative Process

The basic iterative prompting process:

1. Start with a clear initial prompt
2. Evaluate the response - Is it close to what you need? What's missing or incorrect?
3. Refine your prompt based on what worked and what didn't
4. Try again with the improved prompt
5. Repeat until you get satisfactory results

## Refinement Techniques

When refining prompts, you can:

- Add more specific instructions
- Clarify ambiguous parts
- Provide examples of desired outputs
- Add constraints or formatting requirements
- Split complex requests into simpler ones

For example, if you asked for "ways to improve your writing" and got very general advice, you might follow up with:

\`\`\`
"Those suggestions are helpful, but I'm looking for more specific techniques for improving descriptive writing in fiction. Could you provide 5 concrete exercises that would help me improve my sensory descriptions and setting details?"
\`\`\`

## Practice Exercise

You asked: "Tell me about healthy eating" and received very general nutrition advice. Write a follow-up prompt to get more specific, actionable information.
`,
    duration: "25 min",
    order: 2
  },
  {
    id: "practice-basic-patterns",
    moduleId: "basic-clarity",
    title: "Basic Prompt Patterns",
    description: "Learn reusable patterns for common types of prompts.",
    content: `
# Basic Prompt Patterns

Certain types of tasks benefit from specific prompt patterns. Here are some basic patterns you can adapt:

## 1. Information Request Pattern

\`\`\`
Explain [topic] at a [beginner/intermediate/advanced] level. 
Focus on [specific aspects].
I already know [existing knowledge].
\`\`\`

## 2. Comparison Pattern

\`\`\`
Compare and contrast [X] and [Y] in terms of [specific attributes].
Present the information in a table format with pros and cons for each.
\`\`\`

## 3. Step-by-Step Guide Pattern

\`\`\`
Provide a step-by-step guide for [task].
For each step, include:
1. A brief explanation of what to do
2. Why this step is important
3. Any common mistakes to avoid
\`\`\`

## 4. Brainstorming Pattern

\`\`\`
I need creative ideas for [purpose].
The context is [situation].
Some requirements/constraints are [list constraints].
Generate 7-10 diverse ideas ranging from conventional to innovative.
\`\`\`

## 5. Analysis Pattern

\`\`\`
Analyze the following [text/situation/problem]:
[insert content]
Focus your analysis on [specific aspects].
Include potential [implications/solutions/interpretations].
\`\`\`

## Practice Exercise

Select one of the prompt patterns above and adapt it for a specific need you have, such as learning about a topic, solving a problem, or creating content.
`,
    duration: "20 min",
    order: 3
  },
  
  // MODULE 4: Challenges
  {
    id: "challenge-info-extraction",
    moduleId: "basic-iteration",
    title: "Challenge: Information Extraction",
    description: "Practice extracting structured information from text.",
    content: `
# Challenge: Information Extraction

## Scenario
You need to extract specific information from a product description for a database.

## Product Description
"The XPS-750 Bluetooth Headphones offer premium sound quality with 40mm drivers and active noise cancellation technology. Enjoy up to 30 hours of battery life and quick charging (10 min charge = 5 hours playback). These lightweight (255g) over-ear headphones feature memory foam ear cushions for extended comfort, voice assistant compatibility, and are available in Midnight Black, Arctic White, and Navy Blue. Retail price: $249.99. Includes 2-year warranty. Compatible with all Bluetooth devices and includes a 3.5mm audio cable for wired connections."

## Your Task
Create a prompt that asks the AI to extract the following information from the product description:

- Product name
- Key features (at least 3)
- Battery specifications
- Available colors
- Price
- Warranty information

Request the information in a structured format that would be easy to add to a database.

## Solution Approach
Think about how to instruct the AI to:
1. Identify specific pieces of information from the text
2. Format the output in a structured way (like JSON or a table)
3. Ensure all required fields are included
`,
    duration: "30 min",
    order: 1
  },
  {
    id: "challenge-instructional",
    moduleId: "basic-iteration",
    title: "Challenge: Instructional Content",
    description: "Create clear, detailed instructions for a beginner audience.",
    content: `
# Challenge: Instructional Content

## Scenario
You're teaching a friend how to make a basic pasta dish, but they have very limited cooking experience.

## Your Task
Create a prompt that asks the AI to generate beginner-friendly cooking instructions for making spaghetti with tomato sauce from scratch. Request that the instructions include:

- Required ingredients with measurements
- Required cooking tools
- Step-by-step instructions with time estimates
- Tips for common mistakes to avoid
- How to tell when the dish is properly cooked

Structure your prompt to get the most clear, detailed, and beginner-friendly response possible.

## Solution Approach
Consider:
1. How to communicate the skill level of the audience
2. What details a complete beginner would need
3. How to structure the instructions for maximum clarity
4. What formatting would make the instructions easiest to follow
`,
    duration: "30 min",
    order: 2
  },
  {
    id: "challenge-creative",
    moduleId: "basic-iteration",
    title: "Challenge: Creative Writing Help",
    description: "Get AI assistance for creative writing and character development.",
    content: `
# Challenge: Creative Writing Help

## Scenario
You're writing a short story and need help developing a character.

## Your Task
Create a prompt that asks the AI to help you develop a character for your story. The character is a retired detective living in a small coastal town who gets involved in solving a local mystery. Your prompt should request:

- Suggestions for the character's background and personality traits
- Potential character quirks or habits that make them interesting
- Their motivation for getting involved in the mystery
- A description of how they might approach solving problems
- Potential internal conflicts they might face

Request the information in a narrative format that would help inspire your writing while leaving room for your own creativity.

## Solution Approach
Think about:
1. How to get creative suggestions without being too prescriptive
2. Balancing specific details with open-ended possibilities
3. How to get a response that inspires rather than limits your own creativity
`,
    duration: "30 min",
    order: 3
  },
  {
    id: "module-assessment",
    moduleId: "basic-iteration",
    title: "Module Assessment",
    description: "Test your knowledge of prompt engineering basics.",
    content: `
# Module Assessment

## Knowledge Check

1. What are the four essential elements of a well-structured prompt?

2. Why is providing context important when crafting prompts?

3. What is iterative prompting and when should you use it?

4. Name three common prompt mistakes and how to avoid them.

5. Explain the difference between a vague prompt and a specific prompt, with examples.

## Practical Assessment

Take this vague, problematic prompt and transform it into an effective one:

\`\`\`
"I need help with my project about environmental stuff for school that's due soon and it needs to be really good and informative and interesting so I get a good grade."
\`\`\`

Your improved prompt should demonstrate the principles covered in this module, including specificity, context, clear instructions, and appropriate formatting.

## Solution Approach
Apply everything you've learned about:
- Adding specificity
- Providing context
- Clear instructions
- Appropriate formatting
- Avoiding common mistakes
`,
    duration: "45 min",
    order: 4
  },
  
  // Keep the original sample lessons
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
