import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charities - Lou Gehrig Fan Club",
  description: "ALS research charities and organizations we support.",
};

export default function CharitiesPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Charities</h1>
        <p className="mt-4 text-lg text-slate-600">
          Supporting ALS research through charitable organizations and initiatives.
        </p>
      </header>
      
      <section className="space-y-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Supported Organizations</h2>
          <p className="text-slate-600">
            Learn about the ALS research organizations and charities that our 
            fan club supports in honor of Lou Gehrig&apos;s legacy.
          </p>
        </div>
      </section>
    </div>
  );
}