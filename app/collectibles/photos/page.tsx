import Link from 'next/link';

export default function Photos() {
  return (
    <div className='space-y-8'>
      <header className='text-center py-12 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white rounded-lg'>
        <h1 className='text-5xl font-bold mb-4'>Lou Gehrig Photographs</h1>
        <p className='text-xl mb-2'>Historic Images from Baseball&apos;s Golden Age</p>
        <p className='text-lg opacity-90'>Coming Soon - Comprehensive photo archive</p>
      </header>

      <nav className='text-sm text-gray-600'>
        <Link href='/' className='hover:text-blue-600'>Home</Link>
        <span className='mx-2'>›</span>
        <Link href='/collectibles' className='hover:text-blue-600'>Collectibles</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold'>Photographs</span>
      </nav>

      <section className='bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg text-center'>
        <h2 className='text-2xl font-bold text-indigo-800 mb-3'>Collection Coming Soon</h2>
        <p className='text-gray-700 mb-4'>
          We are currently organizing Lou Gehrig photograph collections including action shots, 
          team photos, farewell speech images, and personal moments.
        </p>
        <Link href='/collectibles' className='bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors'>
          Browse Other Collections
        </Link>
      </section>
    </div>
  );
}