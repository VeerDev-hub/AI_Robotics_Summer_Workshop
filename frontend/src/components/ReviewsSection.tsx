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
      className="section-padding-playful relative" 
      style={{ 
        backgroundColor: '#fbfbfb',
        borderTop: '3px solid var(--clr-border)',
        borderBottom: '3px solid var(--clr-border)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background vectors */}
      <div 
        style={{
          position: 'absolute',
          left: '-50px',
          bottom: '-20px',
          width: '12rem',
          height: '12rem',
          opacity: 0.1,
          pointerEvents: 'none',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--clr-pink) 20%, transparent 60%)'
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--clr-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            Our customers love it! 
            <span 
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: 'var(--clr-yellow-light)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                border: '2px solid var(--clr-border)',
                fontSize: '1.25rem',
                fontWeight: 900,
                color: 'var(--clr-ink)'
              }}
            >
              ⭐ 4.7/5
            </span>
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--clr-muted)', fontWeight: 700 }}>
            100,000 reviews to help you choose
          </p>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="reviews-carousel-container" style={{ position: 'relative' }}>
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            aria-label="Previous review"
            className="carousel-arrow-btn"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '50%',
              border: '3px solid var(--clr-border)',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-brutal-sm)',
              cursor: 'pointer',
              zIndex: 30,
              transition: 'transform 0.1s ease'
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--clr-ink)' }} fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            aria-label="Next review"
            className="carousel-arrow-btn"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '50%',
              border: '3px solid var(--clr-border)',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-brutal-sm)',
              cursor: 'pointer',
              zIndex: 30,
              transition: 'transform 0.1s ease'
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--clr-ink)' }} fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="reviews-grid" style={{ display: 'grid', gap: '1.5rem' }}>
            
            {visibleReviews.map((review, index) => {
              // Set conditional display classes based on column slot index
              let cardClass = "playful-card"
              if (index === 1) cardClass += " review-card-tablet-desktop"
              if (index === 2) cardClass += " review-card-desktop"

              return (
                <div 
                  key={`${review.id}-${index}`}
                  className={cardClass}
                  style={{ 
                    backgroundColor: 'var(--clr-white)',
                    padding: '1.75rem',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    minHeight: '18rem',
                    position: 'relative',
                    borderWidth: '3px',
                  }}
                >
                  {/* Quote decoration */}
                  <span style={{ position: 'absolute', top: '0.25rem', left: '1.25rem', fontSize: '3.75rem', fontFamily: 'serif', color: 'rgba(217, 119, 6, 0.12)', userSelect: 'none', pointerEvents: 'none' }}>
                    “
                  </span>

                  {/* Verified Badge */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
                    <span 
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.125rem 0.625rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        backgroundColor: 'var(--clr-green-light)',
                        color: 'var(--clr-green)',
                        border: '1.5px solid var(--clr-border)'
                      }}
                    >
                      <span style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                      Verified
                    </span>
                  </div>

                  {/* Review Content */}
                  <div style={{ marginBottom: '1.5rem', zIndex: 10, flexGrow: 1 }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--clr-brand)', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                      {review.venue}
                    </h4>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-ink)', lineHeight: '1.5' }}>
                      {review.text}
                    </p>
                  </div>

                  {/* Divider line */}
                  <div style={{ borderTop: '2px dashed var(--clr-border-light)', margin: '0.75rem 0' }}></div>

                  {/* Reviewer Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div 
                      style={{ 
                        width: '2.5rem', 
                        height: '2.5rem', 
                        borderRadius: '50%', 
                        border: '2px solid var(--clr-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 900,
                        fontSize: '0.875rem',
                        color: 'var(--clr-ink)',
                        backgroundColor: review.avatarColor
                      }}
                    >
                      {review.avatarLetter}
                    </div>
                    
                    <div style={{ flexGrow: 1 }}>
                      <p style={{ fontSize: '0.8125rem', fontWeight: 900, color: 'var(--clr-ink)' }}>
                        {review.author}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--clr-subtle)', fontWeight: 700 }}>{review.timeAgo}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', fontSize: '0.75rem', fontWeight: 800, color: '#eab308' }}>
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
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  borderRadius: '50%',
                  border: '2px solid var(--clr-border)',
                  backgroundColor: startIndex === idx ? 'var(--clr-sky)' : '#ffffff',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                  transform: startIndex === idx ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .reviews-carousel-container {
          padding: 0;
        }
        .carousel-arrow-btn:first-of-type {
          left: 0.5rem;
        }
        .carousel-arrow-btn:last-of-type {
          right: 0.5rem;
        }
        .reviews-grid {
          grid-template-columns: 1fr;
        }
        .review-card-tablet-desktop {
          display: none;
        }
        .review-card-desktop {
          display: none;
        }

        @media (min-width: 768px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr); }
          .review-card-tablet-desktop { display: flex !important; }
        }

        @media (min-width: 1024px) {
          .reviews-carousel-container {
            padding: 0 3.5rem;
          }
          .carousel-arrow-btn:first-of-type {
            left: 0;
          }
          .carousel-arrow-btn:last-of-type {
            right: 0;
          }
          .reviews-grid { grid-template-columns: repeat(3, 1fr); }
          .review-card-desktop { display: flex !important; }
        }
      `}</style>
    </section>
  )
}
