import Link from 'next/link';

export default function Equipment() {
  return (
    <div className='space-y-8'>
      <header className='text-center py-12 bg-gradient-to-r from-vintage-brown to-amber-900 text-vintage-cream rounded-lg shadow-lg border-vintage-gold'>
        <h1 className='text-5xl font-bold mb-4 vintage-heading'>Lou Gehrig Game Equipment</h1>
        <p className='text-xl mb-2 vintage-text text-vintage-cream'>Bats, Gloves, and Uniforms from the Iron Horse Era</p>
        <p className='text-lg opacity-90 vintage-text text-vintage-cream'>Coming Soon - Game-used equipment showcase</p>
      </header>

      <nav className='text-sm vintage-text'>
        <Link href='/' className='hover:text-vintage-gold'>Home</Link>
        <span className='mx-2'>›</span>
        <Link href='/collectibles' className='hover:text-vintage-gold'>Collectibles</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold text-vintage-brown'>Game Equipment</span>
      </nav>

      <section className='vintage-card border-l-4 border-vintage-gold p-6 rounded-r-lg text-center'>
        <h2 className='text-2xl font-bold vintage-heading mb-3'>Collection Coming Soon</h2>
        <p className='vintage-text mb-4'>
          We are currently cataloging Lou Gehrig game equipment including bats, gloves, 
          uniforms, and other gear from his legendary career.
        </p>
        <Link href='/collectibles' className='bg-vintage-brown text-vintage-cream px-6 py-2 rounded hover:bg-amber-900 transition-colors vintage-subheading font-semibold'>
          Browse Other Collections
        </Link>
      </section>
    </div>
  );
}