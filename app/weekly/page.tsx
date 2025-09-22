import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Photo Matchup - Lou Gehrig Fan Club",
  description: "Weekly photo matchup featuring Lou Gehrig memorabilia and history.",
};

export default function WeeklyPage() {
  return (
    <div className="prose">
      <h1>Weekly Photo Matchup</h1>
      <p>Test your knowledge of Lou Gehrig memorabilia and baseball history.</p>
      
      <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px', marginTop: '24px' }}>
        <h2>This Week&apos;s Challenge</h2>
        <p>
          Each week we feature a new photo challenge related to Lou Gehrig&apos;s career, 
          memorabilia, or baseball history. Check back weekly for new content.
        </p>
      </div>
    </div>
  );
}