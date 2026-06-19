import { SectionHeading } from './SectionHeading'
import type { FaqItem } from '../types/workshop'

type FaqSectionProps = {
  faqs: FaqItem[]
}

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section
      className="section-padding-playful"
      style={{
        background: 'var(--clr-surface)',
        borderBottom: '4px solid var(--clr-border)',
      }}
    >
      <div className="section-container">
        <div
          className="faq-layout"
          style={{ display: 'grid', gap: '3.5rem', alignItems: 'start' }}
        >
          {/* Left Block: Heading + contact card */}
          <div className="faq-sticky-container">
            <SectionHeading
              eyebrow="FAQs"
              title="Questions Parents Ask"
              description="Here are the answers to the most common questions about tools, logistics, certificates, and refunds."
            />

            {/* Contact Card */}
            <div
              className="playful-card"
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'var(--clr-yellow-light)',
                borderWidth: '3px',
              }}
            >
              <h4 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--clr-brand)' }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Have other questions?
              </h4>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: 'var(--clr-muted)',
                }}
              >
                Send us an enquiry and our workshop mentors will reach out to help you!
              </p>
              <a
                href="#registration"
                className="btn-playful btn-playful-orange"
                style={{
                  marginTop: '1.25rem',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.875rem',
                  width: '100%',
                }}
              >
                Contact Us Now
              </a>
            </div>
          </div>

          {/* Right Block: Playful Accordions */}
          <div style={{ display: 'grid', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <details
                key={faq.question}
                id={`faq-${idx + 1}`}
                className={`faq-card reveal reveal-delay-${idx + 1}`}
                style={{ borderWidth: '3px' }}
              >
                <summary className="faq-card-summary">
                  <span style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                    {faq.question}
                  </span>
                  <div className="faq-card-icon-box">+</div>
                </summary>
                <p className="faq-card-body">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq-layout {
          grid-template-columns: 1fr;
        }
        .faq-sticky-container {
          position: static;
        }
        @media (min-width: 1024px) {
          .faq-layout { grid-template-columns: 0.85fr 1.15fr; }
          .faq-sticky-container {
            position: sticky;
            top: 6.5rem;
          }
        }
      `}</style>
    </section>
  )
}
