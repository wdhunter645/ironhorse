import Link from 'next/link';

const newsArticles = [
  {
    id: 1,
    title: "Record-Breaking Lou Gehrig Card Sale Reaches $275,000",
    date: "March 15, 2025",
    category: "Auction Results",
    excerpt: "A PSA 9 1933 Goudey #160 Lou Gehrig card sets new auction record, highlighting continued strength in vintage baseball card market.",
    featured: true
  },
  {
    id: 2,
    title: "ALS Research Foundation Announces New Lou Gehrig Initiative",
    date: "March 10, 2025",
    category: "ALS Research",
    excerpt: "The foundation launches a new research program funded by Lou Gehrig memorabilia auction proceeds, continuing the Iron Horse's legacy.",
    featured: false
  },
  {
    id: 3,
    title: "Newly Discovered Lou Gehrig Autograph Authenticated",
    date: "March 5, 2025",
    category: "Discoveries",
    excerpt: "A previously unknown Lou Gehrig signature on a 1938 team photo has been authenticated by PSA/DNA, adding to the known corpus of his autographs.",
    featured: false
  },
  {
    id: 4,
    title: "Yankees Museum Acquires Gehrig Game-Used Bat",
    date: "February 28, 2025",
    category: "Museum News",
    excerpt: "The New York Yankees Museum adds a photo-matched game-used bat from Lou Gehrig's 1932 season to their permanent collection.",
    featured: false
  },
  {
    id: 5,
    title: "Lou Gehrig Fan Club Membership Reaches 10,000",
    date: "February 20, 2025",
    category: "Fan Club",
    excerpt: "The official Lou Gehrig Fan Club celebrates a milestone as membership surpasses 10,000 collectors and fans worldwide.",
    featured: false
  }
];

export default function News() {
  const featuredArticle = newsArticles.find(article => article.featured);
  const otherArticles = newsArticles.filter(article => !article.featured);

  return (
    <div className='space-y-8'>
      {/* Header */}
      <header className='text-center py-12 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg'>
        <h1 className='text-5xl font-bold mb-4'>Lou Gehrig News</h1>
        <p className='text-xl mb-2'>Latest Updates from the Collecting World</p>
        <p className='text-lg opacity-90'>Stay informed about discoveries, auctions, and ALS research</p>
      </header>

      {/* Navigation Breadcrumb */}
      <nav className='text-sm text-gray-600'>
        <Link href='/' className='hover:text-blue-600'>Home</Link>
        <span className='mx-2'>›</span>
        <span className='font-semibold'>News</span>
      </nav>

      {/* Featured Article */}
      {featuredArticle && (
        <section className='bg-blue-50 border-l-4 border-blue-400 p-8 rounded-r-lg'>
          <div className='flex justify-between items-start mb-4'>
            <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded font-semibold'>Featured Story</span>
            <span className='text-sm text-gray-600'>{featuredArticle.date}</span>
          </div>
          <h2 className='text-3xl font-bold text-blue-800 mb-4'>{featuredArticle.title}</h2>
          <p className='text-gray-700 text-lg leading-relaxed mb-6'>{featuredArticle.excerpt}</p>
          <div className='flex justify-between items-center'>
            <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'>{featuredArticle.category}</span>
            <button className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-semibold'>
              Read Full Article
            </button>
          </div>
        </section>
      )}

      {/* Recent News Grid */}
      <section>
        <h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>Recent News</h2>
        <div className='grid md:grid-cols-2 gap-6'>
          {otherArticles.map((article) => (
            <article key={article.id} className='bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-lg transition-all'>
              <div className='flex justify-between items-start mb-3'>
                <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'>{article.category}</span>
                <span className='text-sm text-gray-500'>{article.date}</span>
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer'>
                {article.title}
              </h3>
              <p className='text-gray-600 mb-4 leading-relaxed'>{article.excerpt}</p>
              <button className='text-blue-600 hover:text-blue-800 font-semibold text-sm'>
                Read More →
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className='bg-gray-50 p-8 rounded-lg'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>News Categories</h2>
        <div className='grid md:grid-cols-4 gap-4'>
          <div className='bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer'>
            <h3 className='font-semibold text-blue-800 mb-2'>Auction Results</h3>
            <p className='text-sm text-gray-600'>Latest sales and market trends</p>
          </div>
          <div className='bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer'>
            <h3 className='font-semibold text-green-800 mb-2'>ALS Research</h3>
            <p className='text-sm text-gray-600'>Medical breakthroughs and funding</p>
          </div>
          <div className='bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer'>
            <h3 className='font-semibold text-purple-800 mb-2'>Discoveries</h3>
            <p className='text-sm text-gray-600'>New finds and authentications</p>
          </div>
          <div className='bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer'>
            <h3 className='font-semibold text-red-800 mb-2'>Fan Club</h3>
            <p className='text-sm text-gray-600'>Community updates and events</p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className='text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg'>
        <h2 className='text-3xl font-bold mb-4'>Stay Updated</h2>
        <p className='text-lg mb-6'>Get the latest Lou Gehrig news delivered to your inbox</p>
        <div className='flex justify-center gap-4 max-w-md mx-auto'>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className='flex-1 px-4 py-2 rounded text-gray-800'
          />
          <button className='bg-white text-blue-800 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors'>
            Subscribe
          </button>
        </div>
      </section>

      {/* Related Links */}
      <section className='grid md:grid-cols-3 gap-6'>
        <Link href='/collectibles' className='group'>
          <div className='border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'>
            <h3 className='text-xl font-semibold text-blue-800 group-hover:text-blue-600 mb-2'>Browse Collectibles</h3>
            <p className='text-gray-600'>Explore Lou Gehrig memorabilia and cards</p>
          </div>
        </Link>
        <Link href='/member' className='group'>
          <div className='border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'>
            <h3 className='text-xl font-semibold text-blue-800 group-hover:text-blue-600 mb-2'>Join Fan Club</h3>
            <p className='text-gray-600'>Connect with fellow collectors</p>
          </div>
        </Link>
        <Link href='/collectibles/most-valuable' className='group'>
          <div className='border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white'>
            <h3 className='text-xl font-semibold text-blue-800 group-hover:text-blue-600 mb-2'>Most Valuable Items</h3>
            <p className='text-gray-600'>See the rarest Gehrig collectibles</p>
          </div>
        </Link>
      </section>
    </div>
  );
}