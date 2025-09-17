import Link from 'next/link';

export default function Home(){
  return(
    <div className='space-y-8'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-lg text-center'>
        <h1 className='text-4xl font-bold mb-4'>Lou Gehrig Fan Club</h1>
        <h2 className='text-2xl mb-4'>The Iron Horse Collection</h2>
        <p className='text-lg italic mb-4'>&quot;Today I consider myself the luckiest man on the face of the earth.&quot;</p>
        <p className='text-sm opacity-90'>- Lou Gehrig, July 4, 1939</p>
      </section>

      {/* Featured Collectibles */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-center'>Featured Lou Gehrig Collectibles</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          <Link href='/collectibles/baseball-cards' className='group block'>
            <div className='border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'>
              <h3 className='text-xl font-semibold text-blue-800 group-hover:text-blue-600'>Baseball Cards</h3>
              <p className='text-gray-600 mt-2'>Rare and vintage Lou Gehrig trading cards from 1920s-1940s</p>
              <p className='text-sm text-blue-600 mt-2'>View Collection →</p>
            </div>
          </Link>
          
          <Link href='/collectibles/autographs' className='group block'>
            <div className='border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'>
              <h3 className='text-xl font-semibold text-blue-800 group-hover:text-blue-600'>Autographs</h3>
              <p className='text-gray-600 mt-2'>Authenticated signatures and signed memorabilia</p>
              <p className='text-sm text-blue-600 mt-2'>View Collection →</p>
            </div>
          </Link>
          
          <Link href='/collectibles/equipment' className='group block'>
            <div className='border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'>
              <h3 className='text-xl font-semibold text-blue-800 group-hover:text-blue-600'>Game Equipment</h3>
              <p className='text-gray-600 mt-2'>Bats, gloves, and uniforms from the Iron Horse era</p>
              <p className='text-sm text-blue-600 mt-2'>View Collection →</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Most Valuable Items */}
      <section className='bg-gray-50 p-6 rounded-lg'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Most Valuable Lou Gehrig Items</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <div className='bg-white p-4 rounded border'>
            <h4 className='font-semibold text-lg text-blue-800'>1933 Goudey #160</h4>
            <p className='text-sm text-gray-600'>PSA 9 Condition</p>
            <p className='text-lg font-bold text-green-600 mt-2'>$15,000+</p>
          </div>
          <div className='bg-white p-4 rounded border'>
            <h4 className='font-semibold text-lg text-blue-800'>Signed Baseball</h4>
            <p className='text-sm text-gray-600'>PSA/DNA Certified</p>
            <p className='text-lg font-bold text-green-600 mt-2'>$8,500+</p>
          </div>
          <div className='bg-white p-4 rounded border'>
            <h4 className='font-semibold text-lg text-blue-800'>Game-Used Bat</h4>
            <p className='text-sm text-gray-600'>1930s Louisville Slugger</p>
            <p className='text-lg font-bold text-green-600 mt-2'>$25,000+</p>
          </div>
          <div className='bg-white p-4 rounded border'>
            <h4 className='font-semibold text-lg text-blue-800'>Yankees Jersey</h4>
            <p className='text-sm text-gray-600'>1927 World Series</p>
            <p className='text-lg font-bold text-green-600 mt-2'>$50,000+</p>
          </div>
        </div>
        <div className='text-center mt-6'>
          <Link href='/collectibles/most-valuable' className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors'>
            View All Valuable Items
          </Link>
        </div>
      </section>

      {/* Fan Club Features */}
      <section className='grid md:grid-cols-2 gap-6'>
        <div className='border rounded-lg p-6'>
          <h3 className='text-xl font-semibold mb-3'>Join the Fan Club</h3>
          <p className='text-gray-600 mb-4'>Connect with fellow Lou Gehrig enthusiasts and collectors worldwide.</p>
          <Link href='/member' className='text-blue-600 hover:underline'>Learn More →</Link>
        </div>
        <div className='border rounded-lg p-6'>
          <h3 className='text-xl font-semibold mb-3'>Latest News</h3>
          <p className='text-gray-600 mb-4'>Stay updated on new discoveries, auction results, and fan club events.</p>
          <Link href='/news' className='text-blue-600 hover:underline'>Read Latest →</Link>
        </div>
      </section>
    </div>
  );
}