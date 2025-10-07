import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface TranscriptLine {
  timestamp: string;
  speaker: "Agent" | "Customer";
  text: string;
}

export function LiveCallTranscript() {
  //todo: remove mock functionality
  const transcript: TranscriptLine[] = [
    {
      timestamp: "14:45:12",
      speaker: "Agent",
      text: "Hello, this is your AI assistant. Am I speaking with Robert Chen?",
    },
    {
      timestamp: "14:45:18",
      speaker: "Customer",
      text: "Yes, this is Robert.",
    },
    {
      timestamp: "14:45:22",
      speaker: "Agent",
      text: "Great! I'm calling to follow up on your inquiry about our enterprise solutions.",
    },
    {
      timestamp: "14:45:30",
      speaker: "Customer",
      text: "Oh yes, I was interested in the pricing.",
    },
    {
      timestamp: "14:45:35",
      speaker: "Agent",
      text: "I'd be happy to discuss that with you. Based on your team size, I recommend our Enterprise plan which includes...",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Live Transcript</CardTitle>
            <CardDescription>Real-time conversation</CardDescription>
          </div>
          <Badge className="bg-success/20 text-success border-success/30">
            <span className="inline-block w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-3">
            {transcript.map((line, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  line.speaker === "Agent" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    line.speaker === "Agent"
                      ? "bg-primary/10 text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {line.speaker} • {line.timestamp}
                  </div>
                  <div className="text-sm">{line.text}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
