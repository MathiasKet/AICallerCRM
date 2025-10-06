import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Phone, Clock, TrendingUp, DollarSign } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1 text-xs">
          {isPositive ? (
            <ArrowUp className="h-3 w-3 text-success" />
          ) : (
            <ArrowDown className="h-3 w-3 text-destructive" />
          )}
          <span className={isPositive ? "text-success" : "text-destructive"}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  //todo: remove mock functionality
  const stats = [
    {
      title: "Total Calls",
      value: "1,247",
      change: 12.5,
      icon: <Phone className="h-4 w-4" />,
    },
    {
      title: "Avg Duration",
      value: "4:32",
      change: -3.2,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: 5.4,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Revenue",
      value: "$12,450",
      change: 18.7,
      icon: <DollarSign className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
