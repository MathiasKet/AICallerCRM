import { DashboardStats } from "@/components/DashboardStats";
import { LiveCallMonitor } from "@/components/LiveCallMonitor";
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

      <div className="grid gap-6 lg:grid-cols-2">
        <LiveCallMonitor />
        <AnalyticsChart />
      </div>
    </div>
  );
}
