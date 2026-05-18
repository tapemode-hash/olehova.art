'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О художнике' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/dolls', label: 'Куклы' },
  { href: '/exhibitions', label: 'Выставки' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/contact', label: 'Контакты' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-parchment/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(201,168,76,0.25)]'
          : 'bg-transparent'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <Link href="/" className="group flex flex-col items-start leading-none">
            <span
              className="text-2xl tracking-widest text-ink"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Анастасия
            </span>
            <span
              className="text-base tracking-[0.4em] text-gold uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Олехова
            </span>
          </Link>

          {/* Десктоп-навигация */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Кнопка мобильного меню */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-ink transition-all duration-300 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Мобильное меню */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${
            menuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-4 pt-4 border-t border-gold/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-lg ${pathname === item.href ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
