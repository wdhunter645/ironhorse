import Link from 'next/link';

export default function Programs() {
  return (
    <div className='space-y-8'>
      <header className='text-center py-12 bg-gradient-to-r from-teal-900 to-teal-700 text-white rounded-lg'>
        <h1 className='text-5xl font-bold mb-4'>Programs & Publications</h1>
        <p className='text-xl mb-2'>Game Programs, Magazines, and Historical Documents</p>
        <p className='text-lg opacity-90'>Coming Soon - Publications archive</p>
      </header>

      <nav className='text-sm text-gray-600'>
        <Link href='/' className='hover:text-blue-600'>Home</Link>
        <span className='mx-2'>›</span>
        <Link href='/collectibles' className='hover:text-blue-600'>Collectibles</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold'>Programs & Publications</span>
      </nav>

      <section className='bg-teal-50 border-l-4 border-teal-400 p-6 rounded-r-lg text-center'>
        <h2 className='text-2xl font-bold text-teal-800 mb-3'>Collection Coming Soon</h2>
        <p className='text-gray-700 mb-4'>
          We are currently cataloging programs, magazines, newspapers, and books 
          featuring Lou Gehrig throughout his career.
        </p>
        <Link href='/collectibles' className='bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors'>
          Browse Other Collections
        </Link>
      </section>
    </div>
  );
}