'use client';
import { usePathname } from 'next/navigation';

export default function VintageBackground({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCollectiblesPage = pathname?.startsWith('/collectibles');

  return (
    <div className={isCollectiblesPage ? 'vintage-linen-bg vintage-paper-texture min-h-screen' : 'bg-gray-50 min-h-screen'}>
      {children}
    </div>
  );
}