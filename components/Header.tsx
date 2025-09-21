'use client';
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Optional logo in /public/logo.svg */}
          <div className="hidden sm:block">
            <Image src="/logo.svg" alt="LGFC" width={32} height={32} priority onError={() => {}}/>
          </div>
          <Link href="/" className="font-semibold tracking-tight">Lou Gehrig Fan Club</Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/member" className="hover:text-blue-600">Join</Link>
          <Link href="/charities" className="hover:text-blue-600">Charities</Link>
          <Link href="/milestones" className="hover:text-blue-600">Milestones</Link>
          <Link href="/news" className="hover:text-blue-600">News</Link>
          <Link href="/qna" className="hover:text-blue-600">Q&A</Link>
          <Link href="/calendar" className="hover:text-blue-600">Calendar</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
        </nav>
      </div>
    </header>
  );
}
