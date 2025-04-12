
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChallengeCard from '@/components/challenge/ChallengeCard';
import { Search } from 'lucide-react';
import { Challenge } from '@/types';

const ChallengesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  
  // Updated challenges data to include beginner level course challenges
  const challenges: Challenge[] = [
    {
      id: "info-extraction-challenge",
      title: "Information Extraction Challenge",
      description: "Extract structured information from a product description",
      difficulty: "basic",
      instructions: "Create a prompt that extracts specific product details from a product description and formats them in a structured way for database entry.",
      hints: ["Request a specific output format like JSON", "Be clear about exactly which fields need to be extracted"],
      evaluation: "The prompt should clearly specify what information to extract and the desired structured output format."
    },
    {
      id: "instructional-content-challenge",
      title: "Beginner Cooking Instructions",
      description: "Create clear instructions for a complete cooking novice",
      difficulty: "basic",
      instructions: "Create a prompt that generates beginner-friendly cooking instructions for making spaghetti with tomato sauce from scratch, including ingredients, tools, steps, and common mistakes.",
      hints: ["Specify the audience's very limited cooking experience", "Ask for visual cues for doneness"],
      evaluation: "The prompt should emphasize clarity and detail appropriate for someone with no cooking experience."
    },
    {
      id: "creative-writing-challenge",
      title: "Character Development",
      description: "Get AI help developing a fictional character",
      difficulty: "basic",
      instructions: "Create a prompt that helps develop a retired detective character for a short story set in a coastal town, including background, traits, motivation, and approach to solving mysteries.",
      hints: ["Request narrative format rather than bullet points", "Balance specific requirements with room for creativity"],
      evaluation: "The prompt should guide the AI to provide creative inspiration while allowing flexibility for your own ideas."
    },
    {
      id: "extraction-challenge",
      title: "Data Extraction Challenge",
      description: "Extract structured information from unstructured text",
      difficulty: "basic",
      instructions: "Write a prompt that extracts names, dates, and locations from the provided text and returns them in a structured format.",
      hints: ["Consider asking for specific output format"],
      evaluation: "The prompt should clearly specify what entities to extract and the desired output format."
    },
    {
      id: "chain-of-thought-challenge",
      title: "Math Problem Solver",
      description: "Guide the AI through multi-step reasoning",
      difficulty: "intermediate",
      instructions: "Write a prompt that guides the AI to solve complex math problems step by step, showing its work.",
      hints: ["Use chain-of-thought techniques"],
      evaluation: "The prompt should elicit clear step-by-step reasoning and prevent computational errors."
    },
    {
      id: "structured-output-challenge",
      title: "Recipe Formatter",
      description: "Create structured, parseable recipe outputs",
      difficulty: "intermediate",
      instructions: "Write a prompt that converts recipe text into a structured format with consistent ingredients and steps sections.",
      hints: ["Specify the exact JSON structure you want"],
      evaluation: "The prompt should produce consistently formatted recipes that could be parsed programmatically."
    },
    {
      id: "advanced-system-challenge",
      title: "Multi-Agent Discussion",
      description: "Simulate a conversation between multiple AI personas",
      difficulty: "advanced",
      instructions: "Create a prompt that simulates a detailed discussion between three experts with different perspectives on a complex topic.",
      hints: ["Define clear personas and viewpoints"],
      evaluation: "The prompt should create a natural dialogue with distinct viewpoints while maintaining coherence."
    },
    {
      id: "few-shot-challenge",
      title: "Code Refactoring Assistant",
      description: "Guide the AI to refactor code following best practices",
      difficulty: "advanced",
      instructions: "Create a prompt that helps refactor poor quality code examples into clean, efficient code following best practices.",
      hints: ["Provide examples of before and after refactoring"],
      evaluation: "The prompt should produce consistently improved code that follows specified patterns and practices."
    }
  ];

  // Filter challenges based on search and tab
  const filteredChallenges = challenges.filter(challenge => {
    // Filter by search query
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by difficulty
    const matchesDifficulty = 
      activeTab === 'all' || 
      challenge.difficulty === activeTab;
    
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Challenges</h1>
        <p className="text-muted-foreground mt-2">
          Test your prompt engineering skills with practical challenges
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs 
          defaultValue="all" 
          className="w-full sm:w-auto"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Challenge cards */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium">No challenges found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setActiveTab('all');
            }}
            className="mt-4"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
