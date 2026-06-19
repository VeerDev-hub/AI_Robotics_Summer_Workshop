export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-playful">
      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>
          kid<span style={{ color: 'var(--clr-brand)' }}>rove</span>
        </p>
        <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--clr-muted)' }}>
          © {year} Kidrove. Inspiring young minds through tech, coding, and creative play.
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--clr-subtle)' }}>
          All rights reserved. Verified secure workshop enrollment portals.
        </p>
      </div>
    </footer>
  )
}
