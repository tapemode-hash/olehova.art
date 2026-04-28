import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/30 bg-parchment-dark">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Подпись */}
          <div>
            <p
              className="text-3xl text-ink mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Анастасия Олехова
            </p>
            <p className="text-gold text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Художник · Иллюстратор
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4
              className="text-ink text-sm tracking-widest uppercase mb-4 text-gold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Разделы
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/about', label: 'О художнике' },
                { href: '/portfolio', label: 'Портфолио' },
                { href: '/dolls', label: 'Куклы' },
                { href: '/exhibitions', label: 'Выставки' },
                { href: '/contact', label: 'Контакт' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ink-light hover:text-crimson transition-colors duration-200 text-sm"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <h4
              className="text-sm tracking-widest uppercase mb-4 text-gold"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Связаться
            </h4>
            <div className="flex flex-col gap-2 text-sm text-ink-light"
              style={{ fontFamily: "'Lora', Georgia, serif" }}>
              <a href="mailto:art@olehova.art" className="hover:text-crimson transition-colors">
                art@olehova.art
              </a>
              <Link href="/contact" className="hover:text-crimson transition-colors">
                Форма обратной связи →
              </Link>
            </div>
          </div>
        </div>

        <div className="hr-ornate mt-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-light"
          style={{ fontFamily: "'Lora', Georgia, serif" }}>
          <p>© {new Date().getFullYear()} Анастасия Олехова. Все права защищены.</p>
          <p className="text-gold/60 tracking-widest" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            ✦ ✦ ✦
          </p>
        </div>
      </div>
    </footer>
  )
}
