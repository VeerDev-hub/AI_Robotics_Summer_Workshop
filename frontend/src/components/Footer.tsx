import { useState } from 'react'

export function Footer() {
  const year = new Date().getFullYear()

  // Form states
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [childrenAge, setChildrenAge] = useState('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) {
      setStatus('error')
      setMessage('Name and Email are required.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, city, childrenAge }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Subscription failed.')
      }

      setStatus('success')
      setMessage(data.message)
      // Reset form
      setEmail('')
      setName('')
      setCity('')
      setChildrenAge('')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--clr-white)',
        borderTop: '4px solid var(--clr-border)',
        color: 'var(--clr-ink)',
        padding: '3.5rem 0 2rem 0',
        transition: 'background-color 0.3s ease, border-color 0.3s ease'
      }}
    >
      <div className="section-container" style={{ textAlign: 'left' }}>
        
        {/* Columns Grid */}
        <div className="footer-grid" style={{ display: 'grid', gap: '2.5rem' }}>
          
          {/* Column 1: Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'Fredoka, sans-serif' }}>
              kid<span style={{ color: 'var(--clr-brand)' }}>rove</span>
            </h3>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--clr-muted)', lineHeight: '1.5', maxWidth: '18rem' }}>
              Discover and book the best activities for your kids in the UAE.
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', paddingTop: '0.5rem' }}>
              {[
                {
                  name: 'Facebook',
                  icon: (
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6c0-.88.72-1 1-1h1V2h-3C9.3 2 9 3.56 9 5.5V8z" />
                    </svg>
                  ),
                  link: '#'
                },
                {
                  name: 'Twitter',
                  icon: (
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.95 4.57a10 10 0 01-2.82.78 4.96 4.96 0 002.16-2.72c-.95.55-2 .95-3.12 1.18a4.92 4.92 0 00-8.38 4.48A14 14 0 011.64 3.16 4.9 4.9 0 003.16 9.7a4.9 4.9 0 01-2.22-.61v.06a4.92 4.92 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.9 9.9 0 010 19.54a13.9 13.9 0 007.55 2.21c9.05 0 14-7.5 14-14v-.64a10 10 0 002.4-2.54l-.05.02z" />
                    </svg>
                  ),
                  link: '#'
                },
                {
                  name: 'Instagram',
                  icon: (
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42a4.9 4.9 0 011.8 1.18 4.9 4.9 0 011.18 1.8c.17.43.37 1.05.42 2.22.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22a4.9 4.9 0 01-1.18 1.8 4.9 4.9 0 01-1.8 1.18c-.43.17-1.05.37-2.22.42-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42a4.9 4.9 0 01-1.18-1.8 4.9 4.9 0 01-1.8-1.18c-.17-.43-.37-1.05-.42-2.22C2.18 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22a4.9 4.9 0 011.18-1.8 4.9 4.9 0 011.8-1.18c.43-.17 1.05-.37 2.22-.42 1.27-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.92.56a7.07 7.07 0 00-2.55 1.66A7.07 7.07 0 00.9 4.85C.6 5.62.4 6.5.34 7.77.28 9.05.28 9.46.28 12.72s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92a7.07 7.07 0 001.66 2.55 7.07 7.07 0 002.55 1.66c.77.3 1.64.5 2.92.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56a7.07 7.07 0 002.55-1.66 7.07 7.07 0 001.66-2.55c.3-.77.5-1.64.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92a7.07 7.07 0 00-1.66-2.55 7.07 7.07 0 00-2.55-1.66c-.77-.3-1.64-.5-2.92-.56C17.15.01 16.74 0 13.48 0H12v.16z" />
                      <path d="M12 5.83a6.17 6.17 0 100 12.34 6.17 6.17 0 000-12.34zm0 10.18a4 4 0 110-8 4 4 0 010 8z" />
                      <circle cx="18.4" cy="5.6" r="1.4" />
                    </svg>
                  ),
                  link: '#'
                },
                {
                  name: 'Twitter',
                  icon: (
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.95 4.57a10 10 0 01-2.82.78 4.96 4.96 0 002.16-2.72c-.95.55-2 .95-3.12 1.18a4.92 4.92 0 00-8.38 4.48A14 14 0 011.64 3.16 4.9 4.9 0 003.16 9.7a4.9 4.9 0 01-2.22-.61v.06a4.92 4.92 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.9 9.9 0 010 19.54a13.9 13.9 0 007.55 2.21c9.05 0 14-7.5 14-14v-.64a10 10 0 002.4-2.54l-.05.02z" />
                    </svg>
                  ),
                  link: '#'
                },
                {
                  name: 'Instagram',
                  icon: (
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42a4.9 4.9 0 011.8 1.18 4.9 4.9 0 011.18 1.8c.17.43.37 1.05.42 2.22.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22a4.9 4.9 0 01-1.18 1.8 4.9 4.9 0 01-1.8 1.18c-.43.17-1.05.37-2.22.42-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42a4.9 4.9 0 01-1.18-1.8 4.9 4.9 0 01-1.8-1.18c-.17-.43-.37-1.05-.42-2.22C2.18 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22a4.9 4.9 0 011.18-1.8 4.9 4.9 0 011.8-1.18c.43-.17 1.05-.37 2.22-.42 1.27-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.92.56a7.07 7.07 0 00-2.55 1.66A7.07 7.07 0 00.9 4.85C.6 5.62.4 6.5.34 7.77.28 9.05.28 9.46.28 12.72s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92a7.07 7.07 0 001.66 2.55 7.07 7.07 0 002.55 1.66c.77.3 1.64.5 2.92.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56a7.07 7.07 0 002.55-1.66 7.07 7.07 0 001.66-2.55c.3-.77.5-1.64.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92a7.07 7.07 0 00-1.66-2.55 7.07 7.07 0 00-2.55-1.66c-.77-.3-1.64-.5-2.92-.56C17.15.01 16.74 0 13.48 0H12v.16z" />
                      <path d="M12 5.83a6.17 6.17 0 100 12.34 6.17 6.17 0 000-12.34zm0 10.18a4 4 0 110-8 4 4 0 010 8z" />
                      <circle cx="18.4" cy="5.6" r="1.4" />
                    </svg>
                  ),
                  link: '#'
                },
                {
                  name: 'YouTube',
                  icon: (
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.5 6.25a3 3 0 00-2.1-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.55A3 3 0 00.5 6.25 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.75 3 3 0 002.1 2.1c1.85.55 9.4.55 9.4.55s7.55 0 9.4-.55a3 3 0 002.1-2.1 31.4 31.4 0 00.5-5.75 31.4 31.4 0 00-.5-5.75zM9.54 15.56V8.44L15.82 12l-6.28 3.56z" />
                    </svg>
                  ),
                  link: '#'
                },
                {
                  name: 'LinkedIn',
                  icon: (
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.27 20h-3.38v-10.86h3.38v10.86zm-1.69-12.37c-1.08 0-1.96-.88-1.96-1.97s.88-1.97 1.96-1.97 1.96.88 1.96 1.97-.88 1.97-1.96 1.97zm13.96 12.37h-3.38v-5.38c0-1.28-.03-2.93-1.79-2.93-1.79 0-2.06 1.4-2.06 2.84v5.47h-3.38v-10.86h3.24v1.48h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17v5.96z" />
                    </svg>
                  ),
                  link: '#'
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  aria-label={social.name}
                  style={{ 
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    border: '3px solid var(--clr-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e28b12',
                    color: '#ffffff',
                    boxShadow: '2px 2px 0 0 var(--clr-border)',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(-3deg)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links & Internal Groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--clr-ink)', marginBottom: '0.75rem' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>About Us</a></li>
                <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Blog</a></li>
                <li><a href="#registration" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Contact Us</a></li>
                <li><a href="#faq" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>FAQs</a></li>
                <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Partner with Us</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--clr-ink)', marginBottom: '0.75rem' }}>
                Programs
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Student Program</a></li>
                <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Partnerships</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--clr-ink)', marginBottom: '0.75rem' }}>
                Teach
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Teach as Organization</a></li>
                <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Teach as Individual</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--clr-ink)', marginBottom: '0.75rem' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Afterschool Activities</a></li>
              <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Arts and Crafts</a></li>
              <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Baby & Toddler</a></li>
              <li><a href="#" className="footer-link-hover" style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--clr-muted)' }}>Birthday Deals</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--clr-ink)' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--clr-muted)', lineHeight: '1.4' }}>
              Subscribe to our newsletter for updates on new activities and promotions.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '0.25rem' }}>
              {/* Email Field with Icon */}
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="form-input-playful"
                  style={{ 
                    paddingLeft: '2.25rem', 
                    borderRadius: '10px',
                    fontSize: '0.8125rem',
                    borderWidth: '3px'
                  }}
                />
                <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', color: 'var(--clr-subtle)' }}>
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>

              {/* Name Field */}
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="form-input-playful"
                style={{ 
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  borderWidth: '3px'
                }}
              />

              {/* City Field (Optional) */}
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (optional)"
                className="form-input-playful"
                style={{ 
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  borderWidth: '3px'
                }}
              />

              {/* Age of Children Field (Optional) */}
              <input 
                type="text" 
                value={childrenAge}
                onChange={(e) => setChildrenAge(e.target.value)}
                placeholder="Age of children (optional)"
                className="form-input-playful"
                style={{ 
                  borderRadius: '10px',
                  fontSize: '0.8125rem',
                  borderWidth: '3px'
                }}
              />

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="btn-playful"
                style={{ 
                  backgroundColor: '#f5a2be', 
                  color: '#ffffff',
                  width: '100%',
                  padding: '0.625rem',
                  fontSize: '0.8125rem',
                  borderWidth: '3px',
                  boxShadow: 'var(--shadow-brutal-sm)',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {/* Feedback/Response Message */}
            {message && (
              <p 
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.5rem',
                  border: '2px solid var(--clr-border)',
                  borderRadius: '8px',
                  margin: '0.25rem 0 0 0',
                  backgroundColor: status === 'success' ? '#e6f4ea' : '#fce8e6',
                  color: status === 'success' ? '#137333' : '#c5221f'
                }}
              >
                {message}
              </p>
            )}

            <p style={{ fontSize: '0.6875rem', color: 'var(--clr-subtle)', fontWeight: 600, lineHeight: '1.4', margin: 0 }}>
              By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
            </p>
          </div>

        </div>

        {/* Footer Bottom Divider Line */}
        <div style={{ borderTop: '2px solid var(--clr-border)', margin: '2.5rem 0 1.5rem 0', opacity: 0.8 }}></div>

        {/* Footer Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'between', gap: '1rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--clr-subtle)' }}>
          <p style={{ margin: 0, flexGrow: 1 }}>
            © {year} Kidrove. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="footer-link-hover">Privacy Policy</a>
            <a href="#" className="footer-link-hover">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 1fr;
        }
        .footer-link-hover {
          transition: color 0.2s ease;
        }
        .footer-link-hover:hover {
          color: var(--clr-brand) !important;
          text-decoration: underline;
        }

        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .footer-grid { grid-template-columns: 1.25fr 1fr 1fr 1.25fr; }
        }
      `}</style>
    </footer>
  )
}
