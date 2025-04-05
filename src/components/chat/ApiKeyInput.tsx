
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ApiKeyInputProps = {
  apiKey: string;
  setApiKey: (key: string) => void;
};

export default function ApiKeyInput({ apiKey, setApiKey }: ApiKeyInputProps) {
  return (
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
  );
}
