import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { X, MessageCircle } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import ChatMessages from "@/components/chat/ChatMessages";
import ApiKeyInput from "@/components/chat/ApiKeyInput";
import ChatForm from "@/components/chat/ChatForm";
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    apiKey,
    setApiKey,
    handleSubmit
  } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when drawer opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);
  return <div className="fixed bottom-6 right-6 z-50">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          
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
            <ChatMessages messages={messages} isLoading={isLoading} />
            
            <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
            
            <ChatForm inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} isLoading={isLoading} apiKey={apiKey} inputRef={inputRef} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>;
}