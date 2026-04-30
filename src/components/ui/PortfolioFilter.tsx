'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

const techniques = [
  { value: 'all', label: 'Все работы' },
  { value: 'watercolor', label: 'Акварель' },
  { value: 'oil', label: 'Масло' },
  { value: 'graphics', label: 'Графика' },
  { value: 'ink', label: 'Тушь' },
  { value: 'pastel', label: 'Пастель' },
  { value: 'mixed', label: 'Смешанная' },
  { value: 'digital', label: 'Цифровая' },
]

const techniqueLabels: Record<string, string> = {
  watercolor: 'Акварель',
  oil: 'Масло',
  graphics: 'Графика',
  mixed: 'Смешанная техника',
  ink: 'Тушь',
  pastel: 'Пастель',
  digital: 'Цифровая иллюстрация',
}

interface Artwork {
  _id: string
  title: string
  slug: { current: string }
  technique: string
  year: number
  dimensions: string
  image: object
  description: string
  price?: number
  available?: boolean
}

export function PortfolioFilter({ artworks }: { artworks: Artwork[] }) {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all'
      ? artworks
      : artworks.filter((a) => a.technique === active)

  const available = new Set(artworks.map((a) => a.technique))

  return (
    <div>
      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 justify-center mb-16">
        {techniques
          .filter((t) => t.value === 'all' || available.has(t.value))
          .map((t) => (
            <button
              key={t.value}
              onClick={() => setActive(t.value)}
              className={`px-5 py-2 text-sm tracking-widest uppercase transition-all duration-200 ${
                active === t.value
                  ? 'bg-crimson text-parchment border border-crimson'
                  : 'bg-transparent text-ink border border-ink/30 hover:border-gold hover:text-crimson'
              }`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t.label}
            </button>
          ))}
      </div>

      {/* Сетка работ */}
      {filtered.length === 0 ? (
        <p className="text-center text-ink-light italic py-16"
          style={{ fontFamily: "'Lora', Georgia, serif" }}>
          Работы в этой технике пока не добавлены.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {filtered.map((artwork) => (
            <Link
              key={artwork._id}
              href={`/portfolio/${artwork.slug.current}`}
              className="card-museum group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-parchment">
                {artwork.image ? (
                  <Image
                    src={urlFor(artwork.image).width(600).height(800).url()}
                    alt={artwork.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gold/30 text-5xl select-none"
                    aria-hidden="true">
                    ❧
                  </div>
                )}

                {/* Overlay при наведении */}
                <div className="card-museum-overlay">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-gold/80 text-xs tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {active === 'all' && (techniqueLabels[artwork.technique] ?? artwork.technique)}
                        {artwork.year ? (active === 'all' ? ` · ${artwork.year}` : `${artwork.year}`) : ''}
                      </p>
                      <h3 className="text-white text-2xl leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}>
                        {artwork.title}
                      </h3>
                      {artwork.price && (
                        <p className="text-gold mt-1 text-lg"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                          {artwork.price.toLocaleString('ru-RU')} ₽
                        </p>
                      )}
                    </div>
                    {artwork.available !== false && (
                      <span
                        onClick={(e) => { e.preventDefault(); window.location.href = `/contact?work=${encodeURIComponent(artwork.title)}` }}
                        className="shrink-0 text-xs tracking-widest uppercase border border-gold/60 text-gold hover:bg-gold hover:text-ink transition-all duration-200 px-3 py-1.5 cursor-pointer"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        Связаться
                      </span>
                    )}
                  </div>
                </div>

                {/* Бейдж «Продана» на мобильном */}
                {artwork.available === false && (
                  <div className="absolute top-3 right-3 text-xs tracking-widest uppercase bg-parchment/80 text-ink-light px-2 py-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Продана
                  </div>
                )}
              </div>

              {/* Подпись под карточкой (мобильный fallback) */}
              <div className="pt-3 pb-6 px-1">
                <h3 className="text-lg text-ink"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {artwork.title}
                </h3>
                <p className="text-sm text-ink-light mt-0.5"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}>
                  {active === 'all' && (techniqueLabels[artwork.technique] ?? artwork.technique)}
                  {artwork.year ? (active === 'all' ? ` · ${artwork.year}` : `${artwork.year}`) : ''}
                  {artwork.price ? ` · ${artwork.price.toLocaleString('ru-RU')} ₽` : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
