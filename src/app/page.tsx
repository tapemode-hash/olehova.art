export const revalidate = 60

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

async function getAboutPhoto() {
  try {
    return await client.fetch(`*[_type == "about"][0] { photo }`)
  } catch {
    return null
  }
}

async function getHeroImage() {
  try {
    return await client.fetch(
      `*[_type == "artwork" && slug.current == "angelochek"][0] { image }`
    )
  } catch {
    return null
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
  const [artworks, heroData, aboutData] = await Promise.all([getFeaturedArtworks(), getHeroImage(), getAboutPhoto()])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        {heroData?.image ? (
          <>
            <Image
              src={urlFor(heroData.image).width(1800).height(1200).url()}
              alt="Работа Анастасии Олеховой"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(245,240,232,1) 0%, rgba(245,240,232,0.95) 25%, rgba(245,240,232,0.3) 55%, rgba(245,240,232,0.8) 88%, rgba(245,240,232,1) 100%)'
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-parchment" />
        )}

        {/* Текст поверх — вверху */}
        <div className="absolute top-0 left-0 right-0 page-container pt-4">
          <p
            className="text-gold tracking-[0.4em] uppercase text-sm mb-4 animate-fade-in"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Художник · Иллюстратор
          </p>
          <h1
            className="text-7xl md:text-9xl lg:text-[10rem] text-ink mb-6 animate-slide-up"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, lineHeight: 1.0 }}
          >
            Анастасия
            <br />
            <em className="text-crimson not-italic">Олехова</em>
          </h1>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Link href="/about" className="btn-gold">О художнике</Link>
            <Link href="/portfolio" className="btn-primary">Портфолио</Link>
          </div>
        </div>
      </section>

      {/* О художнике — тизер */}
      <section className="py-28 bg-parchment-dark">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {aboutData?.photo ? (
                <div className="relative aspect-[3/4] overflow-hidden border border-gold/30">
                  <Image
                    src={urlFor(aboutData.photo).width(700).height(933).url()}
                    alt="Анастасия Олехова"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] bg-parchment border border-gold/30 flex items-center justify-center">
                  <p
                    className="text-gold/30 text-8xl select-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    aria-hidden="true"
                  >
                    ❧
                  </p>
                </div>
              )}
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
        <section className="py-28">
          <div className="page-container">
            <SectionHeader title="Избранные работы" subtitle="Из последних серий" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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
                  className="card-museum group block"
                >
                  <div className="relative overflow-hidden bg-parchment aspect-[3/4]">
                    {artwork.image && (
                      <Image
                        src={urlFor(artwork.image).width(800).url()}
                        alt={artwork.title}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="card-museum-overlay">
                      <p className="text-gold/80 text-xs tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        {techniqueLabels[artwork.technique] ?? artwork.technique}
                        {artwork.year ? ` · ${artwork.year}` : ''}
                      </p>
                      <h3 className="text-white text-2xl"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}>
                        {artwork.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-16">
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
      <section className="py-28">
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
      <section className="py-28 bg-parchment-dark">
        <div className="page-container text-center max-w-3xl mx-auto">
          <OrnamentDivider />
          <blockquote
            className="text-3xl md:text-4xl lg:text-5xl italic text-ink mb-8 leading-snug"
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
