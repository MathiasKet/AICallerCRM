import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Call {
  id: string;
  contactName: string;
  phoneNumber: string;
  dateTime: string;
  duration: string;
  status: "completed" | "failed" | "missed";
  transcript: string;
}

export function CallHistoryTable() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  //todo: remove mock functionality
  const calls: Call[] = [
    {
      id: "1",
      contactName: "John Smith",
      phoneNumber: "+1 (555) 123-4567",
      dateTime: "2025-01-06 14:32",
      duration: "5:24",
      status: "completed",
      transcript: "Agent: Hello, this is your AI assistant calling. How can I help you today?\n\nCustomer: Hi, I'm interested in learning more about your services.\n\nAgent: I'd be happy to help! We offer comprehensive CRM solutions with AI-powered calling capabilities. What specific features are you looking for?\n\nCustomer: I need something that can handle outbound sales calls automatically.\n\nAgent: Perfect! Our system can schedule and execute AI-assisted outbound calls, track all interactions, and automatically log them in your CRM. Would you like to schedule a demo?",
    },
    {
      id: "2",
      contactName: "Sarah Johnson",
      phoneNumber: "+1 (555) 987-6543",
      dateTime: "2025-01-06 13:15",
      duration: "3:42",
      status: "completed",
      transcript: "Agent: Good afternoon! This is a follow-up call regarding your recent inquiry.\n\nCustomer: Yes, thank you for calling back.\n\nAgent: I wanted to discuss the pricing options we have available. Based on your requirements, I recommend our Enterprise plan.\n\nCustomer: That sounds good. Can you send me the details?",
    },
    {
      id: "3",
      contactName: "Mike Williams",
      phoneNumber: "+1 (555) 456-7890",
      dateTime: "2025-01-06 11:48",
      duration: "2:15",
      status: "failed",
      transcript: "Agent: Hello, is this Mike Williams?\n\n[Call disconnected - technical error]",
    },
    {
      id: "4",
      contactName: "Emily Davis",
      phoneNumber: "+1 (555) 234-5678",
      dateTime: "2025-01-06 10:22",
      duration: "0:00",
      status: "missed",
      transcript: "[No answer - voicemail detected]",
    },
  ];

  const getStatusBadge = (status: Call["status"]) => {
    const variants = {
      completed: { variant: "default" as const, className: "bg-success/20 text-success border-success/30" },
      failed: { variant: "default" as const, className: "bg-destructive/20 text-destructive border-destructive/30" },
      missed: { variant: "default" as const, className: "bg-warning/20 text-warning border-warning/30" },
    };

    return (
      <Badge {...variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id} className="hover-elevate" data-testid={`row-call-${call.id}`}>
                <TableCell className="font-medium">{call.contactName}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {call.phoneNumber}
                </TableCell>
                <TableCell>{call.dateTime}</TableCell>
                <TableCell>{call.duration}</TableCell>
                <TableCell>{getStatusBadge(call.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedCall(call)}
                      data-testid={`button-view-transcript-${call.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      data-testid={`button-call-${call.id}`}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedCall} onOpenChange={() => setSelectedCall(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Call Transcript</DialogTitle>
            <DialogDescription>
              {selectedCall?.contactName} • {selectedCall?.dateTime} • {selectedCall?.duration}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="whitespace-pre-wrap font-mono text-sm">
              {selectedCall?.transcript}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
