
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from 'lucide-react';

const ReferencePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock glossary terms
  const glossaryTerms = [
    {
      term: "Chain-of-Thought Prompting",
      definition: "A prompting technique that encourages the AI to break down its reasoning process into step-by-step explanations, leading to more accurate solutions to complex problems.",
      category: "techniques"
    },
    {
      term: "Few-Shot Learning",
      definition: "A prompting approach where examples are provided within the prompt itself to guide the AI in understanding the expected format or reasoning approach.",
      category: "techniques"
    },
    {
      term: "Zero-Shot Learning",
      definition: "Asking an AI to perform a task without any examples, relying solely on its pre-trained knowledge.",
      category: "techniques"
    },
    {
      term: "Prompt Template",
      definition: "A reusable structure for prompts that can be filled with specific information for consistent AI responses.",
      category: "concepts"
    },
    {
      term: "System Prompt",
      definition: "Instructions given to the AI that shape its overall behavior and responses, typically set at the beginning of a conversation.",
      category: "concepts"
    },
    {
      term: "Prompt Injection",
      definition: "A technique where a user attempts to override or bypass the original instructions given to an AI system.",
      category: "security"
    },
    {
      term: "Retrieval-Augmented Generation (RAG)",
      definition: "A technique that enhances LLM outputs by first retrieving relevant information from external sources before generating a response.",
      category: "techniques"
    },
    {
      term: "Hallucination",
      definition: "When an AI generates information that is factually incorrect or made up, despite appearing confident in its response.",
      category: "concepts"
    }
  ];

  // Mock prompt patterns
  const promptPatterns = [
    {
      name: "Role-Based Prompting",
      description: "Assign a specific role or persona to the AI to influence its response style and expertise.",
      example: "Act as an experienced physics professor explaining quantum mechanics to undergraduate students.",
      tags: ["persona", "expertise", "tone"]
    },
    {
      name: "Step-by-Step Instructions",
      description: "Break down complex requests into sequential steps for the AI to follow.",
      example: "Analyze this poem by following these steps: 1) Identify the meter and rhyme scheme, 2) Explain the key themes, 3) Describe the imagery used, 4) Interpret the overall meaning.",
      tags: ["structure", "process", "clarity"]
    },
    {
      name: "Format Specification",
      description: "Explicitly define the desired format for the AI's response.",
      example: "List the top 5 machine learning algorithms for classification problems. Format your answer as a table with columns for Algorithm Name, Best Use Case, and Limitations.",
      tags: ["output", "organization", "clarity"]
    },
    {
      name: "Few-Shot Examples",
      description: "Provide examples of the input-output pairs to guide the AI's responses.",
      example: "Convert these sentences to past tense:\nI eat dinner. -> I ate dinner.\nShe runs fast. -> She ran fast.\nThey build houses. ->",
      tags: ["examples", "learning", "pattern"]
    },
    {
      name: "Constraint Setting",
      description: "Establish specific limitations or requirements for the AI to follow.",
      example: "Write a summary of climate change impacts in under 100 words. Use only information from peer-reviewed sources. Do not discuss political opinions.",
      tags: ["boundaries", "specificity", "requirements"]
    },
    {
      name: "Evaluation Criteria",
      description: "Specify how the AI should evaluate options or make decisions.",
      example: "Compare these three smartphones based on: 1) camera quality, 2) battery life, 3) processing power, and 4) value for money. Rank them from best to worst overall.",
      tags: ["comparison", "criteria", "evaluation"]
    }
  ];

  // Filter glossary terms based on search
  const filteredGlossaryTerms = glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter prompt patterns based on search
  const filteredPromptPatterns = promptPatterns.filter(pattern =>
    pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pattern.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pattern.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reference Library</h1>
        <p className="text-muted-foreground mt-2">
          Browse prompt engineering concepts, techniques, and patterns
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search the reference library..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="glossary">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
          <TabsTrigger value="patterns">Prompt Patterns</TabsTrigger>
        </TabsList>
        
        {/* Glossary Content */}
        <TabsContent value="glossary" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGlossaryTerms.length > 0 ? (
              filteredGlossaryTerms.map((term, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{term.term}</CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {term.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{term.definition}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-12">
                <p className="text-muted-foreground">No glossary terms found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Prompt Patterns Content */}
        <TabsContent value="patterns" className="mt-6">
          <div className="space-y-6">
            {filteredPromptPatterns.length > 0 ? (
              filteredPromptPatterns.map((pattern, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle>{pattern.name}</CardTitle>
                    <CardDescription>{pattern.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Example:</h4>
                      <div className="bg-secondary p-3 rounded-md text-sm font-mono">
                        {pattern.example}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pattern.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No prompt patterns found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferencePage;
