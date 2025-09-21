import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - Lou Gehrig Fan Club",
  description: "Latest news about Lou Gehrig research and fan club activities.",
};

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">News</h1>
        <p className="mt-4 text-lg text-slate-600">
          Stay updated with the latest ALS research news and fan club activities.
        </p>
      </header>
      
      <section className="space-y-6">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Recent Updates</h2>
          <p className="text-slate-600">
            News articles and updates about ALS research, Lou Gehrig commemorations, 
            and fan club events will be posted here.
          </p>
        </div>
      </section>
    </div>
  );
}