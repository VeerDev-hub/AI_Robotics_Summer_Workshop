export function ImpactSection() {
  const stats = [
    {
      id: 'partners',
      number: '6+',
      label: 'Trusted by over 6+',
      sublabel: 'partners since 2017',
      // Playful star icon
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem', color: 'var(--clr-brand)' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      bg: 'var(--clr-yellow-light)',
    },
    {
      id: 'experiences',
      number: '157+',
      label: 'Experiences',
      sublabel: 'Available year-round',
      // Target/Dart icon
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem', color: 'var(--clr-pink)' }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      bg: 'var(--clr-pink-light)',
    },
    {
      id: 'venues',
      number: '123+',
      label: 'Venue & Events',
      sublabel: 'Across Dubai & Abu Dhabi',
      // School/Building icon
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem', color: 'var(--clr-sky)' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      bg: 'var(--clr-sky-light)',
    },
    {
      id: 'classes',
      number: '157+',
      label: 'Classes',
      sublabel: 'Tech, STEM & Robotics',
      // Graduation cap icon
      icon: (
        <svg style={{ width: '2.5rem', height: '2.5rem', color: 'var(--clr-purple)' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14V20" />
        </svg>
      ),
      bg: 'var(--clr-purple-light)',
    },
  ]

  return (
    <section className="section-padding-playful" style={{ backgroundColor: 'var(--clr-surface)', borderBottom: '4px solid var(--clr-border)' }}>
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span 
            style={{ 
              display: 'inline-block',
              padding: '0.375rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.75rem',
              backgroundColor: 'var(--clr-brand-light)', 
              color: 'var(--clr-brand)',
              border: '2px solid var(--clr-border)'
            }}
          >
            Our Impact
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--clr-ink)', letterSpacing: '-0.02em' }}>
            Trusted by families across UAE
          </h2>
          <p style={{ maxWidth: '42rem', margin: '0 auto', fontSize: '0.9375rem', color: 'var(--clr-muted)', fontWeight: 600 }}>
            Helping parents discover and book the best activities for their children since 2017
          </p>
        </div>

        {/* Stats Grid */}
        <div className="impact-grid" style={{ display: 'grid', gap: '1.5rem' }}>
          {stats.map((stat, idx) => (
            <div 
              key={stat.id}
              className={`playful-card reveal reveal-delay-${(idx % 3) + 1}`}
              style={{ 
                backgroundColor: 'var(--clr-white)',
                padding: '1.75rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: '3px'
              }}
            >
              {/* Circular Icon Container */}
              <div 
                style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  borderRadius: '50%', 
                  marginBottom: '1.25rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: '3px solid var(--clr-border)', 
                  boxShadow: '2px 2px 0 0 var(--clr-border)',
                  backgroundColor: stat.bg
                }}
              >
                {stat.icon}
              </div>

              {/* Stat text */}
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--clr-ink)', marginBottom: '0.25rem' }}>
                {stat.number}
              </h3>
              <p style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--clr-ink)' }}>
                {stat.label}
              </p>
              {stat.sublabel && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--clr-muted)', marginTop: '0.25rem', fontWeight: 600 }}>
                  {stat.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .impact-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .impact-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .impact-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  )
}
