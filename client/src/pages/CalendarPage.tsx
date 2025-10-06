import { CallCalendar } from "@/components/CallCalendar";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Call Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Schedule and manage AI-assisted outbound calls
        </p>
      </div>

      <CallCalendar />
    </div>
  );
}
