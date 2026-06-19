import { useState } from 'react'

type NavbarProps = {
  isDark: boolean
  onToggleTheme: () => void
}

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleLinkClick() {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { label: 'Play Game', href: '#play' },
    { label: 'Details', href: '#details' },
    { label: 'Outcomes', href: '#outcomes' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <header className="navbar-playful" style={{ position: 'relative' }}>
      {/* Logo */}
      <a href="/" className="nav-logo-playful" aria-label="Kidrove home">
        <div className="nav-logo-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ffffff" strokeWidth="3">
            <polygon points="12 2 2 22 12 17 22 22 12 2" />
          </svg>
        </div>
        <span style={{ color: 'var(--clr-ink)', fontWeight: 900 }}>kid</span>
        <span style={{ color: 'var(--clr-brand)', fontWeight: 900 }}>rove</span>
      </a>

      {/* Desktop Links (Hidden on mobile via .desktop-nav style) */}
      <nav
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="nav-link-playful"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right Controls: theme toggle, enroll button, hamburger toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.50rem',
        }}
      >
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="theme-toggle-btn"
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDark ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Enroll Button (Desktop only) */}
        <a
          href="#registration"
          className="btn-playful btn-playful-orange desktop-nav"
          style={{
            padding: '0.4rem 1rem',
            fontSize: '0.8125rem',
            borderWidth: '2.5px',
            boxShadow: '2.5px 2.5px 0 0 var(--clr-border)',
            textTransform: 'uppercase',
          }}
        >
          Enroll Now
        </a>

        {/* Mobile Hamburger toggle button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="menu-toggle-btn"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer menu list */}
      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={handleLinkClick}
            className="nav-link-playful"
            style={{ padding: '0.5rem 0', fontSize: '1.0625rem' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#registration"
          onClick={handleLinkClick}
          className="btn-playful btn-playful-orange"
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem',
            fontSize: '0.9375rem',
            borderWidth: '2.5px',
            boxShadow: '2.5px 2.5px 0 0 var(--clr-border)',
            textTransform: 'uppercase',
            width: '100%',
          }}
        >
          Enroll Now
        </a>
      </div>
    </header>
  )
}
