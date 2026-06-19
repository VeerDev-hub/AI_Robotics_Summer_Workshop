import { useState } from 'react'

interface Review {
  id: string
  venue: string
  text: string
  author: string
  avatarLetter: string
  avatarColor: string
  timeAgo: string
  rating: number
}

export function ReviewsSection() {
  const reviews: Review[] = [
    {
      id: 'rev-1',
      venue: 'Ferrari World Yas Island, Abu Dhabi',
      text: 'SUPER INCREDIBLE EXPERIENCE. The turbo ride is simply the best feeling of being alive and experiencing quickness. It was beautiful.',
      author: 'Essence Pickett',
      avatarLetter: 'E',
      avatarColor: 'var(--clr-sky-light)',
      timeAgo: '2 months ago',
      rating: 4.5,
    },
    {
      id: 'rev-2',
      venue: 'Kidzania',
      text: '5 stars for the venue itself...my 6 year just loves it and the variety here is commendable.',
      author: 'Meghan Nicole',
      avatarLetter: 'M',
      avatarColor: 'var(--clr-yellow-light)',
      timeAgo: '2 weeks ago',
      rating: 4.3,
    },
    {
      id: 'rev-3',
      venue: 'Museum of The Future',
      text: 'One of the iconic location in Dubai. You can explore future technologies and Dubai vision ⭐⭐⭐⭐⭐ Absolutely incredible experience at the Museum of the Future!...',
      author: 'Niyas Pulpadan',
      avatarLetter: 'N',
      avatarColor: 'var(--clr-pink-light)',
      timeAgo: '1 month ago',
      rating: 4.4,
    },
    {
      id: 'rev-4',
      venue: 'Warner Bros. World Abu Dhabi',
      text: 'An absolute blast for kids! The character meetups and fully indoor theme park makes it perfect for summers. Very well managed!',
      author: 'Aisha Al-Mansoori',
      avatarLetter: 'A',
      avatarColor: 'var(--clr-green-light)',
      timeAgo: '3 weeks ago',
      rating: 4.8,
    },
    {
      id: 'rev-5',
      venue: 'Legoland Dubai',
      text: 'My kids loved the interactive lego building workshop and robotics challenges. Hands-on coding and building at its finest.',
      author: 'Robert Davies',
      avatarLetter: 'R',
      avatarColor: 'var(--clr-purple-light)',
      timeAgo: '1 month ago',
      rating: 4.6,
    },
  ]

  // Carousel State
  const [startIndex, setStartIndex] = useState(0)

  // Navigation handlers
  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }

  // Get active items to display (circular buffer representation)
  const getVisibleReviews = () => {
    const visible: Review[] = []
    for (let i = 0; i < 3; i++) {
      const idx = (startIndex + i) % reviews.length
      visible.push(reviews[idx])
    }
    return visible
  }

  const visibleReviews = getVisibleReviews()

  return (
    <section 
      className="section-padding-playful relative overflow-hidden" 
      style={{ 
        backgroundColor: '#fbfbfb',
        borderTop: '3px solid var(--clr-border)',
        borderBottom: '3px solid var(--clr-border)'
      }}
    >
      {/* Decorative Whimsical Elements */}
      {/* Left side abstract blobs / flower */}
      <div 
        className="absolute left-[-50px] bottom-[-20px] w-48 h-48 opacity-10 pointer-events-none hidden md:block"
        style={{
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--clr-pink) 20%, transparent 60%)'
        }}
      />
      <div className="absolute left-4 top-8 opacity-20 pointer-events-none hidden lg:block">
        {/* Yellow Star decoration */}
        <svg className="w-16 h-16 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5l2.9 6.1 6.7 1-4.8 4.7 1.1 6.7-5.9-3.1-5.9 3.1 1.1-6.7-4.8-4.7 6.7-1z" />
        </svg>
      </div>

      {/* Right side happy face flower decoration */}
      <div className="absolute right-[-40px] top-[20%] opacity-15 pointer-events-none hidden lg:block">
        <svg className="w-40 h-40 text-pink-400" fill="currentColor" viewBox="0 0 100 100">
          <path d="M50 25c-5 0-10 5-10 10s5 10 10 10 10-5 10-10-5-10-10-10zm0 30c-5 0-10 5-10 10s5 10 10 10 10-5 10-10-5-10-10-10zm25-15c-5 0-10 5-10 10s5 10 10 10 10-5 10-10-5-10-10-10zm-50 0c-5 0-10 5-10 10s5 10 10 10 10-5 10-10-5-10-10-10z" />
          <circle cx="50" cy="50" r="15" className="text-yellow-400" />
        </svg>
      </div>

      <div className="section-container relative z-10">
        
        {/* Title */}
        <div className="text-center mb-10 reveal">
          <h2 className="text-3xl md:text-4xl font-black mb-2 flex items-center justify-center gap-2 flex-wrap">
            Our customers love it! 
            <span className="flex items-center text-yellow-500 gap-1 bg-yellow-100 dark:bg-yellow-950 px-3 py-1 rounded-full border-2 border-slate-900 text-xl font-black">
              ⭐ 4.7/5
            </span>
          </h2>
          <p className="text-muted text-sm md:text-base font-semibold">
            100,000 reviews to help you choose
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 md:px-12">
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            aria-label="Previous review"
            className="absolute left-0 top-[40%] translate-y-[-50%] w-10 h-10 rounded-full border-3 border-slate-900 bg-white flex items-center justify-center hover:scale-110 active:translate-y-[-46%] transition-all cursor-pointer z-20"
            style={{ boxShadow: 'var(--shadow-brutal-sm)' }}
          >
            <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            aria-label="Next review"
            className="absolute right-0 top-[40%] translate-y-[-50%] w-10 h-10 rounded-full border-3 border-slate-900 bg-white flex items-center justify-center hover:scale-110 active:translate-y-[-46%] transition-all cursor-pointer z-20"
            style={{ boxShadow: 'var(--shadow-brutal-sm)' }}
          >
            <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
            
            {/* Desktop View: shows 3 cards, Tablet shows 2, Mobile shows 1 */}
            {visibleReviews.map((review, index) => {
              // Hide cards dynamically on smaller screen sizes
              const cardClass = `playful-card p-6 flex flex-col justify-between min-h-[300px] relative reveal reveal-delay-${index + 1} ` + 
                               (index === 1 ? 'hidden md:flex' : '') + 
                               (index === 2 ? 'hidden lg:flex' : '')

              return (
                <div 
                  key={`${review.id}-${index}`}
                  className={cardClass}
                  style={{ backgroundColor: 'var(--clr-white)', flex: '1 0 0%' }}
                >
                  {/* Quote decoration */}
                  <span className="absolute top-4 left-6 text-6xl font-serif text-amber-500/10 pointer-events-none select-none">
                    “
                  </span>

                  {/* Verified Badge */}
                  <div className="flex justify-end mb-2">
                    <span 
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: 'var(--clr-green-light)',
                        color: 'var(--clr-green)',
                        border: '1.5px solid var(--clr-border)'
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Verified
                    </span>
                  </div>

                  {/* Review Content */}
                  <div className="mb-6 z-10 flex-grow">
                    <h4 className="text-base font-black text-amber-600 mb-2 leading-snug">
                      {review.venue}
                    </h4>
                    <p className="text-slate-700 text-xs md:text-sm font-semibold leading-relaxed" style={{ color: 'var(--clr-ink)' }}>
                      {review.text}
                    </p>
                  </div>

                  {/* Footer Divider */}
                  <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-800 my-4"></div>

                  {/* Reviewer Details */}
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center font-black text-slate-800 text-sm"
                      style={{ backgroundColor: review.avatarColor }}
                    >
                      {review.avatarLetter}
                    </div>
                    
                    <div className="flex-grow">
                      <p className="text-xs md:text-sm font-black" style={{ color: 'var(--clr-ink)' }}>
                        {review.author}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted font-bold">{review.timeAgo}</span>
                        <div className="flex items-center gap-0.5 text-xs text-yellow-500 font-bold">
                          <span>⭐</span>
                          <span>{review.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}

          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full border-2 border-slate-900 transition-all cursor-pointer ${
                  startIndex === idx 
                    ? 'bg-sky-500 scale-125' 
                    : 'bg-white'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
