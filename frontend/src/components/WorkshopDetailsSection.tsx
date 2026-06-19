import { SectionHeading } from './SectionHeading'
import type { WorkshopInfo } from '../types/workshop'

type WorkshopDetailsSectionProps = {
  workshop: WorkshopInfo
}

type DetailItem = {
  label: string
  value: string
  bg: string
  accent: string
  description: string
  svg: React.ReactNode
}

const detailItems = (workshop: WorkshopInfo): DetailItem[] => [
  {
    label: 'Age Group',
    value: workshop.ageGroup,
    bg: 'var(--clr-green-light)',
    accent: 'var(--clr-green)',
    description: 'Curriculum customized for early coding and logical thinking skills.',
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Duration',
    value: workshop.duration,
    bg: 'var(--clr-sky-light)',
    accent: 'var(--clr-sky)',
    description: 'Structured weekly sessions with fun hands-on labs & mini-projects.',
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Mode',
    value: workshop.mode,
    bg: 'var(--clr-yellow-light)',
    accent: 'var(--clr-yellow)',
    description: 'Interactive online classes hosted in a safe learning environment.',
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: 'Fee',
    value: workshop.fee,
    bg: 'var(--clr-pink-light)',
    accent: 'var(--clr-pink)',
    description: 'Transparent pricing with all online tools and resources included.',
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Start Date',
    value: workshop.startDate,
    bg: 'var(--clr-purple-light)',
    accent: 'var(--clr-purple)',
    description: 'Pre-register today to secure a spot for the Summer batch.',
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 22 12 17 22 22 12 2" />
      </svg>
    ),
  },
]

export function WorkshopDetailsSection({ workshop }: WorkshopDetailsSectionProps) {
  const items = detailItems(workshop)

  return (
    <section
      className="section-padding-playful"
      style={{
        background: 'var(--clr-white)',
        borderBottom: '4px solid var(--clr-border)',
      }}
    >
      <div className="section-container">
        {/* Playful Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <SectionHeading
            eyebrow="Quick Info"
            title="Everything You Need to Know"
            description="Our program is structured to feel like play, but teach real logic. Here is the blueprint for our AI & Robotics Summer camp."
          />
        </div>

        {/* Playful Grid */}
        <div
          className="details-grid"
          style={{ display: 'grid', gap: '1.5rem' }}
        >
          {items.map((item, idx) => (
            <article
              key={item.label}
              className={`playful-card reveal reveal-delay-${idx + 1}`}
              style={{
                background: item.bg,
                padding: '1.75rem',
                borderWidth: '3px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
              }}
            >
              <div>
                {/* SVG Icon Box */}
                <div
                  style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: 'var(--r-sm)',
                    border: '3px solid var(--clr-border)',
                    background: 'var(--clr-white)',
                    color: 'var(--clr-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    boxShadow: '3px 3px 0px 0px var(--clr-border)',
                  }}
                >
                  {item.svg}
                </div>

                {/* Info Text */}
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    color: 'var(--clr-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </span>

                <h3
                  style={{
                    marginTop: '0.25rem',
                    fontSize: '1.625rem',
                    fontWeight: 900,
                    color: 'var(--clr-ink)',
                  }}
                >
                  {item.value}
                </h3>
              </div>

              <p
                style={{
                  marginTop: '1rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: 'var(--clr-muted)',
                }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .details-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .details-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .details-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1200px) {
          .details-grid { grid-template-columns: repeat(5, 1fr); }
        }
      `}</style>
    </section>
  )
}
