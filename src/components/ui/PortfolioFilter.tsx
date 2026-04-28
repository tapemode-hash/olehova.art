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
      <div className="flex flex-wrap gap-2 justify-center mb-12">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artwork) => (
            <div key={artwork._id} className="card-artwork group flex flex-col">
              <Link href={`/portfolio/${artwork.slug.current}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-parchment-dark">
                  {artwork.image ? (
                    <Image
                      src={urlFor(artwork.image).width(600).height(800).url()}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gold/30 text-5xl select-none"
                      aria-hidden="true">
                      ❧
                    </div>
                  )}
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-300" />
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/portfolio/${artwork.slug.current}`}>
                  <h3
                    className="text-xl text-ink group-hover:text-crimson transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {artwork.title}
                  </h3>
                </Link>
                <p className="text-sm text-ink-light mt-1"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}>
                  {techniqueLabels[artwork.technique] ?? artwork.technique}
                  {artwork.year ? ` · ${artwork.year}` : ''}
                  {artwork.dimensions ? ` · ${artwork.dimensions} см` : ''}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  {artwork.price ? (
                    <span
                      className="text-lg text-crimson"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {artwork.price.toLocaleString('ru-RU')} ₽
                    </span>
                  ) : (
                    <span />
                  )}
                  {artwork.available !== false && (
                    <Link
                      href={`/contact?work=${encodeURIComponent(artwork.title)}`}
                      className="text-xs tracking-widest uppercase border border-gold/50 text-gold hover:bg-gold hover:text-parchment transition-all duration-200 px-3 py-1.5"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Связаться
                    </Link>
                  )}
                  {artwork.available === false && (
                    <span
                      className="text-xs tracking-widest uppercase text-ink-light border border-ink/20 px-3 py-1.5"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Продана
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
