import Link from 'next/link';

export default function Collectibles() {
  return (
    <div className='space-y-8'>
      <header className='text-center py-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg'>
        <h1 className='text-4xl font-bold mb-4'>Lou Gehrig Collectibles</h1>
        <p className='text-lg'>Discover rare memorabilia from baseball&apos;s Iron Horse</p>
      </header>

      {/* Categories Grid */}
      <section className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Link href='/collectibles/baseball-cards' className='group'>
          <div className='border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all bg-white'>
            <h3 className='text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-600'>Baseball Cards</h3>
            <p className='text-gray-600 mb-4'>Vintage trading cards from the golden age of baseball, featuring Lou Gehrig&apos;s most iconic poses and moments.</p>
            <ul className='text-sm text-gray-500 space-y-1'>
              <li>• 1933 Goudey Series</li>
              <li>• 1934-36 Diamond Stars</li>
              <li>• Play Ball Series</li>
              <li>• Regional Issues</li>
            </ul>
            <p className='text-blue-600 font-semibold mt-4 group-hover:underline'>View Collection →</p>
          </div>
        </Link>

        <Link href='/collectibles/autographs' className='group'>
          <div className='border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all bg-white'>
            <h3 className='text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-600'>Autographs</h3>
            <p className='text-gray-600 mb-4'>Authenticated signatures on baseballs, photos, contracts, and personal items from the Iron Horse himself.</p>
            <ul className='text-sm text-gray-500 space-y-1'>
              <li>• Signed Baseballs</li>
              <li>• Autographed Photos</li>
              <li>• Contract Signatures</li>
              <li>• Personal Letters</li>
            </ul>
            <p className='text-blue-600 font-semibold mt-4 group-hover:underline'>View Collection →</p>
          </div>
        </Link>

        <Link href='/collectibles/equipment' className='group'>
          <div className='border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all bg-white'>
            <h3 className='text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-600'>Game Equipment</h3>
            <p className='text-gray-600 mb-4'>Game-used and replica equipment from Lou Gehrig&apos;s legendary career with the New York Yankees.</p>
            <ul className='text-sm text-gray-500 space-y-1'>
              <li>• Louisville Slugger Bats</li>
              <li>• Yankees Uniforms</li>
              <li>• Fielding Gloves</li>
              <li>• Caps & Accessories</li>
            </ul>
            <p className='text-blue-600 font-semibold mt-4 group-hover:underline'>View Collection →</p>
          </div>
        </Link>

        <Link href='/collectibles/photos' className='group'>
          <div className='border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all bg-white'>
            <h3 className='text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-600'>Photographs</h3>
            <p className='text-gray-600 mb-4'>Original press photos, team photos, and candid shots from Lou Gehrig&apos;s playing days and beyond.</p>
            <ul className='text-sm text-gray-500 space-y-1'>
              <li>• Action Shots</li>
              <li>• Team Photos</li>
              <li>• Farewell Speech</li>
              <li>• Personal Moments</li>
            </ul>
            <p className='text-blue-600 font-semibold mt-4 group-hover:underline'>View Collection →</p>
          </div>
        </Link>

        <Link href='/collectibles/programs' className='group'>
          <div className='border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all bg-white'>
            <h3 className='text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-600'>Programs & Publications</h3>
            <p className='text-gray-600 mb-4'>Game programs, magazines, newspapers, and books featuring Lou Gehrig throughout his career.</p>
            <ul className='text-sm text-gray-500 space-y-1'>
              <li>• World Series Programs</li>
              <li>• Yankees Scorecards</li>
              <li>• Magazine Features</li>
              <li>• Newspaper Articles</li>
            </ul>
            <p className='text-blue-600 font-semibold mt-4 group-hover:underline'>View Collection →</p>
          </div>
        </Link>

        <Link href='/collectibles/most-valuable' className='group'>
          <div className='border-2 border-red-200 rounded-lg p-6 hover:border-red-500 hover:shadow-lg transition-all bg-red-50'>
            <h3 className='text-2xl font-bold text-red-800 mb-3 group-hover:text-red-600'>Most Valuable Items</h3>
            <p className='text-gray-600 mb-4'>The holy grail of Lou Gehrig collectibles - the rarest and most valuable items in existence.</p>
            <ul className='text-sm text-gray-500 space-y-1'>
              <li>• Record-Breaking Sales</li>
              <li>• Museum-Quality Items</li>
              <li>• One-of-a-Kind Pieces</li>
              <li>• Investment Guide</li>
            </ul>
            <p className='text-red-600 font-semibold mt-4 group-hover:underline'>View Treasures →</p>
          </div>
        </Link>
      </section>

      {/* Featured Items */}
      <section className='bg-gray-50 p-8 rounded-lg'>
        <h2 className='text-3xl font-bold text-center mb-8'>Featured This Month</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <h4 className='text-xl font-bold text-blue-800 mb-2'>1933 Goudey #160</h4>
            <p className='text-gray-600 mb-3'>The most iconic Lou Gehrig card, featuring him in his classic batting stance.</p>
            <div className='text-sm text-gray-500 space-y-1'>
              <p><strong>Condition:</strong> PSA 8-10</p>
              <p><strong>Value Range:</strong> $3,000 - $50,000</p>
              <p><strong>Rarity:</strong> High Grade Examples Scarce</p>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow'>
            <h4 className='text-xl font-bold text-blue-800 mb-2'>Farewell Speech Photo</h4>
            <p className='text-gray-600 mb-3'>Original press photo from July 4, 1939, capturing the historic farewell.</p>
            <div className='text-sm text-gray-500 space-y-1'>
              <p><strong>Size:</strong> 8x10 Original Press Photo</p>
              <p><strong>Value Range:</strong> $1,500 - $8,000</p>
              <p><strong>Rarity:</strong> Original Wire Photos Rare</p>
            </div>
          </div>
          
          <div className='bg-white p-6 rounded-lg shadow'>
            <h4 className='text-xl font-bold text-blue-800 mb-2'>Game-Used Bat Fragment</h4>
            <p className='text-gray-600 mb-3'>Authenticated piece from a Louisville Slugger used during the 1930s.</p>
            <div className='text-sm text-gray-500 space-y-1'>
              <p><strong>Authentication:</strong> PSA/DNA</p>
              <p><strong>Value Range:</strong> $5,000 - $15,000</p>
              <p><strong>Rarity:</strong> Game-Used Material Extremely Rare</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collecting Tips */}
      <section className='border-l-4 border-blue-500 pl-6 bg-blue-50 p-6 rounded-r-lg'>
        <h3 className='text-2xl font-bold text-blue-800 mb-4'>Collecting Tips</h3>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <h4 className='font-semibold mb-2'>Authentication is Key</h4>
            <p className='text-gray-600 text-sm'>Always verify authenticity through reputable grading services like PSA, SGC, or JSA for autographs.</p>
          </div>
          <div>
            <h4 className='font-semibold mb-2'>Condition Matters</h4>
            <p className='text-gray-600 text-sm'>Even small differences in condition can dramatically affect value, especially for vintage cards.</p>
          </div>
          <div>
            <h4 className='font-semibold mb-2'>Provenance Research</h4>
            <p className='text-gray-600 text-sm'>Items with documented history and provenance command premium prices.</p>
          </div>
          <div>
            <h4 className='font-semibold mb-2'>Market Trends</h4>
            <p className='text-gray-600 text-sm'>Lou Gehrig items have shown consistent appreciation, especially around ALS awareness periods.</p>
          </div>
        </div>
      </section>
    </div>
  );
}