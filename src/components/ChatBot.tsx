
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Send, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when drawer opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

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
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Make API call to OpenAI
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system", 
              content: "You are Owlstin AI, a career advisor assistant specialized in helping users advance their careers, identify skill gaps, and provide advice about the job market. Be helpful, concise, and provide actionable advice."
            },
            ...messages.map(msg => ({ 
              role: msg.role, 
              content: msg.content 
            })),
            { role: "user", content: userMessage.content }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", response.status, errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }
      
      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;
      
      // Add assistant response
      const assistantMessage: Message = {
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
      const errorMessage: Message = {
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full shadow-lg bg-magical-glowing-teal hover:bg-magical-glowing-teal/90"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh] sm:max-w-[425px] mx-auto rounded-t-xl overflow-hidden">
          <DrawerHeader className="flex justify-between items-center border-b pb-2">
            <DrawerTitle className="font-cinzel text-xl">Owlstin AI Assistant</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X size={18} />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </DrawerHeader>
          
          <div className="flex flex-col h-full p-4">
            <ScrollArea className="flex-1 pr-4">
              <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex flex-col max-w-[80%] rounded-lg p-4",
                      message.role === "user" 
                        ? "ml-auto bg-magical-glowing-teal/10 text-right" 
                        : "mr-auto bg-magical-midnight/10"
                    )}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                {isLoading && (
                  <div className="mr-auto bg-magical-midnight/10 rounded-lg p-4 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-magical-glowing-teal rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-magical-glowing-teal rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-magical-glowing-teal rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <div className="pb-2 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">OpenAI API Key</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setApiKey("")}
                  disabled={!apiKey}
                >
                  Clear Key
                </Button>
              </div>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key"
                className="mb-4 font-mono text-xs"
              />
            </div>
            
            <DrawerFooter className="p-0">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!inputValue.trim() || isLoading || !apiKey}
                >
                  <Send size={18} />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
