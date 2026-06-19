import { useState, useEffect } from 'react'

type MysteryBoxPopupProps = {
  onClaim: (code: string) => void
}

type BoxState = 'idle' | 'opening' | 'opened'

const PRIZES = [
  { code: 'ROBOSUMMER500', name: '₹500 Summer Scholarship Discount', desc: 'Direct discount on your workshop fee!' },
  { code: 'ROBOSTICKERS', name: 'Free Robotics Sticker Pack', desc: 'Get it shipped free with your starter kit!' },
  { code: 'ROBODEMO', name: 'Free 1-on-1 Robot Setup Demo', desc: 'Personal mentoring session to build your first bot!' },
]

export function MysteryBoxPopup({ onClaim }: MysteryBoxPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [boxState, setBoxState] = useState<BoxState>('idle')
  const [prize, setPrize] = useState<typeof PRIZES[0] | null>(null)

  useEffect(() => {
    // Check if popup was already dismissed/shown in this session
    const isDismissed = sessionStorage.getItem('kidrove_mystery_popup_dismissed')
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 4000) // Show popup after 4 seconds
      return () => clearTimeout(timer)
    }
  }, [])

  function handleClose() {
    setIsOpen(false)
    sessionStorage.setItem('kidrove_mystery_popup_dismissed', 'true')
  }

  function handleBoxClick(index: number) {
    if (selectedBox !== null) return
    setSelectedBox(index)
    setBoxState('opening')

    // Simulate opening animations
    setTimeout(() => {
      // Pick a random prize
      const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)]
      setPrize(randomPrize)
      setBoxState('opened')
    }, 1200)
  }

  function handleClaim() {
    if (prize) {
      onClaim(prize.code)
      setIsOpen(false)
      sessionStorage.setItem('kidrove_mystery_popup_dismissed', 'true')
      // Smooth scroll to registration section
      const regSection = document.getElementById('registration')
      if (regSection) {
        regSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        background: 'rgba(9, 13, 22, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fade-in 0.25s ease-out',
      }}
    >
      <div
        className="playful-card modal-content"
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--clr-white)',
          padding: '2.5rem 1.75rem',
          position: 'relative',
          borderWidth: '4px',
          boxShadow: 'var(--shadow-brutal-lg)',
          textAlign: 'center',
          animation: 'popup-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '50%',
            border: '3px solid var(--clr-border)',
            background: 'var(--clr-white)',
            color: 'var(--clr-ink)',
            cursor: 'pointer',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0px 0px var(--clr-border)',
            transition: 'all 0.15s ease',
          }}
          className="close-hover-btn"
          aria-label="Close lucky draw"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {boxState !== 'opened' ? (
          <>
            {/* Header */}
            <div>
              <span
                style={{
                  background: 'var(--clr-yellow-light)',
                  border: '3px solid var(--clr-border)',
                  color: 'var(--clr-ink)',
                  boxShadow: '2px 2px 0px 0px var(--clr-border)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  letterSpacing: '0.05em',
                }}
              >
                🤖 ROBO-LUCKY DRAW
              </span>
              <h3
                style={{
                  fontSize: '1.75rem',
                  marginTop: '1.25rem',
                  lineHeight: '1.15',
                  color: 'var(--clr-ink)',
                }}
              >
                Choose Your Mystery Core!
              </h3>
              <p
                style={{
                  marginTop: '0.75rem',
                  fontSize: '0.9375rem',
                  color: 'var(--clr-muted)',
                  fontWeight: 600,
                  maxWidth: '38ch',
                  marginInline: 'auto',
                }}
              >
                Select one of the robot power cores below to unlock an exclusive summer discount pack!
              </p>
            </div>

            {/* Boxes Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginTop: '2rem',
                justifyContent: 'center',
              }}
            >
              {[0, 1, 2].map((idx) => {
                const isSelected = selectedBox === idx
                const isAnySelected = selectedBox !== null
                const opacity = isSelected ? 1 : isAnySelected ? 0.35 : 1

                return (
                  <button
                    key={idx}
                    onClick={() => handleBoxClick(idx)}
                    disabled={isAnySelected}
                    style={{
                      border: '3px solid var(--clr-border)',
                      borderRadius: 'var(--r-md)',
                      background: isSelected ? 'var(--clr-yellow-light)' : 'var(--clr-surface)',
                      padding: '1.25rem 0.5rem',
                      cursor: isAnySelected ? 'default' : 'pointer',
                      boxShadow: isSelected ? 'none' : 'var(--shadow-brutal-sm)',
                      transform: isSelected && boxState === 'opening' ? 'none' : 'none',
                      transition: 'all 0.25s ease',
                      opacity,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                    className={`mystery-box-btn ${isSelected && boxState === 'opening' ? 'shake-box' : 'hover-box'}`}
                  >
                    {/* Futuristic Robot Core Box Drawing */}
                    <svg
                      viewBox="0 0 80 80"
                      width="54"
                      height="54"
                      style={{
                        animation: isSelected && boxState === 'opening' ? 'shake-box 0.15s infinite' : 'none',
                      }}
                    >
                      {/* Box bottom */}
                      <rect x="15" y="32" width="50" height="38" rx="6" fill={idx === 0 ? 'var(--clr-brand)' : idx === 1 ? 'var(--clr-sky)' : 'var(--clr-purple)'} stroke="var(--clr-border)" strokeWidth="3" />
                      {/* Box lid */}
                      <rect x="10" y="22" width="60" height="12" rx="3" fill="var(--clr-white)" stroke="var(--clr-border)" strokeWidth="3" />
                      {/* Ribbon / Core Accent */}
                      <rect x="35" y="22" width="10" height="48" fill="var(--clr-yellow)" stroke="var(--clr-border)" strokeWidth="2.5" />
                      {/* Gear Icon in Center */}
                      <circle cx="40" cy="48" r="7" fill="var(--clr-white)" stroke="var(--clr-border)" strokeWidth="2.5" />
                      <path d="M 40 38 L 40 42 M 40 54 L 40 58 M 30 48 L 34 48 M 46 48 L 50 48" stroke="var(--clr-border)" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--clr-ink)' }}>
                      CORE #{idx + 1}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Hint / Status */}
            <div style={{ marginTop: '1.75rem', minHeight: '1.5rem' }}>
              {boxState === 'opening' && (
                <p style={{ color: 'var(--clr-brand)', fontWeight: 800, fontSize: '0.875rem', animation: 'blink 0.8s infinite' }}>
                  ⚡ ANALYZING QUANTUM CORE DATA...
                </p>
              )}
            </div>
          </>
        ) : (
          /* Opened State with Prize Info */
          <div style={{ animation: 'fade-in 0.3s ease-out' }}>
            {/* Sparkles / Confetti SVG */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '4.5rem',
                  height: '4.5rem',
                  borderRadius: '50%',
                  background: 'var(--clr-yellow)',
                  border: '3px solid var(--clr-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '3px 3px 0px 0px var(--clr-border)',
                  animation: 'spin-trophy 1s var(--ease-spring)',
                }}
              >
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                  <path d="M12 2a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                </svg>
              </div>
            </div>

            <h3 style={{ fontSize: '1.875rem', color: 'var(--clr-ink)' }}>
              Core Unlocked! 🎉
            </h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9375rem', color: 'var(--clr-muted)', fontWeight: 600 }}>
              Congratulations! You unlocked an early-bird summer offer:
            </p>

            {/* Prize Card */}
            <div
              style={{
                background: 'var(--clr-yellow-light)',
                border: '3px solid var(--clr-border)',
                borderRadius: 'var(--r-md)',
                padding: '1.25rem',
                marginBlock: '1.5rem',
                boxShadow: 'var(--shadow-brutal-sm)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ fontSize: '1.125rem', color: 'var(--clr-brand)', fontWeight: 900 }}>
                {prize?.name}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: 'var(--clr-muted)', fontWeight: 700, marginTop: '0.25rem' }}>
                {prize?.desc}
              </p>

              {/* Coupon Code Block */}
              <div
                style={{
                  background: 'var(--clr-white)',
                  border: '2px dashed var(--clr-border)',
                  borderRadius: 'var(--r-sm)',
                  padding: '0.6rem',
                  marginTop: '0.75rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: 'var(--clr-ink)',
                  letterSpacing: '0.05em',
                  fontFamily: 'monospace',
                }}
              >
                {prize?.code}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={handleClaim}
                className="btn-playful btn-playful-orange wiggle-hover"
                style={{ width: '100%', padding: '0.875rem 1.5rem', textTransform: 'uppercase' }}
              >
                Claim Offer & Auto-Fill
              </button>
              <button
                onClick={handleClose}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--clr-muted)',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                No Thanks, I'll pay full price
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popup-bounce {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shake-box {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(6deg); }
          60% { transform: rotate(-6deg); }
          80% { transform: rotate(4deg); }
        }
        @keyframes spin-trophy {
          0% { transform: scale(0.5) rotate(-45deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .hover-box:hover {
          transform: translateY(-4px) scale(1.03) !important;
          border-color: var(--clr-brand) !important;
          box-shadow: 4px 4px 0px 0px var(--clr-border) !important;
        }
        .close-hover-btn:hover {
          transform: rotate(90deg) scale(1.1);
          border-color: var(--clr-brand) !important;
        }
        @keyframes blink {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
