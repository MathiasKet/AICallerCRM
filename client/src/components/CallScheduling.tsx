import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CallScheduling() {
  const { toast } = useToast();
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSchedule = () => {
    console.log("Schedule call:", { contactName, phoneNumber });
    toast({
      title: "Call Scheduled",
      description: `Call with ${contactName} has been scheduled`,
    });
    setContactName("");
    setPhoneNumber("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Schedule</CardTitle>
        <CardDescription>Schedule a call quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quick-contact">Contact Name</Label>
            <Input
              id="quick-contact"
              placeholder="Enter name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              data-testid="input-quick-contact"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quick-phone">Phone Number</Label>
            <Input
              id="quick-phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              data-testid="input-quick-phone"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="quick-date">Date</Label>
              <Input
                id="quick-date"
                type="date"
                data-testid="input-quick-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quick-time">Time</Label>
              <Input
                id="quick-time"
                type="time"
                data-testid="input-quick-time"
              />
            </div>
          </div>
          <Button 
            className="w-full" 
            onClick={handleSchedule}
            disabled={!contactName || !phoneNumber}
            data-testid="button-quick-schedule"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
