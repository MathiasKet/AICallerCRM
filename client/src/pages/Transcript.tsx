import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

interface TranscriptEntry {
  id: string;
  callId: string;
  contactName: string;
  dateTime: string;
  duration: string;
  status: "completed" | "failed";
  fullTranscript: string;
}

export default function Transcript() {
  const [searchQuery, setSearchQuery] = useState("");

  //todo: remove mock functionality
  const transcripts: TranscriptEntry[] = [
    {
      id: "1",
      callId: "CALL-2025-001",
      contactName: "John Smith",
      dateTime: "2025-01-06 14:32",
      duration: "5:24",
      status: "completed",
      fullTranscript: `[14:32:10] Agent: Hello, this is your AI assistant calling. How can I help you today?

[14:32:18] Customer: Hi, I'm interested in learning more about your services.

[14:32:22] Agent: I'd be happy to help! We offer comprehensive CRM solutions with AI-powered calling capabilities. What specific features are you looking for?

[14:32:30] Customer: I need something that can handle outbound sales calls automatically.

[14:32:35] Agent: Perfect! Our system can schedule and execute AI-assisted outbound calls, track all interactions, and automatically log them in your CRM. Would you like to schedule a demo?

[14:32:42] Customer: Yes, that would be great.

[14:32:45] Agent: Excellent! I'll have our team reach out to you within 24 hours to schedule a convenient time. Is there anything else I can help you with today?

[14:32:50] Customer: No, that's all. Thank you!

[14:32:52] Agent: You're welcome! Have a great day.`,
    },
    {
      id: "2",
      callId: "CALL-2025-002",
      contactName: "Sarah Johnson",
      dateTime: "2025-01-06 13:15",
      duration: "3:42",
      status: "completed",
      fullTranscript: `[13:15:05] Agent: Good afternoon! This is a follow-up call regarding your recent inquiry.

[13:15:12] Customer: Yes, thank you for calling back.

[13:15:15] Agent: I wanted to discuss the pricing options we have available. Based on your requirements, I recommend our Enterprise plan which includes unlimited AI calls, advanced analytics, and priority support.

[13:15:30] Customer: What's the monthly cost for that?

[13:15:33] Agent: The Enterprise plan is $499 per month, but we're currently offering a 20% discount for new customers.

[13:15:40] Customer: That sounds good. Can you send me the details?

[13:15:43] Agent: Absolutely! I'll email you the full breakdown and contract within the next hour. Is the email on file still correct?

[13:15:48] Customer: Yes, that works.`,
    },
  ];

  const filteredTranscripts = transcripts.filter(
    (t) =>
      t.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.callId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Call Transcripts</h1>
        <p className="text-muted-foreground mt-1">
          Search and view detailed call transcripts
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by contact name or call ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-transcript"
        />
      </div>

      <div className="space-y-4">
        {filteredTranscripts.map((transcript) => (
          <Card key={transcript.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>{transcript.contactName}</CardTitle>
                  <CardDescription className="mt-1">
                    {transcript.callId} • {transcript.dateTime} • {transcript.duration}
                  </CardDescription>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">
                  {transcript.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/30">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {transcript.fullTranscript}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
