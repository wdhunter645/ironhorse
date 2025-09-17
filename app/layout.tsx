import Link from 'next/link';
import './globals.css';
import VintageBackground from './components/VintageBackground';

export const metadata = {
  title: 'Lou Gehrig Fan Club - The Iron Horse Collection',
  description: 'Discover rare Lou Gehrig memorabilia, collectibles, and join the premier fan club celebrating baseball\'s Iron Horse'
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang='en'>
      <body className='min-h-screen'>
        <VintageBackground>
          <header className='w-full px-4 py-3 bg-white border-b shadow-sm relative z-10'>
            <div className='max-w-6xl mx-auto flex items-center justify-between'>
              <Link href='/' className='font-bold text-xl text-blue-800 hover:text-blue-600'>
                LGFC
                <span className='text-sm font-normal text-gray-600 ml-2'>The Iron Horse</span>
              </Link>
              <nav className='flex gap-6 text-sm'>
                <Link href='/collectibles' className='text-gray-700 hover:text-blue-600 font-medium'>Collectibles</Link>
                <Link href='/member' className='text-gray-700 hover:text-blue-600'>Member Area</Link>
                <Link href='/sitemap' className='text-gray-700 hover:text-blue-600'>Sitemap</Link>
                <Link href='/privacy' className='text-gray-700 hover:text-blue-600'>Privacy</Link>
                <Link href='/terms' className='text-gray-700 hover:text-blue-600'>Terms</Link>
              </nav>
            </div>
          </header>
          <main className='max-w-6xl mx-auto p-4 min-h-screen relative z-10'>
            {children}
          </main>
          <footer className='w-full border-t mt-8 p-6 bg-white relative z-10'>
            <div className='max-w-6xl mx-auto text-center'>
              <p className='text-xs text-gray-600'>
                © 2025 Lou Gehrig Fan Club • A zero‑profit initiative supporting ALS research.
              </p>
              <p className='text-xs text-gray-500 mt-2'>
                &quot;Today I consider myself the luckiest man on the face of the earth.&quot; - Lou Gehrig, July 4, 1939
              </p>
            </div>
          </footer>
        </VintageBackground>
      </body>
    </html>
  );
}