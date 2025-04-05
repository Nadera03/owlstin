
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
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
    
    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const responses = [
        "I can help you identify skills that are in high demand in your industry.",
        "Have you considered updating your resume with the latest skills we analyzed?",
        "Based on your profile, you might want to focus on developing these technical skills.",
        "The job market is changing rapidly. Let me help you stay ahead of the curve.",
        "I notice you're interested in career advancement. Have you looked at our skill development recommendations?",
        "Your current skills are valuable, but adding expertise in emerging technologies could open new opportunities."
      ];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
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
            
            <DrawerFooter className="p-0 pt-4">
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
                  disabled={!inputValue.trim() || isLoading}
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
