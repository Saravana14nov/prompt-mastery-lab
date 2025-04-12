
import React from 'react';
import { Card } from "@/components/ui/card";
import ChatInterface from '@/components/practice/ChatInterface';

const PracticePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Practice Lab</h1>
        <p className="text-muted-foreground mt-2">
          Practice your prompt engineering skills with our AI assistant
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[700px]">
          <ChatInterface 
            suggestions={[
              "How do I structure a prompt for data extraction?",
              "What is chain-of-thought prompting?",
              "Can you explain few-shot learning with examples?"
            ]}
          />
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Tips for Effective Practice</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-semibold">1.</span>
                <span>Start with clear objectives for what you want to achieve</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">2.</span>
                <span>Experiment with different prompt structures and formats</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">3.</span>
                <span>Try incorporating techniques you've learned in the lessons</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">4.</span>
                <span>Iterate on your prompts to improve results</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">5.</span>
                <span>Ask the AI to explain why certain prompts work better than others</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Prompt Templates</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">Basic Instruction</h4>
                <p className="bg-secondary p-2 rounded text-xs font-mono">
                  [Instruction]
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Role-based</h4>
                <p className="bg-secondary p-2 rounded text-xs font-mono">
                  Act as a [role]. [Instruction]
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Few-shot Learning</h4>
                <p className="bg-secondary p-2 rounded text-xs font-mono">
                  Example 1: [Input] → [Output]<br />
                  Example 2: [Input] → [Output]<br />
                  New input: [Input] →
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Format Control</h4>
                <p className="bg-secondary p-2 rounded text-xs font-mono">
                  [Instruction]<br />
                  Format your answer as [format]
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;
