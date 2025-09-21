import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const links = [
    { href: "/weekly", title: "Weekly Photo Matchup" },
    { href: "/member", title: "Fan Club Card + Join/Login" },
    { href: "/charities", title: "Charities" },
    { href: "/milestones", title: "Milestones" },
    { href: "/news", title: "News" },
    { href: "/qna", title: "Q&A" },
    { href: "/calendar", title: "Unified Calendar" },
  ];

  return (
    <div className="space-y-16">
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="px-6 py-20 sm:px-12 lg:px-16 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Lou Gehrig Fan Club</h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Explore matchups, member cards, milestones and more.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/member" className="rounded-xl bg-white px-5 py-3 text-blue-700 font-medium shadow hover:shadow-lg">
              Join
            </Link>
            <Link href="/admin" className="rounded-xl ring-1 ring-inset ring-white/50 px-5 py-3 text-white hover:bg-white/10">
              Admin
            </Link>
          </div>
        </div>
        {/* Optional hero image: place a file at /public/hero.jpg to display it */}
        <div className="absolute right-0 top-0 hidden md:block">
          <Image
            src="/hero.jpg"
            alt=""
            width={640}
            height={400}
            className="rounded-l-3xl"
            priority
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6">Site sections</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map(x => (
            <li key={x.href} className="rounded-2xl border p-6 hover:shadow">
              <Link href={x.href} className="font-medium hover:text-blue-600">
                {x.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
