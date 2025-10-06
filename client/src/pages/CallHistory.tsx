import { CallHistoryTable } from "@/components/CallHistoryTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CallHistory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Call History</h1>
        <p className="text-muted-foreground mt-1">
          View all past calls with full transcripts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>
            Complete call history with status and transcripts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CallHistoryTable />
        </CardContent>
      </Card>
    </div>
  );
}
