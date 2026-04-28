interface OrnamentDividerProps {
  text?: string
  className?: string
}

export function OrnamentDivider({ text = '✦', className = '' }: OrnamentDividerProps) {
  return (
    <div className={`divider-ornament my-8 ${className}`}>
      <span>{text}</span>
    </div>
  )
}

export function CornerOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M2 2 L2 14 M2 2 L14 2" stroke="#C9A84C" strokeWidth="1" />
        <path d="M2 6 L6 2" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
      </svg>
    </div>
  )
}

export function SectionHeader({
  title,
  subtitle,
  className = '',
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p
          className="mt-3 text-ink-light italic text-lg"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {subtitle}
        </p>
      )}
      <OrnamentDivider />
    </div>
  )
}
