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
            <div className="flex flex-col gap-3 text-sm text-ink-light"
              style={{ fontFamily: "'Lora', Georgia, serif" }}>
              <a href="mailto:olekhova.anastasiya@yandex.ru" className="hover:text-crimson transition-colors">
                olekhova.anastasiya@yandex.ru
              </a>
              <Link href="/contact" className="hover:text-crimson transition-colors">
                Форма обратной связи →
              </Link>
              <div className="flex gap-4 mt-1">
                <a
                  href="https://www.instagram.com/olehova_anastasiya?igsh=MW9xNG9hbHZxc2ZwZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://vk.com/id682236515"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson transition-colors"
                  aria-label="ВКонтакте"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-.4-1.49 1.187 0 .48-.152.717-.703.717h-.744c-2.148 0-4.522-1.272-6.178-3.676C4.724 11.19 4.21 9.39 4.21 9.39s-.017-.306.162-.47c.202-.183.62-.184.803-.184h1.77c.573 0 .746.347.925.82.936 2.47 2.498 4.63 3.138 4.63.243 0 .353-.11.353-.715V11.34c-.073-1.285-.75-1.395-.75-1.862 0-.22.175-.44.456-.44H13c.49 0 .662.26.662.814v3.626c0 .49.213.664.35.664.242 0 .442-.174 1.02-.75 1.595-1.74 2.731-4.42 2.731-4.42.15-.313.42-.6.84-.6h1.77c.532 0 .65.28.532.814-.22 1.01-2.344 4.013-2.344 4.013-.19.313-.258.454 0 .8.19.266 1.008 1.008 1.52 1.62.946 1.073 1.67 1.974 1.865 2.595.196.61-.1.92-.677.92z"/>
                  </svg>
                </a>
              </div>
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
