import { SectionHeading } from './SectionHeading'

type LearningOutcomesSectionProps = {
  outcomes: string[]
}

const outcomeSvgs = [
  // Brain
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
  </svg>,
  // Robot
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8.01" y2="16" />
    <line x1="16" y1="16" x2="16.01" y2="16" />
  </svg>,
  // Code Blocks
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>,
  // Lightbulb
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
  </svg>,
  // Target/Bullseye
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  // Rocket
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
    <path d="M12 2C7.5 2 4 8 4 13c0 2 1 3 3 3s3-1 3-1l5-5c1.5-1.5 1.5-3.5 0-5s-3.5-1.5-5 0l-5 5c0 0-1 1-1 3s1 3 3 3c5 0 11-3.5 11-11c0-2.25-1.75-4-4-4z" />
  </svg>
]

const outcomeColors = [
  { accent: 'var(--clr-brand)', light: 'var(--clr-brand-light)' },
  { accent: 'var(--clr-sky)', light: 'var(--clr-sky-light)' },
  { accent: 'var(--clr-purple)', light: 'var(--clr-purple-light)' },
  { accent: 'var(--clr-green)', light: 'var(--clr-green-light)' },
  { accent: 'var(--clr-pink)', light: 'var(--clr-pink-light)' },
  { accent: 'var(--clr-yellow)', light: 'var(--clr-yellow-light)' },
]

export function LearningOutcomesSection({ outcomes }: LearningOutcomesSectionProps) {
  return (
    <section
      className="section-padding-playful"
      style={{
        background: 'var(--clr-section-dark)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '4px solid var(--clr-border)',
      }}
    >
      {/* Playful background doodles & rings */}
      <div
        style={{
          position: 'absolute',
          width: '50rem',
          height: '50rem',
          borderRadius: '50%',
          border: '4px dashed rgba(255, 255, 255, 0.05)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeading
          eyebrow="Learning Goals"
          title="What Your Child Will Master"
          description="By building creative mini-projects every week, kids learn structural design patterns that last a lifetime."
          theme="dark"
        />

        <div
          className="outcomes-grid"
          style={{ display: 'grid', gap: '1.5rem', marginTop: '3.5rem' }}
        >
          {outcomes.map((outcome, index) => {
            const colors = outcomeColors[index % outcomeColors.length]
            const svgIcon = outcomeSvgs[index % outcomeSvgs.length]

            return (
              <article
                key={outcome}
                className={`outcome-card reveal reveal-delay-${(index % 4) + 1}`}
                style={{
                  border: '3px solid var(--clr-border)',
                  background: 'var(--clr-outcome-card)',
                  color: 'var(--clr-outcome-text)',
                  boxShadow: '4px 4px 0px 0px var(--clr-outcome-shadow)',
                }}
              >
                {/* Visual marker header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Fredoka, sans-serif',
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: colors.accent,
                      opacity: 0.9,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: 'var(--r-sm)',
                      background: colors.light,
                      border: '3px solid var(--clr-border)',
                      color: colors.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '2px 2px 0 0 var(--clr-border)',
                    }}
                  >
                    {svgIcon}
                  </div>
                </div>

                {/* Body copy */}
                <p
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    lineHeight: 1.5,
                    color: 'var(--clr-ink)',
                  }}
                >
                  {outcome}
                </p>
              </article>
            )
          })}
        </div>
      </div>

      <style>{`
        .outcomes-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .outcomes-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .outcomes-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  )
}
