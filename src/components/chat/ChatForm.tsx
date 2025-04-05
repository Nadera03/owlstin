
import { useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { DrawerFooter } from "@/components/ui/drawer";

type ChatFormProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  apiKey: string;
  inputRef: RefObject<HTMLInputElement>;
};

export default function ChatForm({ 
  inputValue, 
  setInputValue, 
  handleSubmit,
  isLoading,
  apiKey,
  inputRef
}: ChatFormProps) {
  return (
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
  );
}
