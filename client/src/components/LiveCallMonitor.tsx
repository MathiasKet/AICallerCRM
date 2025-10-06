import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone } from "lucide-react";

interface LiveCall {
  id: string;
  contactName: string;
  phoneNumber: string;
  startTime: string;
  currentTranscript: string[];
}

export function LiveCallMonitor() {
  //todo: remove mock functionality
  const liveCall: LiveCall = {
    id: "live-1",
    contactName: "Robert Chen",
    phoneNumber: "+1 (555) 789-0123",
    startTime: "14:45",
    currentTranscript: [
      "[14:45:12] Agent: Hello, this is your AI assistant. Am I speaking with Robert Chen?",
      "[14:45:18] Customer: Yes, this is Robert.",
      "[14:45:22] Agent: Great! I'm calling to follow up on your inquiry about our enterprise solutions.",
      "[14:45:30] Customer: Oh yes, I was interested in the pricing.",
      "[14:45:35] Agent: I'd be happy to discuss that with you. Based on your team size...",
    ],
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Live Call Monitor</CardTitle>
            <CardDescription>Real-time transcript updates</CardDescription>
          </div>
          <Badge className="bg-success/20 text-success border-success/30">
            <span className="inline-block w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card-foreground/5">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold">{liveCall.contactName}</div>
              <div className="text-sm text-muted-foreground font-mono">
                {liveCall.phoneNumber}
              </div>
            </div>
            <div className="ml-auto text-sm text-muted-foreground">
              Started {liveCall.startTime}
            </div>
          </div>

          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="space-y-2">
              {liveCall.currentTranscript.map((line, index) => {
                const isAgent = line.includes("Agent:");
                return (
                  <div
                    key={index}
                    className={`text-sm ${isAgent ? "text-primary" : "text-foreground"}`}
                  >
                    {line}
                  </div>
                );
              })}
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse animation-delay-200" />
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse animation-delay-400" />
              </div>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
