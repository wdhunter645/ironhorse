import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Q&A - Lou Gehrig Fan Club",
  description: "Questions and answers about Lou Gehrig and ALS research.",
};

export default function QnaPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Q&A</h1>
        <p className="mt-4 text-lg text-slate-600">
          Questions and answers about Lou Gehrig, ALS, and our fan club.
        </p>
      </header>
      
      <section className="prose max-w-none">
        <div className="bg-slate-50 rounded-lg p-6">
          <p className="text-slate-600">
            This section will feature frequently asked questions about Lou Gehrig, 
            ALS research, and fan club membership. Check back soon for updates.
          </p>
        </div>
      </section>
    </div>
  );
}