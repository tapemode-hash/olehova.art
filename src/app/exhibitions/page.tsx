export const revalidate = 60

import { client, urlFor, queries } from '@/lib/sanity'
import Image from 'next/image'
import { SectionHeader, OrnamentDivider } from '@/components/ui/Ornament'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Выставки',
  description: 'Персональные и групповые выставки Анастасии Олеховой.',
}

const typeLabels: Record<string, string> = {
  solo: 'Персональная',
  group: 'Групповая',
  fair: 'Ярмарка',
}

async function getExhibitions() {
  try {
    return await client.fetch(queries.allExhibitions)
  } catch {
    return []
  }
}

interface Exhibition {
  _id: string
  title: string
  type: string
  venue: string
  city: string
  country: string
  dateStart: string
  dateEnd: string
  description: string
  image: object
  upcoming: boolean
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ExhibitionsPage() {
  const exhibitions: Exhibition[] = await getExhibitions()

  const upcoming = exhibitions.filter((e) => e.upcoming)
  const past = exhibitions.filter((e) => !e.upcoming)

  return (
    <div className="pt-6 pb-16">
      <div className="page-container">
        <SectionHeader
          title="Выставки"
          subtitle="Персональные и групповые"
        />

        {exhibitions.length === 0 ? (
          <div className="text-center py-20">
            <p
              className="text-ink-light italic text-xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Выставки будут добавлены через Sanity Studio.
            </p>
          </div>
        ) : (
          <>
            {/* Предстоящие */}
            {upcoming.length > 0 && (
              <section className="mb-20">
                <h2
                  className="text-3xl text-crimson mb-8 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Предстоящие
                </h2>
                <div className="space-y-6">
                  {upcoming.map((ex) => (
                    <ExhibitionCard key={ex._id} exhibition={ex} />
                  ))}
                </div>
              </section>
            )}

            {/* Прошедшие */}
            {past.length > 0 && (
              <section>
                {upcoming.length > 0 && (
                  <>
                    <OrnamentDivider />
                    <h2
                      className="text-3xl text-ink mb-8 text-center"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Прошедшие
                    </h2>
                  </>
                )}
                <div className="space-y-6">
                  {past.map((ex) => (
                    <ExhibitionCard key={ex._id} exhibition={ex} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function ExhibitionCard({ exhibition: ex }: { exhibition: Exhibition }) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 border border-gold/20 p-6 bg-parchment hover:border-gold/60 transition-colors duration-300">
      {ex.image && (
        <div className="relative w-full md:w-40 aspect-[4/3] md:aspect-auto shrink-0 overflow-hidden">
          <Image
            src={urlFor(ex.image).width(320).height(240).url()}
            alt={ex.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 160px"
          />
        </div>
      )}

      <div className="flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-3 items-center mb-2">
            {ex.type && (
              <span
                className="text-xs tracking-widest uppercase text-gold border border-gold/40 px-2 py-0.5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {typeLabels[ex.type] ?? ex.type}
              </span>
            )}
            {ex.upcoming && (
              <span
                className="text-xs tracking-widest uppercase text-crimson border border-crimson/40 px-2 py-0.5"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Скоро
              </span>
            )}
          </div>

          <h3
            className="text-2xl text-ink mb-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {ex.title}
          </h3>

          <p className="text-sm text-ink-light mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            {[ex.venue, ex.city, ex.country].filter(Boolean).join(', ')}
          </p>

          {ex.description && (
            <p className="text-sm text-ink-light" style={{ fontFamily: "'Lora', Georgia, serif", lineHeight: '1.7' }}>
              {ex.description}
            </p>
          )}
        </div>

        {(ex.dateStart || ex.dateEnd) && (
          <p
            className="text-sm text-gold mt-4 italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {ex.dateStart && formatDate(ex.dateStart)}
            {ex.dateEnd && ` — ${formatDate(ex.dateEnd)}`}
          </p>
        )}
      </div>
    </article>
  )
}
