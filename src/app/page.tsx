import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor, queries } from '@/lib/sanity'
import { OrnamentDivider, SectionHeader } from '@/components/ui/Ornament'

async function getFeaturedArtworks() {
  try {
    return await client.fetch(queries.featuredArtworks)
  } catch {
    return []
  }
}

const techniqueLabels: Record<string, string> = {
  watercolor: 'Акварель',
  oil: 'Масло',
  graphics: 'Графика',
  mixed: 'Смешанная техника',
  ink: 'Тушь',
  pastel: 'Пастель',
  digital: 'Цифровая иллюстрация',
}

export default async function HomePage() {
  const artworks = await getFeaturedArtworks()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, #C9A84C 1px, transparent 1px),
                radial-gradient(circle at 80% 20%, #8B2E2E 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 80px 80px',
            }}
          />
        </div>

        <div className="page-container relative z-10 py-12">
          <div className="max-w-3xl">
            <p
              className="text-gold tracking-[0.4em] uppercase text-sm mb-6 animate-fade-in"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Художник · Иллюстратор
            </p>

            <h1
              className="text-6xl md:text-8xl lg:text-9xl text-ink mb-8 animate-slide-up"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              Анастасия
              <br />
              <em className="text-crimson not-italic">Олехова</em>
            </h1>

            <p
              className="text-xl md:text-2xl text-ink-light italic mb-12 max-w-xl animate-slide-up"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              «Каждая работа — это путешествие в мир, где время течёт иначе»
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Link href="/about" className="btn-gold">
                О художнике
              </Link>
              <Link href="/portfolio" className="btn-primary">
                Портфолио
              </Link>
            </div>
          </div>
        </div>

        <div
          className="absolute right-0 top-0 bottom-0 w-px opacity-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)' }}
          aria-hidden="true"
        />
      </section>

      {/* О художнике — тизер */}
      <section className="py-20 bg-parchment-dark">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[3/4] bg-parchment border border-gold/30 flex items-center justify-center">
                <p
                  className="text-gold/30 text-8xl select-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  aria-hidden="true"
                >
                  ❧
                </p>
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10"
                aria-hidden="true"
              />
            </div>
            <div>
              <OrnamentDivider text="✦" />
              <h2 className="section-title mb-6">О художнике</h2>
              <p className="mb-8" style={{ fontFamily: "'Lora', Georgia, serif", color: '#3D2B1F', lineHeight: '1.8' }}>
                Анастасия Олехова — художник и иллюстратор, работающий в духе
                старинной книжной иллюстрации. В её работах живут персонажи
                из другого времени — задумчивые, хрупкие и бесконечно живые.
              </p>
              <Link href="/about" className="btn-primary">
                Читать далее
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Избранные работы */}
      {artworks.length > 0 && (
        <section className="py-20">
          <div className="page-container">
            <SectionHeader title="Избранные работы" subtitle="Из последних серий" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {artworks.slice(0, 6).map((artwork: {
                _id: string
                title: string
                slug: { current: string }
                technique: string
                year: number
                image: object
              }) => (
                <Link
                  key={artwork._id}
                  href={`/portfolio/${artwork.slug.current}`}
                  className="card-artwork group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {artwork.image && (
                      <Image
                        src={urlFor(artwork.image).width(600).height(800).url()}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-xl text-ink"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-ink-light mt-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                      {techniqueLabels[artwork.technique] ?? artwork.technique}
                      {artwork.year ? ` · ${artwork.year}` : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio" className="btn-primary">
                Все работы
              </Link>
            </div>
          </div>
        </section>
      )}

      {artworks.length === 0 && (
        <section className="py-20">
          <div className="page-container">
            <SectionHeader title="Портфолио" />
            <div className="text-center mt-8">
              <p className="text-ink-light italic" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                Работы будут добавлены через Sanity Studio.
              </p>
              <Link href="/portfolio" className="btn-primary mt-6 inline-block">
                Перейти в портфолио
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Куклы — тизер */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <OrnamentDivider text="✦" />
              <h2 className="section-title mb-6">Авторские куклы</h2>
              <p className="mb-8" style={{ fontFamily: "'Lora', Georgia, serif", color: '#3D2B1F', lineHeight: '1.8' }}>
                Каждая кукла — это уникальный персонаж с собственной историей.
                Созданные вручную из полимерной глины и натуральных тканей,
                они несут в себе дух старинной иллюстрации.
              </p>
              <Link href="/dolls" className="btn-gold">
                Смотреть коллекцию
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-parchment-dark border border-gold/30 flex items-center justify-center">
                <p
                  className="text-gold/40 text-8xl select-none"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  aria-hidden="true"
                >
                  ❧
                </p>
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Цитата */}
      <section className="py-20 bg-parchment-dark">
        <div className="page-container text-center max-w-2xl mx-auto">
          <OrnamentDivider />
          <blockquote
            className="text-2xl md:text-3xl italic text-ink mb-8"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
          >
            Искусство — это язык, на котором душа разговаривает с вечностью
          </blockquote>
          <OrnamentDivider />
          <Link href="/contact" className="btn-primary mt-4 inline-block">
            Написать мне
          </Link>
        </div>
      </section>
    </>
  )
}
