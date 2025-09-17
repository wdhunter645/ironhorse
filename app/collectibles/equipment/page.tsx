import Link from 'next/link';

export default function Equipment() {
  return (
    <div className='space-y-8'>
      <header className='text-center py-12 bg-gradient-to-r from-orange-900 to-orange-700 text-white rounded-lg'>
        <h1 className='text-5xl font-bold mb-4'>Lou Gehrig Game Equipment</h1>
        <p className='text-xl mb-2'>Bats, Gloves, and Uniforms from the Iron Horse Era</p>
        <p className='text-lg opacity-90'>Coming Soon - Game-used equipment showcase</p>
      </header>

      <nav className='text-sm text-gray-600'>
        <Link href='/' className='hover:text-blue-600'>Home</Link>
        <span className='mx-2'>›</span>
        <Link href='/collectibles' className='hover:text-blue-600'>Collectibles</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold'>Game Equipment</span>
      </nav>

      <section className='bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg text-center'>
        <h2 className='text-2xl font-bold text-orange-800 mb-3'>Collection Coming Soon</h2>
        <p className='text-gray-700 mb-4'>
          We are currently cataloging Lou Gehrig game equipment including bats, gloves, 
          uniforms, and other gear from his legendary career.
        </p>
        <Link href='/collectibles' className='bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition-colors'>
          Browse Other Collections
        </Link>
      </section>
    </div>
  );
}