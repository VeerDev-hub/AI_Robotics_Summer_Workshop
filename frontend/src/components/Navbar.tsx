import { useState } from 'react'

type NavbarProps = {
  isDark: boolean
  onToggleTheme: () => void
  user: { username: string; email: string } | null
  onLogout: () => void
  setView: (view: 'home' | 'login' | 'signup') => void
  currentView: 'home' | 'login' | 'signup'
}

export function Navbar({
  isDark,
  onToggleTheme,
  user,
  onLogout,
  setView,
  currentView,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault()
    setView('home')
    setIsMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLinkClick(href: string, e: React.MouseEvent) {
    setIsMenuOpen(false)
    if (currentView !== 'home') {
      e.preventDefault()
      setView('home')
      // Wait for view to switch back to home before scrolling to element
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
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
      <a href="/" onClick={handleLogoClick} className="nav-logo-playful" aria-label="Kidrove home">
        <div className="nav-logo-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ffffff" strokeWidth="3">
            <polygon points="12 2 2 22 12 17 22 22 12 2" />
          </svg>
        </div>
        <span style={{ color: 'var(--clr-ink)', fontWeight: 900 }}>kid</span>
        <span style={{ color: 'var(--clr-brand)', fontWeight: 900 }}>rove</span>
      </a>

      {/* Desktop Links (Hidden on mobile via css rules) */}
      <nav className="desktop-nav">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(link.href, e)}
            className="nav-link-playful"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right Controls: theme toggle, auth states, enroll button, hamburger */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="theme-toggle-btn cursor-pointer"
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

        {/* Authentication Options (Desktop only) */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {user ? (
            <>
              {/* User greeting and logout */}
              <div 
                className="px-3.5 py-1.5 rounded-full border-2 border-slate-900 bg-amber-50 dark:bg-amber-950/20 text-xs font-black text-slate-800"
                style={{ color: 'var(--clr-ink)' }}
              >
                🤖 {user.username}
              </div>
              <button
                onClick={onLogout}
                className="btn-playful btn-playful-white"
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.75rem',
                  borderWidth: '2.5px',
                  boxShadow: '2.5px 2.5px 0 0 var(--clr-border)',
                  textTransform: 'uppercase',
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setView('login')}
                className="nav-link-playful cursor-pointer"
                style={{ fontSize: '0.8125rem', fontWeight: 900 }}
              >
                Log In
              </button>
              <button
                onClick={() => setView('signup')}
                className="btn-playful btn-playful-white cursor-pointer"
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.75rem',
                  borderWidth: '2.5px',
                  boxShadow: '2.5px 2.5px 0 0 var(--clr-border)',
                  textTransform: 'uppercase',
                }}
              >
                Sign Up
              </button>
            </>
          )}

          {/* Enroll Button */}
          {currentView === 'home' && (
            <a
              href="#registration"
              className="btn-playful btn-playful-orange"
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
          )}
        </div>

        {/* Mobile Hamburger toggle button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="menu-toggle-btn cursor-pointer"
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
            onClick={(e) => handleLinkClick(link.href, e)}
            className="nav-link-playful"
            style={{ padding: '0.5rem 0', fontSize: '1.0625rem' }}
          >
            {link.label}
          </a>
        ))}

        <div className="border-t-2 border-slate-200 dark:border-slate-800 my-4"></div>

        {/* Auth details on mobile */}
        {user ? (
          <div className="space-y-3 w-full">
            <div 
              className="text-center font-black py-2 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-2 border-slate-900 text-sm"
              style={{ color: 'var(--clr-ink)' }}
            >
              🤖 Logged in as: {user.username}
            </div>
            <button
              onClick={() => {
                onLogout()
                setIsMenuOpen(false)
              }}
              className="btn-playful btn-playful-white w-full py-2.5 text-sm uppercase font-black"
              style={{ boxShadow: '2.5px 2.5px 0 0 var(--clr-border)' }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              onClick={() => {
                setView('login')
                setIsMenuOpen(false)
              }}
              className="btn-playful btn-playful-white py-2 text-sm uppercase font-black cursor-pointer"
              style={{ boxShadow: '2.5px 2.5px 0 0 var(--clr-border)' }}
            >
              Log In
            </button>
            <button
              onClick={() => {
                setView('signup')
                setIsMenuOpen(false)
              }}
              className="btn-playful btn-playful-orange py-2 text-sm uppercase font-black cursor-pointer"
              style={{ boxShadow: '2.5px 2.5px 0 0 var(--clr-border)' }}
            >
              Sign Up
            </button>
          </div>
        )}

        {currentView === 'home' && (
          <a
            href="#registration"
            onClick={() => setIsMenuOpen(false)}
            className="btn-playful btn-playful-orange text-center"
            style={{
              marginTop: '0.75rem',
              padding: '0.6rem',
              fontSize: '0.9375rem',
              borderWidth: '2.5px',
              boxShadow: '2.5px 2.5px 0 0 var(--clr-border)',
              textTransform: 'uppercase',
              width: '100%',
              display: 'block'
            }}
          >
            Enroll Now
          </a>
        )}
      </div>
    </header>
  )
}
