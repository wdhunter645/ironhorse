import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar - Lou Gehrig Fan Club",
  description: "Unified calendar of events, commemorations, and activities.",
};

export default function CalendarPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="mt-4 text-lg text-slate-600">
          Upcoming events, commemorations, and fan club activities.
        </p>
      </header>
      
      <section className="space-y-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Upcoming Events</h2>
          <p className="text-slate-600">
            Stay informed about Lou Gehrig commemorative events, ALS awareness days, 
            and fan club gatherings throughout the year.
          </p>
        </div>
      </section>
    </div>
  );
}