import { DashboardStats } from "@/components/DashboardStats";
import { LiveCallMonitor } from "@/components/LiveCallMonitor";
import { LiveCallTranscript } from "@/components/LiveCallTranscript";
import { RecentCalls } from "@/components/RecentCalls";
import { CallScheduling } from "@/components/CallScheduling";
import { LeadsManagement } from "@/components/LeadsManagement";
import { AnalyticsChart } from "@/components/AnalyticsChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your AI caller performance and activity
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <LiveCallMonitor />
          <LiveCallTranscript />
        </div>
        <div className="space-y-6">
          <RecentCalls />
          <CallScheduling />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LeadsManagement />
        <AnalyticsChart />
      </div>
    </div>
  );
}
