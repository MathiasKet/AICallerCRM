import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Phone, Mail, Building2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "lead" | "customer" | "prospect";
  lastContact: string;
  totalCalls: number;
}

export default function CRMContacts() {
  //todo: remove mock functionality
  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      company: "Tech Corp",
      status: "customer",
      lastContact: "2025-01-06",
      totalCalls: 5,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@business.com",
      phone: "+1 (555) 987-6543",
      company: "Business Solutions",
      status: "prospect",
      lastContact: "2025-01-06",
      totalCalls: 2,
    },
    {
      id: "3",
      name: "Mike Williams",
      email: "mike.w@startup.io",
      phone: "+1 (555) 456-7890",
      company: "Startup Inc",
      status: "lead",
      lastContact: "2025-01-05",
      totalCalls: 1,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@corp.com",
      phone: "+1 (555) 234-5678",
      company: "Enterprise Corp",
      status: "customer",
      lastContact: "2025-01-04",
      totalCalls: 8,
    },
  ];

  const getStatusBadge = (status: Contact["status"]) => {
    const variants = {
      customer: { className: "bg-success/20 text-success border-success/30" },
      prospect: { className: "bg-info/20 text-info border-info/30" },
      lead: { className: "bg-warning/20 text-warning border-warning/30" },
    };

    return (
      <Badge {...variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">CRM Contacts</h1>
        <p className="text-muted-foreground mt-1">
          Manage and view contacts synced from Zoho CRM
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contacts</CardTitle>
          <CardDescription>
            {contacts.length} contacts synced from Zoho CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Total Calls</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id} className="hover-elevate" data-testid={`row-contact-${contact.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(contact.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{contact.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        {contact.company}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground font-mono">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(contact.status)}</TableCell>
                    <TableCell>{contact.lastContact}</TableCell>
                    <TableCell>{contact.totalCalls}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        data-testid={`button-call-contact-${contact.id}`}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
