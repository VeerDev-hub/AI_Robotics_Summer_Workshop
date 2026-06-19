export function ImpactSection() {
  const stats = [
    {
      id: 'partners',
      number: '6+',
      label: 'Trusted by over 6+',
      sublabel: 'partners since 2017',
      // Playful star icon
      icon: (
        <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
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
        <svg className="w-10 h-10 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
        <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14V20" />
        </svg>
      ),
      bg: 'var(--clr-purple-light)',
    },
  ]

  return (
    <section className="section-padding-playful" style={{ backgroundColor: 'var(--clr-surface)' }}>
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Heading */}
        <div className="text-center mb-10 reveal">
          <span 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
            style={{ 
              backgroundColor: 'var(--clr-brand-light)', 
              color: 'var(--clr-brand)',
              border: '2px solid var(--clr-border)'
            }}
          >
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Trusted by families across UAE
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-muted font-medium">
            Helping parents discover and book the best activities for their children since 2017
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={stat.id}
              className={`playful-card p-6 text-center reveal reveal-delay-${(idx % 3) + 1}`}
              style={{ backgroundColor: 'var(--clr-white)' }}
            >
              {/* Circular Icon Container */}
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-slate-900 shadow-sm"
                style={{ backgroundColor: stat.bg }}
              >
                {stat.icon}
              </div>

              {/* Stat text */}
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-1" style={{ color: 'var(--clr-ink)' }}>
                {stat.number}
              </h3>
              <p className="font-bold text-sm text-slate-700" style={{ color: 'var(--clr-ink)' }}>
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="text-xs text-muted mt-1 font-medium">
                  {stat.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
