import type { WorkshopInfo } from '../types/workshop'

type HeroSectionProps = {
  workshop: WorkshopInfo
}

const heroStats = [
  {
    label: 'Live Mentor-led Sessions',
    color: 'var(--clr-brand)',
    bg: 'var(--clr-brand-light)',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    label: 'Project-Based Learning',
    color: 'var(--clr-purple)',
    bg: 'var(--clr-purple-light)',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  {
    label: 'Completion Certificate',
    color: 'var(--clr-green)',
    bg: 'var(--clr-green-light)',
    svg: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    )
  },
]

const miniCards = [
  {
    bg: 'var(--clr-white)',
    textColor: 'var(--clr-muted)',
    valueColor: 'var(--clr-ink)',
    borderColor: 'var(--clr-border)',
    label: 'Age Group',
    valueKey: 'ageGroup' as keyof WorkshopInfo,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--clr-brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    bg: 'var(--clr-white)',
    textColor: 'var(--clr-muted)',
    valueColor: 'var(--clr-ink)',
    borderColor: 'var(--clr-border)',
    label: 'Format',
    valueKey: 'mode' as keyof WorkshopInfo,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--clr-sky)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    bg: 'var(--clr-white)',
    textColor: 'var(--clr-muted)',
    valueColor: 'var(--clr-ink)',
    borderColor: 'var(--clr-border)',
    label: 'Duration',
    valueKey: 'duration' as keyof WorkshopInfo,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--clr-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    bg: 'var(--clr-white)',
    textColor: 'var(--clr-muted)',
    valueColor: 'var(--clr-ink)',
    borderColor: 'var(--clr-border)',
    label: 'Workshop Fee',
    valueKey: 'fee' as keyof WorkshopInfo,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--clr-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    )
  },
]

export function HeroSection({ workshop }: HeroSectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '3.5rem',
        paddingBottom: '5.5rem',
        background: 'var(--grad-hero)',
        borderBottom: '4px solid var(--clr-border)',
      }}
    >
      {/* Decorative bouncy vector blobs */}
      <div
        className="blob blob-orange float-animation"
        style={{ width: '30rem', height: '30rem', top: '-8rem', left: '-8rem' }}
      />
      <div
        className="blob blob-sky float-animation-delayed"
        style={{ width: '28rem', height: '28rem', top: '10rem', right: '-10rem' }}
      />

      {/* Playful background grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(30, 37, 48, 0.04) 2px, transparent 2px)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(180deg, white, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, white, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Side: Call to action */}
          <div>
            {/* Playful Pill badge */}
            <span
              className="badge-pill"
              style={{
                background: 'var(--clr-yellow-light)',
                border: '3px solid var(--clr-border)',
                color: 'var(--clr-ink)',
                boxShadow: '2px 2px 0px 0px var(--clr-border)',
                fontWeight: 800,
                fontSize: '0.875rem',
              }}
            >
              <span className="badge-dot" style={{ backgroundColor: 'var(--clr-brand)' }} />
              SUMMER 2026 WORKSHOP
            </span>

            {/* Main Headline */}
            <h1
              style={{
                marginTop: '1.5rem',
                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                lineHeight: 1.05,
                maxWidth: '15ch',
              }}
            >
              {workshop.title.split(' ').map((word, idx, arr) => {
                const isHighlight = idx >= arr.length - 2
                return (
                  <span
                    key={idx}
                    className={isHighlight ? 'gradient-text-playful' : ''}
                    style={{ display: 'inline-block', marginRight: '0.35em' }}
                  >
                    {word}
                  </span>
                )
              })}
            </h1>

            {/* Friendly Subtitle */}
            <p
              style={{
                marginTop: '1.5rem',
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.6,
                color: 'var(--clr-muted)',
                maxWidth: '44ch',
              }}
            >
              {workshop.subtitle}
            </p>

            {/* Description */}
            <p
              style={{
                marginTop: '1rem',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--clr-subtle)',
                maxWidth: '50ch',
              }}
            >
              {workshop.description}
            </p>

            {/* Playful Buttons */}
            <div
              style={{
                marginTop: '2.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              <a
                id="hero-enroll-btn"
                href="#registration"
                className="btn-playful btn-playful-orange wiggle-hover"
                style={{ textTransform: 'uppercase' }}
              >
                Enroll Now
              </a>
              <span
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--clr-muted)',
                }}
              >
                Starts {workshop.startDate} · Seats filling fast!
              </span>
            </div>

            {/* Stat Badges */}
            <div
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    border: '3px solid var(--clr-border)',
                    background: 'var(--clr-white)',
                    boxShadow: '2px 2px 0px 0px var(--clr-border)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                  }}
                  className="bouncy-hover"
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '1.75rem',
                      height: '1.75rem',
                      borderRadius: '50%',
                      background: stat.bg,
                      color: stat.color,
                    }}
                  >
                    {stat.svg}
                  </span>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Showcase info card */}
          <div style={{ position: 'relative' }}>
            {/* Fun background circle decoration */}
            <div
              style={{
                position: 'absolute',
                width: '18rem',
                height: '18rem',
                borderRadius: '50%',
                background: 'var(--clr-yellow-light)',
                top: '-2rem',
                left: '-2rem',
                zIndex: -1,
                border: '3px dashed var(--clr-border)',
                animation: 'spin 40s linear infinite',
              }}
            />

            <div className="playful-card" style={{ padding: '2rem', borderWidth: '4px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                }}
              >
                {miniCards.map((card) => (
                  <div
                    key={card.label}
                    style={{
                      borderRadius: 'var(--r-md)',
                      padding: '1.25rem',
                      background: card.bg,
                      border: `3px solid ${card.borderColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '120px',
                    }}
                    className="bouncy-hover"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: card.textColor }}>
                        {card.label.toUpperCase()}
                      </span>
                      {card.icon}
                    </div>
                    <p
                      style={{
                        marginTop: '0.75rem',
                        fontSize: '1.375rem',
                        fontWeight: 900,
                        color: card.valueColor,
                      }}
                    >
                      {workshop[card.valueKey]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Banner */}
              <div
                style={{
                  marginTop: '1rem',
                  borderRadius: 'var(--r-md)',
                  padding: '1.25rem',
                  background: 'var(--clr-sky-light)',
                  border: '3px solid var(--clr-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--clr-muted)' }}>
                    BATCH STARTING
                  </p>
                  <p
                    style={{
                      fontSize: '1.625rem',
                      fontWeight: 900,
                      color: 'var(--clr-ink)',
                    }}
                  >
                    {workshop.startDate}
                  </p>
                </div>
                <div
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--clr-yellow)',
                    border: '3px solid var(--clr-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '3px 3px 0 0 var(--clr-border)',
                  }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
              </div>

              {/* Safety notice */}
              <p
                style={{
                  marginTop: '1.25rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--clr-muted)',
                }}
              >
                100% Kid-Safe & Verified by Parents
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
