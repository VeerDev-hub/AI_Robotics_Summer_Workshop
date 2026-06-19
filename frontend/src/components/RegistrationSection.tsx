import { useState, useEffect } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { SectionHeading } from './SectionHeading'
import type { EnquiryFormData, WorkshopInfo } from '../types/workshop'

type RegistrationSectionProps = {
  workshop: WorkshopInfo
  discountCode?: string
  prefillName?: string
  prefillEmail?: string
}

type FormErrors = Partial<Record<keyof EnquiryFormData, string>>
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const initialForm: EnquiryFormData = {
  name: '',
  email: '',
  phone: '',
  discountCode: '',
}

const countryCodes = [
  { code: '+91', country: 'IN' },
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+971', country: 'AE' },
  { code: '+65', country: 'SG' },
  { code: '+61', country: 'AU' },
]

function validateForm(form: EnquiryFormData): FormErrors {
  const errors: FormErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Full name is required.'
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^\d{8,11}$/.test(form.phone)) {
    errors.phone = 'Enter a valid phone number (8 to 11 digits).'
  }

  return errors
}

type FieldProps = {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}

function FormField({ id, label, error, children }: FieldProps) {
  return (
    <div style={{ display: 'grid', gap: '0.4rem' }}>
      <label
        htmlFor={id}
        style={{
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: 'var(--clr-ink)',
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          role="alert"
          style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--clr-pink)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
    </div>
  )
}

export function RegistrationSection({
  workshop,
  discountCode,
  prefillName,
  prefillEmail,
}: RegistrationSectionProps) {
  const [form, setForm] = useState<EnquiryFormData>(initialForm)
  const [countryCode, setCountryCode] = useState('+91')
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [serverMessage, setServerMessage] = useState('')

  useEffect(() => {
    if (discountCode) {
      setForm((prev) => ({ ...prev, discountCode }))
    }
  }, [discountCode])

  useEffect(() => {
    if (prefillName) {
      setForm((prev) => ({ ...prev, name: prefillName }))
    }
  }, [prefillName])

  useEffect(() => {
    if (prefillEmail) {
      setForm((prev) => ({ ...prev, email: prefillEmail }))
    }
  }, [prefillEmail])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const cleaned = name === 'phone' ? value.replace(/\D/g, '') : (name === 'discountCode' ? value.toUpperCase() : value)
    setForm((prev) => ({ ...prev, [name]: cleaned }))
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const validationErrors = validateForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setStatus('loading')
    setServerMessage('')

    const payloadPhone = `${countryCode}${form.phone}`

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: payloadPhone,
          discountCode: form.discountCode,
        }),
      })

      const payload = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(payload.message ?? 'Something went wrong. Please try again.')
      }

      setForm(initialForm)
      setErrors({})
      setStatus('success')
      setServerMessage(payload.message ?? 'Your enquiry has been submitted successfully!')
    } catch (err) {
      setStatus('error')
      setServerMessage(
        err instanceof Error ? err.message : 'Failed to submit. Please try again.'
      )
    }
  }

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  return (
    <section
      id="registration"
      className="section-padding-playful"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--clr-brand-light) 0%, var(--clr-surface) 50%, var(--clr-sky-light) 100%)',
        borderBottom: '4px solid var(--clr-border)',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Playful background shape blobs */}
      <div
        className="blob blob-orange"
        style={{
          width: '20rem',
          height: '20rem',
          top: '-4rem',
          right: '-4rem',
          opacity: 0.3,
        }}
      />
      <div
        className="blob blob-sky"
        style={{
          width: '16rem',
          height: '16rem',
          bottom: '-3rem',
          left: '-3rem',
          opacity: 0.2,
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="reg-layout"
          style={{ display: 'grid', gap: '2rem', alignItems: 'start' }}
        >
          {/* Left Block: Heading & snapshot */}
          <div className="reveal">
            <SectionHeading
              eyebrow="Register"
              title="Reserve Your Child's Seat Today"
              description="Share your details and we will verify available slots and share the final enrollment schedule."
            />

            {/* Program Snapshot Card */}
            <div
              className="playful-card"
              style={{
                marginTop: '1.5rem',
                background: 'var(--clr-section-dark)',
                color: '#ffffff',
                padding: '1.5rem',
                borderWidth: '4px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Fredoka, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--clr-yellow)',
                  marginBottom: '1rem',
                }}
              >
                Workshop Blueprint
              </p>

              <ul style={{ display: 'grid', gap: '0.75rem', listStyle: 'none' }}>
                {[
                  {
                    label: workshop.title,
                    svg: (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polygon points="12 2 2 22 12 17 22 22 12 2" />
                      </svg>
                    )
                  },
                  {
                    label: `Format: ${workshop.mode}`,
                    svg: (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    )
                  },
                  {
                    label: `Duration: ${workshop.duration}`,
                    svg: (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )
                  },
                  {
                    label: `Fee: ${workshop.fee}`,
                    svg: (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <line x1="12" y1="4" x2="12" y2="20" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                    )
                  },
                  {
                    label: `Starts: ${workshop.startDate}`,
                    svg: (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                      </svg>
                    )
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    <span
                      style={{
                        width: '1.75rem',
                        height: '1.75rem',
                        borderRadius: '0.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--clr-yellow)',
                        flexShrink: 0,
                      }}
                    >
                      {item.svg}
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>

              {/* Safety Badges */}
              <div
                style={{
                  marginTop: '1.25rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {['Safe & Certified', 'Secure Payment', 'Flexible Schedule'].map((text, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: Playful Form */}
          <div className="reveal reveal-delay-2">
            <div
              className="playful-card"
              style={{
                padding: '2rem',
                borderWidth: '4px',
              }}
            >
              {isSuccess ? (
                /* Success Interface */
                <div
                  style={{
                    textAlign: 'center',
                    padding: '1.5rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    className="success-icon"
                    style={{
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '50%',
                      background: 'var(--clr-green)',
                      color: 'var(--clr-white)',
                      border: '3px solid var(--clr-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '3px 3px 0px 0px var(--clr-border)',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>
                    Yay! Submitted!
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--clr-muted)',
                      lineHeight: 1.5,
                      maxWidth: '30ch',
                    }}
                  >
                    {serverMessage}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-playful btn-playful-white"
                    style={{ marginTop: '0.5rem', padding: '0.4rem 1.25rem', fontSize: '0.875rem' }}
                  >
                    Go Back
                  </button>
                </div>
              ) : (
                /* Form Interface */
                <form
                  id="enquiry-form"
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: 'grid', gap: '1rem' }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.375rem', fontWeight: 900 }}>
                      Enquiry Form
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--clr-muted)', marginTop: '0.15rem', fontWeight: 600 }}>
                      All slots are reserved in order of form submission.
                    </p>
                  </div>

                  <FormField id="name" label="Parent's Full Name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      className={`form-input-playful${errors.name ? ' error' : ''}`}
                      placeholder="Enter parent / guardian name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </FormField>

                  <FormField id="email" label="Email Address" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-input-playful${errors.email ? ' error' : ''}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </FormField>

                  <FormField id="phone" label="Phone Number" error={errors.phone}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <select
                        aria-label="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="form-select-playful"
                        style={{ flexShrink: 0 }}
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.country} ({c.code})
                          </option>
                        ))}
                      </select>
                      <input
                        id="phone"
                        name="phone"
                        inputMode="numeric"
                        maxLength={11}
                        className={`form-input-playful${errors.phone ? ' error' : ''}`}
                        placeholder="Mobile number"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        style={{ flexGrow: 1 }}
                      />
                    </div>
                  </FormField>

                  <FormField id="discountCode" label="Discount Code (Optional)">
                    <div style={{ position: 'relative' }}>
                      <input
                        id="discountCode"
                        name="discountCode"
                        className="form-input-playful"
                        placeholder="Discount Code"
                        value={form.discountCode || ''}
                        onChange={handleChange}
                        style={{
                          textTransform: 'uppercase',
                          background: form.discountCode ? 'var(--clr-yellow-light)' : 'var(--clr-white)',
                          borderColor: form.discountCode ? 'var(--clr-yellow)' : 'var(--clr-border)',
                        }}
                      />
                      {form.discountCode && (
                        <span
                          style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            color: 'var(--clr-brand)',
                            background: 'var(--clr-white)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            border: '1.5px solid var(--clr-border)',
                          }}
                        >
                          APPLIED!
                        </span>
                      )}
                    </div>
                  </FormField>

                  {/* Server errors banner */}
                  {status === 'error' && serverMessage && (
                    <div
                      role="alert"
                      style={{
                        padding: '0.75rem',
                        borderRadius: 'var(--r-sm)',
                        background: 'var(--clr-pink-light)',
                        border: '3px solid var(--clr-pink)',
                        fontSize: '0.875rem',
                        color: 'var(--clr-pink)',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {serverMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    id="submit-enquiry-btn"
                    className="btn-playful btn-playful-orange wiggle-hover"
                    disabled={isLoading}
                    style={{ width: '100%', padding: '0.875rem', textTransform: 'uppercase' }}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>

                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--clr-subtle)',
                      textAlign: 'center',
                      lineHeight: 1.4,
                      fontWeight: 600,
                    }}
                  >
                    Your privacy is important. We only send relevant workshop information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reg-layout {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .reg-layout { grid-template-columns: 0.95fr 1.05fr; }
        }
      `}</style>
    </section>
  )
}
