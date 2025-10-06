import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ScheduledCall {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps?: {
    contactName: string;
    phoneNumber: string;
    notes: string;
  };
}

export function CallCalendar() {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  //todo: remove mock functionality
  const [events] = useState<ScheduledCall[]>([
    {
      id: "1",
      title: "Follow-up: John Smith",
      start: "2025-01-07T10:00:00",
      end: "2025-01-07T10:30:00",
      backgroundColor: "hsl(199 89% 48%)",
      borderColor: "hsl(199 89% 48%)",
      extendedProps: {
        contactName: "John Smith",
        phoneNumber: "+1 (555) 123-4567",
        notes: "Discuss pricing options",
      },
    },
    {
      id: "2",
      title: "Demo Call: Sarah Johnson",
      start: "2025-01-08T14:00:00",
      end: "2025-01-08T14:45:00",
      backgroundColor: "hsl(199 89% 48%)",
      borderColor: "hsl(199 89% 48%)",
      extendedProps: {
        contactName: "Sarah Johnson",
        phoneNumber: "+1 (555) 987-6543",
        notes: "Product demonstration",
      },
    },
    {
      id: "3",
      title: "Completed: Mike Williams",
      start: "2025-01-06T11:00:00",
      backgroundColor: "hsl(142 71% 45%)",
      borderColor: "hsl(142 71% 45%)",
      extendedProps: {
        contactName: "Mike Williams",
        phoneNumber: "+1 (555) 456-7890",
        notes: "Initial consultation",
      },
    },
  ]);

  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setShowScheduleDialog(true);
  };

  const handleSchedule = () => {
    console.log("Schedule call triggered for:", selectedDate);
    setShowScheduleDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Call Schedule</CardTitle>
          <CardDescription>
            View and schedule AI-assisted outbound calls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              dateClick={handleDateClick}
              height="auto"
              eventDisplay="block"
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Call</DialogTitle>
            <DialogDescription>
              Schedule an AI-assisted outbound call for{" "}
              {selectedDate?.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Name</Label>
              <Input id="contact-name" placeholder="Enter contact name" data-testid="input-contact-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                data-testid="input-phone-number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="call-time">Call Time</Label>
              <Input id="call-time" type="time" data-testid="input-call-time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes or talking points..."
                data-testid="input-notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule} data-testid="button-schedule-call">
              Schedule Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
