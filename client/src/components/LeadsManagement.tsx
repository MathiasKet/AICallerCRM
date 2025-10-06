import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  status: "hot" | "warm" | "cold";
  lastContact: string;
}

export function LeadsManagement() {
  //todo: remove mock functionality
  const leads: Lead[] = [
    {
      id: "1",
      name: "David Martinez",
      company: "Tech Innovations",
      email: "david.m@techinno.com",
      phone: "+1 (555) 111-2222",
      score: 92,
      status: "hot",
      lastContact: "2 hours ago",
    },
    {
      id: "2",
      name: "Lisa Anderson",
      company: "Global Solutions",
      email: "lisa.a@globalsol.com",
      phone: "+1 (555) 333-4444",
      score: 78,
      status: "warm",
      lastContact: "1 day ago",
    },
    {
      id: "3",
      name: "Robert Taylor",
      company: "Enterprise Systems",
      email: "robert.t@entsys.com",
      phone: "+1 (555) 555-6666",
      score: 45,
      status: "cold",
      lastContact: "5 days ago",
    },
  ];

  const getStatusBadge = (status: Lead["status"]) => {
    const variants = {
      hot: { className: "bg-destructive/20 text-destructive border-destructive/30" },
      warm: { className: "bg-warning/20 text-warning border-warning/30" },
      cold: { className: "bg-info/20 text-info border-info/30" },
    };

    return (
      <Badge {...variants[status]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Leads</CardTitle>
        <CardDescription>High-priority leads requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover-elevate"
              data-testid={`lead-card-${lead.id}`}
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(lead.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold truncate">{lead.name}</h4>
                  {getStatusBadge(lead.status)}
                </div>
                <p className="text-sm text-muted-foreground truncate">{lead.company}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Score: {lead.score}
                  </span>
                  <span>Last contact: {lead.lastContact}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  data-testid={`button-call-lead-${lead.id}`}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  data-testid={`button-email-lead-${lead.id}`}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
