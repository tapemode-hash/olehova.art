'use client'

import { useState } from 'react'
import { OrnamentDivider } from '@/components/ui/Ornament'

interface Review {
  _id: string
  name: string
  text: string
  rating: number
  artwork?: string
  date: string
}

const STAR = '★'
const STAR_EMPTY = '☆'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-gold text-lg tracking-wide" aria-label={`${rating} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (i < rating ? STAR : STAR_EMPTY)).join('')}
    </span>
  )
}

export function ReviewsClient({ initial }: { initial: Review[] }) {
  const [reviews] = useState<Review[]>(initial)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [artwork, setArtwork] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text, rating, artwork }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setName('')
      setText('')
      setRating(5)
      setArtwork('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="py-16">
      <div className="page-container max-w-3xl">

        {/* Список отзывов */}
        {reviews.length > 0 ? (
          <div className="space-y-8 mb-20">
            {reviews.map((r) => (
              <div key={r._id} className="border border-gold/20 p-6 bg-parchment-dark">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p
                      className="text-lg text-ink"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {r.name}
                    </p>
                    {r.artwork && (
                      <p
                        className="text-sm text-gold italic mt-0.5"
                        style={{ fontFamily: "'Lora', Georgia, serif" }}
                      >
                        {r.artwork}
                      </p>
                    )}
                  </div>
                  <Stars rating={r.rating ?? 5} />
                </div>
                <p
                  className="text-ink-light leading-relaxed"
                  style={{ fontFamily: "'Lora', Georgia, serif", lineHeight: 1.8 }}
                >
                  {r.text}
                </p>
                <p
                  className="text-xs text-ink-light/50 mt-4 tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {new Date(r.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-center text-ink-light italic mb-20 py-12"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            Пока нет отзывов. Будьте первым!
          </p>
        )}

        {/* Форма */}
        <OrnamentDivider text="✦" />
        <h2
          className="section-title text-center mt-4 mb-10"
        >
          Оставить отзыв
        </h2>

        {status === 'sent' ? (
          <div
            className="text-center py-12 border border-gold/30 bg-parchment-dark"
          >
            <p
              className="text-2xl text-ink mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
            >
              Спасибо за отзыв!
            </p>
            <p
              className="text-ink-light text-sm"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              Он появится на сайте после проверки.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6">
            {/* Оценка */}
            <div>
              <p
                className="text-xs tracking-widest uppercase text-gold mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Оценка
              </p>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={`text-2xl transition-colors ${
                      n <= rating ? 'text-gold' : 'text-ink/20'
                    }`}
                    aria-label={`${n} звёзд`}
                  >
                    {STAR}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="r-name"
                className="block text-xs tracking-widest uppercase text-gold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Ваше имя *
              </label>
              <input
                id="r-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              />
            </div>

            <div>
              <label
                htmlFor="r-artwork"
                className="block text-xs tracking-widest uppercase text-gold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Работа (необязательно)
              </label>
              <input
                id="r-artwork"
                value={artwork}
                onChange={(e) => setArtwork(e.target.value)}
                placeholder="Название работы, если отзыв о конкретной"
                className="w-full bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              />
            </div>

            <div>
              <label
                htmlFor="r-text"
                className="block text-xs tracking-widest uppercase text-gold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Отзыв *
              </label>
              <textarea
                id="r-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                rows={5}
                className="w-full bg-transparent border border-ink/20 focus:border-gold outline-none p-3 text-ink resize-none transition-colors"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              />
            </div>

            {status === 'error' && (
              <p className="text-crimson text-sm" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                Не удалось отправить. Попробуйте ещё раз.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
            >
              {status === 'sending' ? 'Отправка…' : 'Отправить отзыв'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
