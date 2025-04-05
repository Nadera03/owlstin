
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { callOpenAI } from "@/utils/openai";

export type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm Owlstin AI. How can I help you with your career today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>(
    localStorage.getItem("openai_api_key") || ""
  );
  const { toast } = useToast();

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("openai_api_key", apiKey);
    }
  }, [apiKey]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key in the settings",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Prepare messages for OpenAI API
      const apiMessages = [
        {
          role: "system" as const, 
          content: "You are Owlstin AI, a career advisor assistant specialized in helping users advance their careers, identify skill gaps, and provide advice about the job market. Be helpful, concise, and provide actionable advice."
        },
        ...messages.map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        })),
        { role: "user" as const, content: userMessage.content }
      ];
      
      const assistantResponse = await callOpenAI(apiMessages, apiKey);
      
      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        content: assistantResponse,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get a response from the AI. Please check your API key and try again.",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error. Please check your API key is valid or try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    apiKey,
    setApiKey,
    handleSubmit
  };
}
