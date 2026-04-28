import { client, urlFor, queries } from '@/lib/sanity'
import Image from 'next/image'
import { OrnamentDivider } from '@/components/ui/Ornament'
import type { Metadata } from 'next'
import { PortableText } from '@portabletext/react'

export const metadata: Metadata = {
  title: 'О художнике',
  description: 'Биография и художественное заявление Анастасии Ольховой.',
}

async function getAbout() {
  try {
    return await client.fetch(queries.about)
  } catch {
    return null
  }
}

export default async function AboutPage() {
  const about = await getAbout()

  return (
    <div className="py-16">
      <div className="page-container">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <OrnamentDivider />
          <h1 className="section-title">О художнике</h1>
          <OrnamentDivider />
        </div>

        {about ? (
          <>
            {/* Основной блок */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
              {/* Фото */}
              <div className="relative">
                {about.photo ? (
                  <div className="card-artwork overflow-hidden">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={urlFor(about.photo).width(700).height(933).url()}
                        alt={about.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-parchment-dark border border-gold/20 flex items-center justify-center text-gold/30 text-8xl">
                    ❧
                  </div>
                )}
                <div
                  className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10"
                  aria-hidden="true"
                />
              </div>

              {/* Биография */}
              <div>
                <h2
                  className="text-5xl text-ink mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                >
                  {about.name ?? 'Анастасия Ольхова'}
                </h2>
                {about.tagline && (
                  <p
                    className="text-gold text-lg italic mb-8"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {about.tagline}
                  </p>
                )}

                <div className="hr-ornate" />

                {about.bio ? (
                  <div
                    className="prose-art"
                    style={{ fontFamily: "'Lora', Georgia, serif", lineHeight: '1.8', color: '#3D2B1F' }}
                  >
                    <PortableText value={about.bio} />
                  </div>
                ) : (
                  <p
                    className="text-ink-light italic"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    Биография будет добавлена через Sanity Studio.
                  </p>
                )}
              </div>
            </div>

            {/* Художественное заявление */}
            {about.statement && (
              <section className="mb-20 bg-parchment-dark p-10 border border-gold/20">
                <h3
                  className="text-3xl text-ink mb-6 text-center"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Художественное заявление
                </h3>
                <div className="hr-ornate" />
                <div
                  className="max-w-2xl mx-auto italic text-ink-light text-lg"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: '1.8' }}
                >
                  <PortableText value={about.statement} />
                </div>
              </section>
            )}

            {/* Образование */}
            {about.education?.length > 0 && (
              <section className="mb-16">
                <h3
                  className="text-3xl text-ink mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Образование
                </h3>
                <div className="space-y-4">
                  {about.education.map((item: { year: string; institution: string; degree: string }, i: number) => (
                    <div key={i} className="flex gap-8 items-baseline border-b border-gold/20 pb-4">
                      <span
                        className="text-gold text-lg w-16 shrink-0"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {item.year}
                      </span>
                      <div>
                        <p className="text-ink font-medium" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                          {item.institution}
                        </p>
                        {item.degree && (
                          <p className="text-sm text-ink-light" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                            {item.degree}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Награды */}
            {about.awards?.length > 0 && (
              <section className="mb-16">
                <h3
                  className="text-3xl text-ink mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Награды и признание
                </h3>
                <div className="space-y-4">
                  {about.awards.map((item: { year: string; title: string; description: string }, i: number) => (
                    <div key={i} className="flex gap-8 items-baseline border-b border-gold/20 pb-4">
                      <span
                        className="text-gold text-lg w-16 shrink-0"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {item.year}
                      </span>
                      <div>
                        <p className="text-ink font-medium" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-sm text-ink-light" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p
              className="text-ink-light italic text-xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Информация о художнике будет добавлена через Sanity Studio.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
