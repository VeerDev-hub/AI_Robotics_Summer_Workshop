type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  theme?: 'light' | 'dark'
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  theme = 'light',
  align = 'left',
}: SectionHeadingProps) {
  const isDark = theme === 'dark'
  const isCenter = align === 'center'

  return (
    <div
      className={`reveal ${isCenter ? 'text-center mx-auto' : ''}`}
      style={{ maxWidth: isCenter ? '40rem' : '36rem' }}
    >
      {/* Eyebrow */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--clr-brand)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '1.5rem',
            height: '2px',
            background: 'var(--clr-brand)',
            borderRadius: '9999px',
          }}
        />
        {eyebrow}
      </span>

      {/* Title */}
      <h2
        style={{
          marginTop: '0.875rem',
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: isDark ? '#ffffff' : 'var(--clr-ink)',
        }}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          style={{
            marginTop: '1rem',
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: isDark ? 'rgba(255,255,255,0.65)' : 'var(--clr-muted)',
          }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
