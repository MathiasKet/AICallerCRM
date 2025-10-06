import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SyncStatus {
  id: string;
  service: string;
  lastSync: string;
  status: "success" | "failed" | "syncing";
  recordsSynced: number;
}

export default function DataSync() {
  const { toast } = useToast();

  //todo: remove mock functionality
  const syncStatuses: SyncStatus[] = [
    {
      id: "1",
      service: "Zoho CRM - Contacts",
      lastSync: "2025-01-06 15:30",
      status: "success",
      recordsSynced: 247,
    },
    {
      id: "2",
      service: "Zoho CRM - Leads",
      lastSync: "2025-01-06 15:30",
      status: "success",
      recordsSynced: 89,
    },
    {
      id: "3",
      service: "Call Transcripts",
      lastSync: "2025-01-06 15:45",
      status: "success",
      recordsSynced: 1247,
    },
    {
      id: "4",
      service: "Analytics Data",
      lastSync: "2025-01-06 14:20",
      status: "syncing",
      recordsSynced: 0,
    },
  ];

  const getStatusIcon = (status: SyncStatus["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "syncing":
        return <RefreshCw className="h-5 w-5 text-primary animate-spin" />;
    }
  };

  const getStatusBadge = (status: SyncStatus["status"]) => {
    const variants = {
      success: { className: "bg-success/20 text-success border-success/30" },
      failed: { className: "bg-destructive/20 text-destructive border-destructive/30" },
      syncing: { className: "bg-primary/20 text-primary border-primary/30" },
    };

    return (
      <Badge {...variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleSync = (service: string) => {
    console.log("Sync triggered for:", service);
    toast({
      title: "Sync Started",
      description: `Syncing ${service}...`,
    });
  };

  const handleSyncAll = () => {
    console.log("Sync all triggered");
    toast({
      title: "Syncing All Services",
      description: "All data sources are being synchronized...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Sync</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage CRM data synchronization
          </p>
        </div>
        <Button onClick={handleSyncAll} data-testid="button-sync-all">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync All
        </Button>
      </div>

      <div className="grid gap-4">
        {syncStatuses.map((sync) => (
          <Card key={sync.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {getStatusIcon(sync.status)}
                  <div>
                    <CardTitle className="text-lg">{sync.service}</CardTitle>
                    <CardDescription className="mt-1">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Last synced: {sync.lastSync}
                      </div>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(sync.status)}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSync(sync.service)}
                    disabled={sync.status === "syncing"}
                    data-testid={`button-sync-${sync.id}`}
                  >
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Sync
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Records Synced:</span>
                  <span className="ml-2 font-semibold">{sync.recordsSynced.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sync Settings</CardTitle>
          <CardDescription>Configure automatic sync preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-sync Interval</div>
                <div className="text-sm text-muted-foreground">
                  Automatically sync data every 15 minutes
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Real-time Sync</div>
                <div className="text-sm text-muted-foreground">
                  Sync calls immediately after completion
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
