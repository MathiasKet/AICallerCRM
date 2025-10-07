import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Clock } from "lucide-react";

interface RecentCall {
  id: string;
  contactName: string;
  time: string;
  duration: string;
  status: "completed" | "failed" | "missed";
}

export function RecentCalls() {
  //todo: remove mock functionality
  const recentCalls: RecentCall[] = [
    {
      id: "1",
      contactName: "John Smith",
      time: "2 min ago",
      duration: "5:24",
      status: "completed",
    },
    {
      id: "2",
      contactName: "Sarah Johnson",
      time: "15 min ago",
      duration: "3:42",
      status: "completed",
    },
    {
      id: "3",
      contactName: "Mike Williams",
      time: "1 hour ago",
      duration: "2:15",
      status: "failed",
    },
    {
      id: "4",
      contactName: "Emily Davis",
      time: "2 hours ago",
      duration: "0:00",
      status: "missed",
    },
  ];

  const getStatusColor = (status: RecentCall["status"]) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "failed":
        return "text-destructive";
      case "missed":
        return "text-warning";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
        <CardDescription>Latest call activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentCalls.map((call) => (
            <div
              key={call.id}
              className="flex items-center justify-between p-3 rounded-lg border hover-elevate"
              data-testid={`recent-call-${call.id}`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${getStatusColor(call.status).replace('text-', 'bg-')}`} />
                <div>
                  <div className="font-medium text-sm">{call.contactName}</div>
                  <div className="text-xs text-muted-foreground">{call.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {call.duration}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
