import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Milestones - Lou Gehrig Fan Club",
  description: "Important milestones in Lou Gehrig's career and ALS research.",
};

export default function MilestonesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Milestones</h1>
        <p className="mt-4 text-lg text-slate-600">
          Important dates and achievements in Lou Gehrig&apos;s legacy and ALS research.
        </p>
      </header>
      
      <section className="space-y-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Career Highlights</h2>
          <p className="text-slate-600">
            This timeline will showcase Lou Gehrig&apos;s baseball career milestones, 
            ALS research breakthroughs, and fan club achievements.
          </p>
        </div>
      </section>
    </div>
  );
}