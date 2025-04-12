
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Message } from '@/types';
import { ChevronRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  title?: string;
  description?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  suggestions?: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  title = "Practice Lab",
  description = "Practice your prompt engineering skills with our AI assistant.",
  initialMessages = [],
  onSendMessage,
  suggestions = [
    "How do I write a clear prompt?",
    "What is chain-of-thought prompting?",
    "Show me an example of few-shot learning"
  ]
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Send to parent or handle locally
    if (onSendMessage) {
      onSendMessage(input);
    } else {
      // Mock AI response after delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "This is a placeholder response. In a real implementation, this would be a response from the AI based on your prompt.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg">
      {/* Chat header */}
      <div className="border-b p-4">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Lightbulb size={48} className="mb-4 opacity-50" />
            <p className="mb-2">No messages yet. Start a conversation!</p>
            <p className="text-sm">Try one of the suggestions below to get started.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "message",
                message.role === 'user' ? "message-user" : "message-ai"
              )}
            >
              <div className="markdown-content">{message.content}</div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message message-ai">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-150"></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions && suggestions.length > 0 && messages.length === 0 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t p-4 flex flex-col gap-2">
        <Textarea
          placeholder="Type your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none min-h-[100px]"
        />
        <Button 
          type="submit" 
          className="self-end" 
          disabled={input.trim() === '' || isLoading}
        >
          Send <ChevronRight size={16} className="ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
