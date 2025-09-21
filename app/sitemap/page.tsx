const links = [
  { label: 'Home', href: '/' },
  { label: 'Member Area', href: '/member' },
  { label: 'Admin Dashboard', href: '/admin' },
  { label: 'Charities', href: '/charities' },
  { label: 'Milestones', href: '/milestones' },
  { label: 'News', href: '/news' },
  { label: 'Q&A', href: '/qna' },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export default function SiteMap() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Sitemap</h1>
      <ul className="list-disc pl-6">
        {links.map(l => (
          <li key={l.href}>
            <a className="text-blue-700 underline" href={l.href}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}