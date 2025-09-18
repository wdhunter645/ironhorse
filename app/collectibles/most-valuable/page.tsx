import Link from 'next/link';

const valuableItems = [
  {
    id: 1,
    title: "1927 Yankees Team-Signed Baseball",
    description: "The Holy Grail of baseball collectibles - a baseball signed by the entire 1927 &apos;Murderers Row&apos; Yankees team, including Lou Gehrig, Babe Ruth, and other legends.",
    condition: "PSA/DNA Certified Authentic",
    rarity: "Only 3-5 known examples",
    valueRange: "$150,000 - $500,000+",
    category: "Autographs",
    year: "1927",
    highlights: ["Complete team signatures", "Gehrig and Ruth on same ball", "Sweet spot signatures", "Museum provenance"]
  },
  {
    id: 2,
    title: "1933 Goudey #160 Lou Gehrig PSA 10",
    description: "The most iconic Lou Gehrig card in pristine condition. This card features Gehrig in his classic batting stance and is considered the key card to the 1933 Goudey set.",
    condition: "PSA 10 Gem Mint",
    rarity: "Population: Less than 10",
    valueRange: "$75,000 - $150,000",
    category: "Baseball Cards",
    year: "1933",
    highlights: ["Perfect centering", "Sharp corners", "Vibrant colors", "Key rookie-era card"]
  },
  {
    id: 3,
    title: "Game-Used 1930s Louisville Slugger Bat",
    description: "An authenticated game-used bat from Lou Gehrig's peak years. Features visible wear patterns and has been photo-matched to specific games during the 1930s.",
    condition: "Game-Used, Authenticated",
    rarity: "Photo-matched example",
    valueRange: "$200,000 - $750,000",
    category: "Equipment",
    year: "1930-1935",
    highlights: ["Photo-matched usage", "Visible wear patterns", "Original finish", "PSA/DNA authenticated"]
  },
  {
    id: 4,
    title: "1939 Farewell Speech Original Press Photo",
    description: "An original wire photo capturing Lou Gehrig's emotional farewell speech on July 4, 1939. Features clear image quality with original press stamps and notations.",
    condition: "Excellent Original",
    rarity: "Original wire photos rare",
    valueRange: "$15,000 - $40,000",
    category: "Photographs",
    year: "1939",
    highlights: ["Original wire photo", "July 4, 1939 date", "Press stamps intact", "Historic moment captured"]
  },
  {
    id: 5,
    title: "1927 World Series Program - Gehrig Featured",
    description: "Complete program from the 1927 World Series featuring Lou Gehrig and the legendary Yankees team. Excellent condition with all pages intact.",
    condition: "Near Mint",
    rarity: "Complete programs scarce",
    valueRange: "$8,000 - $25,000",
    category: "Programs",
    year: "1927",
    highlights: ["Complete all pages", "Gehrig featured prominently", "World Series historic", "Murderers Row lineup"]
  },
  {
    id: 6,
    title: "Lou Gehrig Personal Letter (1938)",
    description: "A handwritten personal letter from Lou Gehrig to a fan, written during his final playing season. Provides insight into his character and personality.",
    condition: "Very Fine",
    rarity: "Personal letters extremely rare",
    valueRange: "$50,000 - $125,000",
    category: "Documents",
    year: "1938",
    highlights: ["Handwritten by Gehrig", "Personal content", "1938 date significant", "Authentication included"]
  },
  {
    id: 7,
    title: "1932 Yankees Jersey - Gehrig Game-Worn",
    description: "A game-worn New York Yankees jersey from Lou Gehrig's 1932 season. Features period-correct construction and shows appropriate game wear.",
    condition: "Game-Worn, Restored",
    rarity: "Game-worn jerseys museum pieces",
    valueRange: "$300,000 - $1,000,000+",
    category: "Uniforms",
    year: "1932",
    highlights: ["Game-worn by Gehrig", "1932 season provenance", "Period construction", "Museum-quality piece"]
  },
  {
    id: 8,
    title: "1934 Diamond Stars #33 Lou Gehrig PSA 9",
    description: "A beautiful high-grade example of the 1934 Diamond Stars Lou Gehrig card. Features exceptional centering and vibrant artwork typical of this premium set.",
    condition: "PSA 9 Mint",
    rarity: "High-grade examples scarce",
    valueRange: "$12,000 - $30,000",
    category: "Baseball Cards",
    year: "1934",
    highlights: ["PSA 9 grade", "Exceptional artwork", "Diamond Stars premium set", "Centered perfectly"]
  },
  {
    id: 9,
    title: "Signed Gehrig Rookie Contract (1923)",
    description: "Lou Gehrig's original signed contract with the New York Yankees from 1923, marking the beginning of his legendary career. Includes all original signatures and seals.",
    condition: "Very Good",
    rarity: "Only known rookie contract",
    valueRange: "$400,000 - $1,500,000",
    category: "Documents",
    year: "1923",
    highlights: ["Rookie year contract", "Original signatures", "Yankees letterhead", "Career-beginning document"]
  },
  {
    id: 10,
    title: "1939 Play Ball #61 Lou Gehrig (Final Card)",
    description: "Lou Gehrig's final baseball card, issued during his farewell year. This card holds special significance as it represents the end of his playing career.",
    condition: "PSA 8 NM-MT",
    rarity: "Final card adds premium",
    valueRange: "$8,000 - $20,000",
    category: "Baseball Cards",
    year: "1939",
    highlights: ["Final playing year", "Emotional significance", "High grade example", "Career capstone card"]
  }
];

export default function MostValuableItems() {
  return (
    <div className='space-y-8'>
      {/* Header */}
      <header className='text-center py-12 bg-gradient-to-r from-vintage-brown to-amber-900 text-vintage-cream rounded-lg shadow-lg border-vintage-gold'>
        <h1 className='text-5xl font-bold mb-4 vintage-heading'>Most Valuable Lou Gehrig Items</h1>
        <p className='text-xl mb-2 vintage-text text-vintage-cream'>The Holy Grail of Baseball Collectibles</p>
        <p className='text-lg opacity-90 vintage-text text-vintage-cream'>Discover the rarest and most valuable Lou Gehrig memorabilia ever sold</p>
      </header>

      {/* Navigation Breadcrumb */}
      <nav className='text-sm vintage-text'>
        <Link href='/' className='hover:text-vintage-gold'>Home</Link>
        <span className='mx-2'>›</span>
        <Link href='/collectibles' className='hover:text-vintage-gold'>Collectibles</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold text-vintage-brown'>Most Valuable Items</span>
      </nav>

      {/* Introduction */}
      <section className='vintage-card border-l-4 border-vintage-gold p-6 rounded-r-lg'>
        <h2 className='text-2xl font-bold vintage-heading mb-3'>Investment Guide to Lou Gehrig Collectibles</h2>
        <p className='vintage-text mb-4'>
          Lou Gehrig memorabilia represents some of the most stable and appreciating investments in the sports collectibles market. 
          The Iron Horse&apos;s tragic story, legendary career, and limited availability of authentic items drive consistent demand among collectors worldwide.
        </p>
        <div className='grid md:grid-cols-3 gap-4 text-sm'>
          <div className='vintage-card vintage-border-thin p-3 rounded'>
            <h4 className='font-semibold vintage-subheading'>Market Performance</h4>
            <p className='vintage-text'>Lou Gehrig items have appreciated 300-500% over the past decade</p>
          </div>
          <div className='vintage-card vintage-border-thin p-3 rounded'>
            <h4 className='font-semibold vintage-subheading'>Rarity Factor</h4>
            <p className='vintage-text'>Limited career span (1923-1939) creates natural scarcity</p>
          </div>
          <div className='vintage-card vintage-border-thin p-3 rounded'>
            <h4 className='font-semibold vintage-subheading'>Historical Significance</h4>
            <p className='vintage-text'>ALS awareness keeps Gehrig&apos;s legacy in public consciousness</p>
          </div>
        </div>
      </section>

      {/* Filter/Sort Controls */}
      <div className='vintage-card p-4 rounded-lg'>
        <div className='flex flex-wrap gap-4 items-center justify-between'>
          <div className='flex gap-2 flex-wrap'>
            <span className='text-sm font-semibold vintage-subheading'>Filter by Category:</span>
            <button className='px-3 py-1 bg-vintage-brown text-vintage-cream text-sm rounded hover:bg-amber-900 vintage-subheading'>All Categories</button>
            <button className='px-3 py-1 bg-vintage-linen text-vintage-brown text-sm rounded hover:bg-vintage-cream vintage-text'>Baseball Cards</button>
            <button className='px-3 py-1 bg-vintage-linen text-vintage-brown text-sm rounded hover:bg-vintage-cream vintage-text'>Autographs</button>
            <button className='px-3 py-1 bg-vintage-linen text-vintage-brown text-sm rounded hover:bg-vintage-cream vintage-text'>Equipment</button>
            <button className='px-3 py-1 bg-vintage-linen text-vintage-brown text-sm rounded hover:bg-vintage-cream vintage-text'>Documents</button>
          </div>
          <div className='text-sm vintage-text'>
            Showing {valuableItems.length} premium items
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <section className='grid lg:grid-cols-2 gap-8'>
        {valuableItems.map((item) => (
          <article key={item.id} className='vintage-card vintage-border p-6 hover:shadow-xl transition-all'>
            <div className='flex justify-between items-start mb-4'>
              <div className='flex-1'>
                <h3 className='text-2xl font-bold vintage-heading mb-2'>{item.title}</h3>
                <div className='flex gap-2 mb-3'>
                  <span className='px-2 py-1 bg-vintage-cream text-vintage-brown text-xs rounded font-semibold border border-vintage-gold'>{item.category}</span>
                  <span className='px-2 py-1 bg-vintage-linen text-gray-600 text-xs rounded border border-gray-300'>{item.year}</span>
                </div>
              </div>
              <div className='text-right'>
                <div className='text-2xl font-bold text-vintage-gold vintage-subheading'>{item.valueRange}</div>
                <div className='text-sm vintage-text'>{item.rarity}</div>
              </div>
            </div>

            <p className='vintage-text mb-4 leading-relaxed'>{item.description}</p>

            <div className='grid md:grid-cols-2 gap-4 mb-4'>
              <div>
                <h4 className='font-semibold vintage-subheading mb-1'>Condition</h4>
                <p className='text-sm vintage-text'>{item.condition}</p>
              </div>
              <div>
                <h4 className='font-semibold vintage-subheading mb-1'>Rarity</h4>
                <p className='text-sm vintage-text'>{item.rarity}</p>
              </div>
            </div>

            <div className='mb-4'>
              <h4 className='font-semibold vintage-subheading mb-2'>Key Highlights</h4>
              <div className='grid grid-cols-2 gap-1'>
                {item.highlights.map((highlight, index) => (
                  <div key={index} className='text-sm vintage-text flex items-center'>
                    <span className='text-vintage-gold mr-1'>✓</span>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-between items-center pt-4 border-t border-vintage-gold border-opacity-30'>
              <button className='bg-vintage-brown text-vintage-cream px-4 py-2 rounded hover:bg-amber-900 transition-colors text-sm font-semibold vintage-subheading'>
                View Details
              </button>
              <div className='text-xs vintage-text'>
                Last updated: Current market values
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Market Analysis */}
      <section className='vintage-card p-8 rounded-lg bg-gradient-to-r from-vintage-cream to-amber-50'>
        <h2 className='text-3xl font-bold text-center mb-8 vintage-heading'>Market Analysis & Trends</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className='vintage-card vintage-border-thin p-6 rounded-lg'>
            <h3 className='text-xl font-bold vintage-subheading mb-3'>Price Appreciation</h3>
            <div className='text-3xl font-bold text-vintage-gold mb-2'>+350%</div>
            <p className='vintage-text text-sm'>Average appreciation over 10 years for high-grade Gehrig items</p>
          </div>
          <div className='vintage-card vintage-border-thin p-6 rounded-lg'>
            <h3 className='text-xl font-bold vintage-subheading mb-3'>Market Demand</h3>
            <div className='text-3xl font-bold text-vintage-brown mb-2'>High</div>
            <p className='vintage-text text-sm'>Consistent demand from collectors and investors worldwide</p>
          </div>
          <div className='vintage-card vintage-border-thin p-6 rounded-lg'>
            <h3 className='text-xl font-bold vintage-subheading mb-3'>Future Outlook</h3>
            <div className='text-3xl font-bold text-vintage-amber mb-2'>Strong</div>
            <p className='vintage-text text-sm'>Limited supply and growing ALS awareness support continued growth</p>
          </div>
        </div>
      </section>

      {/* Collecting Advice */}
      <section className='vintage-card border-2 border-vintage-gold p-8 rounded-lg bg-vintage-cream'>
        <h2 className='text-3xl font-bold text-center mb-6 vintage-heading'>Expert Collecting Advice</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-xl font-bold vintage-subheading mb-4'>Before You Buy</h3>
            <ul className='space-y-2 vintage-text'>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Always demand authentication from reputable services (PSA, SGC, JSA)</li>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Research comparable sales and market trends</li>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Verify provenance and ownership history</li>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Consider condition carefully - small differences mean big money</li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold vintage-subheading mb-4'>Investment Strategy</h3>
            <ul className='space-y-2 vintage-text'>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Focus on authenticated, high-grade examples</li>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Diversify across different item categories</li>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Hold for long-term appreciation (5+ years)</li>
              <li className='flex items-start'><span className='text-vintage-gold mr-2'>•</span>Stay informed about market trends and auction results</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='text-center bg-gradient-to-r from-vintage-brown to-amber-900 text-vintage-cream p-8 rounded-lg shadow-lg'>
        <h2 className='text-3xl font-bold mb-4 vintage-heading'>Join the Lou Gehrig Collecting Community</h2>
        <p className='text-lg mb-6 vintage-text text-vintage-cream'>Connect with fellow collectors, share discoveries, and stay updated on market trends</p>
        <div className='flex justify-center gap-4'>
          <Link href='/member' className='bg-vintage-cream text-vintage-brown px-6 py-3 rounded-lg font-semibold hover:bg-vintage-linen transition-colors vintage-subheading'>
            Join Fan Club
          </Link>
          <Link href='/collectibles' className='border-2 border-vintage-cream text-vintage-cream px-6 py-3 rounded-lg font-semibold hover:bg-vintage-cream hover:text-vintage-brown transition-colors vintage-subheading'>
            Browse All Collections
          </Link>
        </div>
      </section>
    </div>
  );
}