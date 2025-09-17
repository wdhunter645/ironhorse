import Link from 'next/link';

const baseballCards = [
  {
    id: 1,
    title: "1933 Goudey #160 Lou Gehrig",
    year: "1933",
    set: "Goudey",
    number: "#160",
    description: "The most iconic and valuable Lou Gehrig card, featuring him in his classic batting stance. This card is the key to the 1933 Goudey set.",
    grades: [
      { grade: "PSA 10", population: "3", value: "$75,000 - $150,000" },
      { grade: "PSA 9", population: "12", value: "$35,000 - $60,000" },
      { grade: "PSA 8", population: "45", value: "$15,000 - $25,000" },
      { grade: "PSA 7", population: "78", value: "$8,000 - $12,000" }
    ],
    rarity: "High",
    significance: "Most iconic Gehrig card, centerpiece of any collection"
  },
  {
    id: 2,
    title: "1934 Diamond Stars #33 Lou Gehrig",
    year: "1934",
    set: "Diamond Stars",
    number: "#33",
    description: "A beautiful art-deco style card featuring exceptional artwork. Diamond Stars were premium cards with superior design and printing quality.",
    grades: [
      { grade: "PSA 9", population: "8", value: "$25,000 - $40,000" },
      { grade: "PSA 8", population: "25", value: "$12,000 - $18,000" },
      { grade: "PSA 7", population: "52", value: "$6,000 - $9,000" },
      { grade: "PSA 6", population: "89", value: "$3,000 - $4,500" }
    ],
    rarity: "High",
    significance: "Premium artwork and design, highly sought after"
  },
  {
    id: 3,
    title: "1939 Play Ball #61 Lou Gehrig",
    year: "1939",
    set: "Play Ball",
    number: "#61",
    description: "Lou Gehrig's final baseball card, issued during his farewell year. This card holds special emotional significance for collectors.",
    grades: [
      { grade: "PSA 9", population: "15", value: "$18,000 - $30,000" },
      { grade: "PSA 8", population: "42", value: "$8,000 - $12,000" },
      { grade: "PSA 7", population: "78", value: "$4,000 - $6,000" },
      { grade: "PSA 6", population: "125", value: "$2,000 - $3,000" }
    ],
    rarity: "Medium-High",
    significance: "Final card of Gehrig's career, emotional value"
  },
  {
    id: 4,
    title: "1935 Diamond Stars #70 Lou Gehrig",
    year: "1935",
    set: "Diamond Stars",
    number: "#70",
    description: "Another beautiful Diamond Stars issue featuring Lou Gehrig. Known for its vibrant colors and excellent artwork quality.",
    grades: [
      { grade: "PSA 9", population: "6", value: "$20,000 - $35,000" },
      { grade: "PSA 8", population: "18", value: "$10,000 - $15,000" },
      { grade: "PSA 7", population: "41", value: "$5,000 - $7,500" },
      { grade: "PSA 6", population: "67", value: "$2,500 - $3,500" }
    ],
    rarity: "High",
    significance: "Mid-career representation, premium set"
  },
  {
    id: 5,
    title: "1936 Diamond Stars #38 Lou Gehrig",
    year: "1936",
    set: "Diamond Stars",
    number: "#38",
    description: "The final Diamond Stars issue featuring Lou Gehrig. Features him in a fielding pose, showing his defensive abilities.",
    grades: [
      { grade: "PSA 9", population: "4", value: "$22,000 - $38,000" },
      { grade: "PSA 8", population: "16", value: "$11,000 - $16,000" },
      { grade: "PSA 7", population: "38", value: "$5,500 - $8,000" },
      { grade: "PSA 6", population: "59", value: "$2,800 - $4,000" }
    ],
    rarity: "High",
    significance: "Last Diamond Stars issue, defensive pose"
  },
  {
    id: 6,
    title: "1940 Play Ball #1 Lou Gehrig",
    year: "1940",
    set: "Play Ball",
    number: "#1",
    description: "A tribute card to Lou Gehrig as card #1 in the 1940 Play Ball set, honoring his legacy after his retirement.",
    grades: [
      { grade: "PSA 9", population: "12", value: "$15,000 - $25,000" },
      { grade: "PSA 8", population: "35", value: "$7,000 - $10,000" },
      { grade: "PSA 7", population: "68", value: "$3,500 - $5,000" },
      { grade: "PSA 6", population: "98", value: "$1,800 - $2,500" }
    ],
    rarity: "Medium-High",
    significance: "Tribute card, #1 in set honors his legacy"
  }
];

export default function BaseballCards() {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <header className='text-center py-12 bg-gradient-to-r from-green-900 to-green-700 text-white rounded-lg'>
        <h1 className='text-5xl font-bold mb-4'>Lou Gehrig Baseball Cards</h1>
        <p className='text-xl mb-2'>Vintage Trading Cards from the Golden Age</p>
        <p className='text-lg opacity-90'>Discover the most valuable and collectible Lou Gehrig cards</p>
      </header>

      {/* Navigation Breadcrumb */}
      <nav className='text-sm text-gray-600'>
        <Link href='/' className='hover:text-blue-600'>Home</Link>
        <span className='mx-2'>›</span>
        <Link href='/collectibles' className='hover:text-blue-600'>Collectibles</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold'>Baseball Cards</span>
      </nav>

      {/* Introduction */}
      <section className='bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg'>
        <h2 className='text-2xl font-bold text-green-800 mb-3'>Lou Gehrig Baseball Card Guide</h2>
        <p className='text-gray-700 mb-4'>
          Lou Gehrig&apos;s baseball cards span from the early 1930s through his farewell in 1939, representing some of the most valuable 
          pre-war baseball cards in existence. His cards are characterized by their rarity, historical significance, and the tragic 
          story that makes them emotionally resonant with collectors.
        </p>
        <div className='grid md:grid-cols-3 gap-4 text-sm'>
          <div className='bg-white p-3 rounded border'>
            <h4 className='font-semibold text-green-800'>Peak Years</h4>
            <p className='text-gray-600'>1933-1936 Diamond Stars and Goudey issues are most valuable</p>
          </div>
          <div className='bg-white p-3 rounded border'>
            <h4 className='font-semibold text-green-800'>Condition Sensitivity</h4>
            <p className='text-gray-600'>Pre-war cards show dramatic value differences by grade</p>
          </div>
          <div className='bg-white p-3 rounded border'>
            <h4 className='font-semibold text-green-800'>Investment Potential</h4>
            <p className='text-gray-600'>High-grade examples continue to appreciate significantly</p>
          </div>
        </div>
      </section>

      {/* Card Collection */}
      <section className='space-y-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800'>Complete Lou Gehrig Card Collection</h2>
        
        <div className='space-y-8'>
          {baseballCards.map((card) => (
            <article key={card.id} className='bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-green-400 hover:shadow-lg transition-all'>
              <div className='grid lg:grid-cols-3 gap-8'>
                {/* Card Info */}
                <div className='lg:col-span-2'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h3 className='text-3xl font-bold text-green-800 mb-2'>{card.title}</h3>
                      <div className='flex gap-2 mb-3'>
                        <span className='px-3 py-1 bg-green-100 text-green-800 text-sm rounded font-semibold'>{card.set}</span>
                        <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded'>{card.year}</span>
                        <span className='px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded'>{card.number}</span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-lg font-bold text-red-600'>Rarity: {card.rarity}</div>
                    </div>
                  </div>

                  <p className='text-gray-700 mb-6 text-lg leading-relaxed'>{card.description}</p>

                  <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                    <h4 className='font-bold text-gray-800 mb-3'>Historical Significance</h4>
                    <p className='text-gray-600 italic'>{card.significance}</p>
                  </div>
                </div>

                {/* Pricing Grid */}
                <div className='bg-gray-50 p-6 rounded-lg'>
                  <h4 className='text-xl font-bold text-gray-800 mb-4 text-center'>Current Market Values</h4>
                  <div className='space-y-3'>
                    {card.grades.map((gradeInfo, index) => (
                      <div key={index} className='bg-white p-3 rounded border flex justify-between items-center'>
                        <div>
                          <div className='font-bold text-gray-800'>{gradeInfo.grade}</div>
                          <div className='text-xs text-gray-500'>Pop: {gradeInfo.population}</div>
                        </div>
                        <div className='text-right'>
                          <div className='font-bold text-green-600'>{gradeInfo.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 text-center'>
                    Population data from PSA Registry
                  </div>
                </div>
              </div>

              <div className='mt-6 pt-6 border-t border-gray-200 flex justify-between items-center'>
                <button className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors font-semibold'>
                  View Auction Results
                </button>
                <button className='border-2 border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-600 hover:text-white transition-colors font-semibold'>
                  Add to Watchlist
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Collecting Guide */}
      <section className='bg-blue-50 p-8 rounded-lg'>
        <h2 className='text-3xl font-bold text-center mb-8 text-blue-800'>Baseball Card Collecting Guide</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-xl font-bold text-blue-800 mb-4'>Grading & Authentication</h3>
            <ul className='space-y-3 text-gray-700'>
              <li className='flex items-start'><span className='text-blue-600 mr-2 font-bold'>PSA:</span>Most popular grading service for vintage cards</li>
              <li className='flex items-start'><span className='text-blue-600 mr-2 font-bold'>SGC:</span>Alternative service with growing acceptance</li>
              <li className='flex items-start'><span className='text-blue-600 mr-2 font-bold'>BGS:</span>Beckett grading, less common for pre-war</li>
              <li className='flex items-start'><span className='text-blue-600 mr-2 font-bold'>Raw:</span>Ungraded cards can be risky but offer opportunity</li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold text-blue-800 mb-4'>Investment Strategy</h3>
            <ul className='space-y-3 text-gray-700'>
              <li className='flex items-start'><span className='text-blue-600 mr-2'>•</span>Focus on PSA 7+ for investment potential</li>
              <li className='flex items-start'><span className='text-blue-600 mr-2'>•</span>1933 Goudey #160 is the cornerstone card</li>
              <li className='flex items-start'><span className='text-blue-600 mr-2'>•</span>Diamond Stars offer premium artwork appeal</li>
              <li className='flex items-start'><span className='text-blue-600 mr-2'>•</span>1939/1940 cards have emotional significance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className='bg-gradient-to-r from-purple-100 to-purple-200 p-8 rounded-lg'>
        <h2 className='text-3xl font-bold text-center mb-8 text-purple-800'>Market Trends & Analysis</h2>
        <div className='grid md:grid-cols-4 gap-6'>
          <div className='bg-white p-6 rounded-lg shadow text-center'>
            <h3 className='text-lg font-bold text-purple-800 mb-2'>5-Year Growth</h3>
            <div className='text-3xl font-bold text-green-600 mb-1'>+285%</div>
            <p className='text-sm text-gray-600'>Average for PSA 8+ Gehrig cards</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow text-center'>
            <h3 className='text-lg font-bold text-purple-800 mb-2'>Record Sale</h3>
            <div className='text-3xl font-bold text-red-600 mb-1'>$275K</div>
            <p className='text-sm text-gray-600'>1933 Goudey #160 PSA 9</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow text-center'>
            <h3 className='text-lg font-bold text-purple-800 mb-2'>Population</h3>
            <div className='text-3xl font-bold text-blue-600 mb-1'>Limited</div>
            <p className='text-sm text-gray-600'>High grades extremely scarce</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow text-center'>
            <h3 className='text-lg font-bold text-purple-800 mb-2'>Future Outlook</h3>
            <div className='text-3xl font-bold text-purple-600 mb-1'>Strong</div>
            <p className='text-sm text-gray-600'>Continued appreciation expected</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='text-center bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg'>
        <h2 className='text-3xl font-bold mb-4'>Start Your Lou Gehrig Card Collection</h2>
        <p className='text-lg mb-6'>Join fellow collectors in preserving the legacy of baseball&apos;s Iron Horse</p>
        <div className='flex justify-center gap-4'>
          <Link href='/member' className='bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'>
            Join Community
          </Link>
          <Link href='/collectibles/most-valuable' className='border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors'>
            View Most Valuable
          </Link>
        </div>
      </section>
    </div>
  );
}