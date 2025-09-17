import Link from 'next/link';

export default function Autographs() {
  return (
    <div className='space-y-8'>
      <header className='text-center py-12 bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-lg'>
        <h1 className='text-5xl font-bold mb-4'>Lou Gehrig Autographs</h1>
        <p className='text-xl mb-2'>Authenticated Signatures from the Iron Horse</p>
        <p className='text-lg opacity-90'>Coming Soon - Comprehensive autograph collection showcase</p>
      </header>

      <nav className='text-sm text-gray-600'>
        <Link href='/' className='hover:text-blue-600'>Home</Link>
        <span className='mx-2'>›</span>
        <Link href='/collectibles' className='hover:text-blue-600'>Collectibles</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold'>Autographs</span>
      </nav>

      <section className='bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg text-center'>
        <h2 className='text-2xl font-bold text-purple-800 mb-3'>Collection Coming Soon</h2>
        <p className='text-gray-700 mb-4'>
          We are currently cataloging Lou Gehrig autograph collections including signed baseballs, 
          photographs, contracts, and personal letters.
        </p>
        <Link href='/collectibles' className='bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors'>
          Browse Other Collections
        </Link>
      </section>
    </div>
  );
}