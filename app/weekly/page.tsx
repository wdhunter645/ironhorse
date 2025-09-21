import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Photo Matchup - Lou Gehrig Fan Club",
  description: "Weekly photo matchup featuring Lou Gehrig memorabilia and history.",
};

export default function WeeklyPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Weekly Photo Matchup</h1>
        <p className="mt-4 text-lg text-slate-600">
          Test your knowledge of Lou Gehrig memorabilia and baseball history.
        </p>
      </header>
      
      <section className="space-y-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">This Week&apos;s Challenge</h2>
          <p className="text-slate-600">
            Each week we feature a new photo challenge related to Lou Gehrig&apos;s career, 
            memorabilia, or baseball history. Check back weekly for new content.
          </p>
        </div>
      </section>
    </div>
  );
}