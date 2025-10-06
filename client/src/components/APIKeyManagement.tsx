import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface APIKey {
  id: string;
  name: string;
  placeholder: string;
  value: string;
}

export function APIKeyManagement() {
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  //todo: remove mock functionality
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    { id: "twilio", name: "Twilio API Key", placeholder: "Enter your Twilio API key", value: "" },
    { id: "openai", name: "OpenAI API Key", placeholder: "sk-...", value: "" },
    { id: "elevenlabs", name: "ElevenLabs API Key", placeholder: "Enter your ElevenLabs key", value: "" },
    { id: "zoho", name: "Zoho CRM API Key", placeholder: "Enter your Zoho CRM key", value: "" },
  ]);

  const toggleVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (key: APIKey) => {
    if (key.value) {
      await navigator.clipboard.writeText(key.value);
      setCopiedKey(key.id);
      toast({
        title: "Copied!",
        description: `${key.name} copied to clipboard`,
      });
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleSave = () => {
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been securely stored.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key Management</CardTitle>
        <CardDescription>
          Manage your integration API keys for Twilio, OpenAI, ElevenLabs, and Zoho CRM
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {apiKeys.map((key) => (
            <div key={key.id} className="space-y-2">
              <Label htmlFor={key.id}>{key.name}</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id={key.id}
                    type={showKeys[key.id] ? "text" : "password"}
                    placeholder={key.placeholder}
                    value={key.value}
                    onChange={(e) => {
                      setApiKeys((prev) =>
                        prev.map((k) =>
                          k.id === key.id ? { ...k, value: e.target.value } : k
                        )
                      );
                    }}
                    className="font-mono pr-10"
                    data-testid={`input-api-${key.id}`}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleVisibility(key.id)}
                  data-testid={`button-toggle-${key.id}`}
                >
                  {showKeys[key.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(key)}
                  disabled={!key.value}
                  data-testid={`button-copy-${key.id}`}
                >
                  {copiedKey === key.id ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={handleSave} className="w-full" data-testid="button-save-keys">
            Save API Keys
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
