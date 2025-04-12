
import { Lesson } from "@/types";

export const lessons: Lesson[] = [
  // MODULE 1: Introduction to Prompting
  {
    id: "intro-what-is-prompt-eng",
    moduleId: "basic-intro",
    title: "What is Prompt Engineering?",
    description: "An introduction to prompt engineering and its importance in AI interactions.",
    content: `
      <h1>What is Prompt Engineering?</h1>
      <p>Prompt engineering is the skill of communicating effectively with AI systems through carefully designed text instructions called prompts. Think of it as learning to speak a new language - the language of AI.</p>
      <p>When you interact with an AI like Claude, ChatGPT, or other large language models, the quality of your results depends significantly on how you frame your requests. A well-crafted prompt can be the difference between receiving a generic, unhelpful response and getting precisely the information or assistance you need.</p>
      <p>The core principle of prompt engineering is understanding that these AI systems don't "think" the way humans do. While they appear conversational, they're actually predicting what text should come next based on patterns they've learned from vast amounts of data. Your prompt is essentially guiding this prediction process.</p>
      <h2>The Core Components</h2>
      <p>Effective prompts generally share these characteristics:</p>
      <ul>
        <li><strong>Clarity</strong> in describing what you want</li>
        <li><strong>Sufficient context</strong> for the AI to understand your request</li>
        <li><strong>Appropriate formatting</strong> that helps structure the response</li>
        <li><strong>The right level of specificity</strong> for your needs</li>
      </ul>
      <h2>Practice Example</h2>
      <p>Compare these two prompts:</p>
      <pre><code>"Tell me about dogs."</code></pre>
      <p>versus:</p>
      <pre><code>"Explain the care requirements for first-time dog owners, including feeding, exercise, and training basics for medium-sized breeds."</code></pre>
      <p>The second prompt is much more likely to generate helpful, specific information for someone looking to adopt their first dog.</p>
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
      <h1>How AI Understands Prompts</h1>
      <p>When you send a prompt to an AI, it processes your text within what's called a "context window" - the amount of text it can consider at one time. This window includes your current prompt and, in a conversation, the previous exchanges as well.</p>
      <h2>AI's Limitations and Processing</h2>
      <p>Unlike humans, AI doesn't have intuition or assumptions based on lived experience. It doesn't "know" what you're thinking or what might seem obvious from context unless explicitly stated. This is why being clear and comprehensive in your prompts is so important.</p>
      <p>AI systems interpret your prompts as patterns to match and extend. They don't have goals, intentions, or understanding in the human sense. Instead, they predict what text would most likely follow your prompt based on their training data.</p>
      <h2>Common Misconceptions</h2>
      <p>Some common misconceptions about AI understanding include:</p>
      <ul>
        <li>Assuming the AI "knows" what you want without explicit instructions</li>
        <li>Believing the AI can read between the lines like a human</li>
        <li>Expecting the AI to remember information outside the current conversation</li>
        <li>Thinking more words always leads to better responses</li>
      </ul>
      <h2>Practice Exercise</h2>
      <p>Try to identify why this prompt might confuse an AI:</p>
      <pre><code>"I need that information from yesterday that I was talking about."</code></pre>
      <p>The issue is that this prompt lacks specificity and assumes the AI remembers what "that information" refers to, even if it was discussed in a previous, separate conversation.</p>
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
      <h1>Basic Prompt Structure</h1>
      <p>A well-structured prompt typically contains several key elements:</p>
      <ul>
        <li><strong>Clear instruction</strong>: The specific task or information request</li>
        <li><strong>Relevant context</strong>: Background information the AI needs</li>
        <li><strong>Format specification</strong>: How you want the response structured</li>
        <li><strong>Examples</strong>: (When helpful) Demonstrations of desired outputs</li>
        <li><strong>Constraints</strong>: Any limitations or specific requirements</li>
      </ul>
      <h2>Breaking Down the Structure</h2>
      <p>Let's break down a basic prompt structure:</p>
      <pre><code>I need [specific task] about [subject].
The context is [relevant background].
Please format the response as [desired format].</code></pre>
      <p>For example:</p>
      <pre><code>I need a summary of recent research on plant-based diets.
The context is that I'm writing a health newsletter for seniors.
Please format the response as 5 key findings, each with 1-2 sentences of explanation.</code></pre>
      <p>This prompt is clear about what information is needed, why it's needed, and how it should be presented.</p>
      <h2>Practice Exercise</h2>
      <p>Transform this vague prompt into a well-structured one:</p>
      <pre><code>"Tell me about climate change solutions."</code></pre>
      <p>Improved version:</p>
      <pre><code>"Explain 3-4 promising technologies for addressing climate change. For each technology, describe how it works, its current stage of development, and its potential impact. I'm a college student preparing for a class presentation, so please use clear, accessible language."</code></pre>
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
      <h1>Being Specific and Clear</h1>
      <p>Vague prompts lead to generic responses. When your prompt lacks specificity, the AI has to make assumptions about what you want, often resulting in broad, general information that may not address your actual needs.</p>
      <h2>Levels of Specificity</h2>
      <p>Consider these levels of specificity:</p>
      <ul>
        <li><strong>Too vague</strong>: "Tell me about stars."</li>
        <li><strong>Better</strong>: "Explain how stars form and evolve."</li>
        <li><strong>Specific</strong>: "Describe the life cycle of a medium-mass star like our sun, from formation to eventual fate."</li>
        <li><strong>Very specific</strong>: "Explain the key stages in our sun's life cycle for a high school astronomy presentation, including proto-star formation, main sequence, red giant phase, and white dwarf stage, with approximate timelines for each phase."</li>
      </ul>
      <h2>Finding the Right Balance</h2>
      <p>The appropriate level of specificity depends on your needs, but you generally want to:</p>
      <ul>
        <li>Clearly state your objective</li>
        <li>Specify any relevant constraints or parameters</li>
        <li>Indicate the depth of information needed</li>
        <li>Mention your purpose or use case when relevant</li>
      </ul>
      <h2>Practice Exercise</h2>
      <p>Rewrite these vague prompts to be more specific:</p>
      <pre><code>"Help me with math."
"Give me ideas for my presentation."</code></pre>
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
      <h1>Providing Context</h1>
      <p>Context gives the AI important background information that helps it generate more relevant, personalized responses. Good context can include:</p>
      <ul>
        <li><strong>Your goal or purpose</strong>: Why you need this information</li>
        <li><strong>Your audience</strong>: Who will be reading or using the response</li>
        <li><strong>Your level of expertise</strong>: How technical or simple the response should be</li>
        <li><strong>Relevant constraints</strong>: Time limits, word counts, or other restrictions</li>
        <li><strong>Prior knowledge</strong>: What you already know about the topic</li>
      </ul>
      <h2>Context in Action</h2>
      <p>For example, compare:</p>
      <pre><code>"Tell me about quantum computing."</code></pre>
      <p>Versus:</p>
      <pre><code>"I'm a software developer with no physics background. Explain quantum computing basics in a way that relates to classical computing concepts I'd be familiar with. I'm trying to understand if I should be learning about quantum algorithms for my career."</code></pre>
      <p>The second prompt provides context about your background, knowledge level, and why you need the information, which helps the AI tailor its response appropriately.</p>
      <h2>Practice Exercise</h2>
      <p>Add appropriate context to this prompt:</p>
      <pre><code>"List healthy meal options."</code></pre>
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
      <h1>Formatting Your Requests</h1>
      <p>Specifying the format you want can make AI responses much more useful and easier to use. Some common formats you can request include:</p>
      <ul>
        <li><strong>Lists</strong>: Bullet points or numbered lists for easy scanning</li>
        <li><strong>Tables</strong>: Organized comparison of multiple items or attributes</li>
        <li><strong>Step-by-step instructions</strong>: Sequential processes or procedures</li>
        <li><strong>Pros and cons</strong>: Balanced evaluation of options</li>
        <li><strong>Q&A format</strong>: Information organized as questions and answers</li>
        <li><strong>Sections with headings</strong>: Organized chunks of information</li>
      </ul>
      <h2>Format Example</h2>
      <p>For example:</p>
      <pre><code>"Explain the basic principles of effective public speaking. Format your response as a numbered list of 5-7 key principles, with each principle having a clear, concise title and 2-3 sentences of explanation."</code></pre>
      <p>This format request helps organize the information in a way that's easy to read and remember.</p>
      <h2>Practice Exercise</h2>
      <p>Add formatting instructions to this prompt:</p>
      <pre><code>"Tell me ways to improve my productivity while working from home."</code></pre>
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
      <h1>Common Prompt Mistakes</h1>
      <p>Even experienced users make prompt mistakes. Being aware of common pitfalls can help you avoid them:</p>
      <ul>
        <li><strong>Being too vague</strong>: "Tell me about business" is too broad to get useful information.</li>
        <li><strong>Being overly complex</strong>: Long, convoluted prompts with multiple questions and requirements can confuse the AI or lead to partial responses.</li>
        <li><strong>Using ambiguous language</strong>: Words or phrases with multiple interpretations create confusion.</li>
        <li><strong>Omitting critical context</strong>: Leaving out information the AI needs to give an appropriate response.</li>
        <li><strong>Asking for speculation presented as fact</strong>: Requesting the AI to make predictions or claims beyond its capabilities.</li>
        <li><strong>Contradictory requirements</strong>: Asking for both brevity and exhaustive detail, for example.</li>
        <li><strong>Assuming prior conversation knowledge</strong>: Starting new sessions with references to previous conversations.</li>
      </ul>
      <h2>Identifying Problems</h2>
      <p>When your prompt isn't getting the results you want, check for these common issues:</p>
      <ul>
        <li>Is your request clear and specific?</li>
        <li>Have you provided necessary context?</li>
        <li>Are your instructions consistent?</li>
        <li>Is your request reasonable for an AI's capabilities?</li>
      </ul>
      <h2>Practice Exercise</h2>
      <p>Identify and fix the problems in this prompt:</p>
      <pre><code>"I mentioned something about that topic we discussed, can you elaborate on it more and give me a really detailed but quick explanation that covers everything important?"</code></pre>
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
      <h1>Iterative Prompting</h1>
      <p>Prompt engineering is often an iterative process. Your first prompt might not get you exactly what you need, but you can use each response to refine your approach.</p>
      <h2>The Iterative Process</h2>
      <p>The basic iterative prompting process:</p>
      <ol>
        <li>Start with a clear initial prompt</li>
        <li>Evaluate the response - Is it close to what you need? What's missing or incorrect?</li>
        <li>Refine your prompt based on what worked and what didn't</li>
        <li>Try again with the improved prompt</li>
        <li>Repeat until you get satisfactory results</li>
      </ol>
      <h2>Refinement Techniques</h2>
      <p>When refining prompts, you can:</p>
      <ul>
        <li>Add more specific instructions</li>
        <li>Clarify ambiguous parts</li>
        <li>Provide examples of desired outputs</li>
        <li>Add constraints or formatting requirements</li>
        <li>Split complex requests into simpler ones</li>
      </ul>
      <p>For example, if you asked for "ways to improve your writing" and got very general advice, you might follow up with:</p>
      <pre><code>"Those suggestions are helpful, but I'm looking for more specific techniques for improving descriptive writing in fiction. Could you provide 5 concrete exercises that would help me improve my sensory descriptions and setting details?"</code></pre>
      <h2>Practice Exercise</h2>
      <p>You asked: "Tell me about healthy eating" and received very general nutrition advice. Write a follow-up prompt to get more specific, actionable information.</p>
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
      <h1>Basic Prompt Patterns</h1>
      <p>Certain types of tasks benefit from specific prompt patterns. Here are some basic patterns you can adapt:</p>
      <h2>1. Information Request Pattern</h2>
      <pre><code>Explain [topic] at a [beginner/intermediate/advanced] level.
Focus on [specific aspects].
I already know [existing knowledge].</code></pre>
      <h2>2. Comparison Pattern</h2>
      <pre><code>Compare and contrast [X] and [Y] in terms of [specific attributes].
Present the information in a table format with pros and cons for each.</code></pre>
      <h2>3. Step-by-Step Guide Pattern</h2>
      <pre><code>Provide a step-by-step guide for [task].
For each step, include:
1. A brief explanation of what to do
2. Why this step is important
3. Any common mistakes to avoid</code></pre>
      <h2>4. Brainstorming Pattern</h2>
      <pre><code>I need creative ideas for [purpose].
The context is [situation].
Some requirements/constraints are [list constraints].
Generate 7-10 diverse ideas ranging from conventional to innovative.</code></pre>
      <h2>5. Analysis Pattern</h2>
      <pre><code>Analyze the following [text/situation/problem]:
[insert content]
Focus your analysis on [specific aspects].
Include potential [implications/solutions/interpretations].</code></pre>
      <h2>Practice Exercise</h2>
      <p>Select one of the prompt patterns above and adapt it for a specific need you have, such as learning about a topic, solving a problem, or creating content.</p>
    `,
    duration: "20 min",
    order: 3
  },
  
  // MODULE 4: Beginner Challenge Exercises
  {
    id: "challenge-info-extraction",
    moduleId: "basic-iteration",
    title: "Challenge: Information Extraction",
    description: "Practice extracting structured information from text.",
    content: `
      <h1>Challenge: Information Extraction</h1>
      <h2>Scenario</h2>
      <p>You need to extract specific information from a product description for a database.</p>
      <h2>Product Description</h2>
      <p>"The XPS-750 Bluetooth Headphones offer premium sound quality with 40mm drivers and active noise cancellation technology. Enjoy up to 30 hours of battery life and quick charging (10 min charge = 5 hours playback). These lightweight (255g) over-ear headphones feature memory foam ear cushions for extended comfort, voice assistant compatibility, and are available in Midnight Black, Arctic White, and Navy Blue. Retail price: $249.99. Includes 2-year warranty. Compatible with all Bluetooth devices and includes a 3.5mm audio cable for wired connections."</p>
      <h2>Your Task</h2>
      <p>Create a prompt that asks the AI to extract the following information from the product description:</p>
      <ul>
        <li>Product name</li>
        <li>Key features (at least 3)</li>
        <li>Battery specifications</li>
        <li>Available colors</li>
        <li>Price</li>
        <li>Warranty information</li>
      </ul>
      <p>Request the information in a structured format that would be easy to add to a database.</p>
      <h2>Solution Approach</h2>
      <p>Think about how to instruct the AI to:</p>
      <ol>
        <li>Identify specific pieces of information from the text</li>
        <li>Format the output in a structured way (like JSON or a table)</li>
        <li>Ensure all required fields are included</li>
      </ol>
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
      <h1>Challenge: Instructional Content</h1>
      <h2>Scenario</h2>
      <p>You're teaching a friend how to make a basic pasta dish, but they have very limited cooking experience.</p>
      <h2>Your Task</h2>
      <p>Create a prompt that asks the AI to generate beginner-friendly cooking instructions for making spaghetti with tomato sauce from scratch. Request that the instructions include:</p>
      <ul>
        <li>Required ingredients with measurements</li>
        <li>Required cooking tools</li>
        <li>Step-by-step instructions with time estimates</li>
        <li>Tips for common mistakes to avoid</li>
        <li>How to tell when the dish is properly cooked</li>
      </ul>
      <p>Structure your prompt to get the most clear, detailed, and beginner-friendly response possible.</p>
      <h2>Solution Approach</h2>
      <p>Consider:</p>
      <ol>
        <li>How to communicate the skill level of the audience</li>
        <li>What details a complete beginner would need</li>
        <li>How to structure the instructions for maximum clarity</li>
        <li>What formatting would make the instructions easiest to follow</li>
      </ol>
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
      <h1>Challenge: Creative Writing Help</h1>
      <h2>Scenario</h2>
      <p>You're writing a short story and need help developing a character.</p>
      <h2>Your Task</h2>
      <p>Create a prompt that asks the AI to help you develop a character for your story. The character is a retired detective living in a small coastal town who gets involved in solving a local mystery. Your prompt should request:</p>
      <ul>
        <li>Suggestions for the character's background and personality traits</li>
        <li>Potential character quirks or habits that make them interesting</li>
        <li>Their motivation for getting involved in the mystery</li>
        <li>A description of how they might approach solving problems</li>
        <li>Potential internal conflicts they might face</li>
      </ul>
      <p>Request the information in a narrative format that would help inspire your writing while leaving room for your own creativity.</p>
      <h2>Solution Approach</h2>
      <p>Think about:</p>
      <ol>
        <li>How to get creative suggestions without being too prescriptive</li>
        <li>Balancing specific details with open-ended possibilities</li>
        <li>How to get a response that inspires rather than limits your own creativity</li>
      </ol>
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
      <h1>Module Assessment</h1>
      <h2>Knowledge Check</h2>
      <ol>
        <li>What are the four essential elements of a well-structured prompt?</li>
        <li>Why is providing context important when crafting prompts?</li>
        <li>What is iterative prompting and when should you use it?</li>
        <li>Name three common prompt mistakes and how to avoid them.</li>
        <li>Explain the difference between a vague prompt and a specific prompt, with examples.</li>
      </ol>
      <h2>Practical Assessment</h2>
      <p>Take this vague, problematic prompt and transform it into an effective one:</p>
      <pre><code>"I need help with my project about environmental stuff for school that's due soon and it needs to be really good and informative and interesting so I get a good grade."</code></pre>
      <p>Your improved prompt should demonstrate the principles covered in this module, including specificity, context, clear instructions, and appropriate formatting.</p>
      <h2>Solution Approach</h2>
      <p>Apply everything you've learned about:</p>
      <ul>
        <li>Adding specificity</li>
        <li>Providing context</li>
        <li>Clear instructions</li>
        <li>Appropriate formatting</li>
        <li>Avoiding common mistakes</li>
      </ul>
    `,
    duration: "45 min",
    order: 4
  }
];
