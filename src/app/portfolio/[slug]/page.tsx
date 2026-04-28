import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const techniqueLabels: Record<string, string> = {
  watercolor: 'Акварель',
  oil: 'Масло',
  graphics: 'Графика',
  mixed: 'Смешанная техника',
  ink: 'Тушь',
  pastel: 'Пастель',
  digital: 'Цифровая иллюстрация',
}

async function getArtwork(slug: string) {
  try {
    return await client.fetch(
      `*[_type == "artwork" && slug.current == $slug][0] {
        _id, title, slug, technique, year, dimensions, image, description, featured
      }`,
      { slug }
    )
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artwork = await getArtwork(params.slug)
  if (!artwork) return {}
  return {
    title: artwork.title,
    description: artwork.description ?? `${artwork.title} — ${techniqueLabels[artwork.technique] ?? artwork.technique}`,
  }
}

export default async function ArtworkPage({ params }: { params: { slug: string } }) {
  const artwork = await getArtwork(params.slug)

  if (!artwork) notFound()

  return (
    <div className="py-16">
      <div className="page-container">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-ink-light hover:text-crimson transition-colors mb-8 text-sm tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          ← Все работы
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Изображение */}
          <div className="relative">
            <div className="card-artwork overflow-hidden">
              {artwork.image ? (
                <div className="relative aspect-[3/4]">
                  <Image
                    src={urlFor(artwork.image).width(800).height(1067).url()}
                    alt={artwork.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] flex items-center justify-center text-gold/30 text-8xl bg-parchment-dark">
                  ❧
                </div>
              )}
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10"
              aria-hidden="true"
            />
          </div>

          {/* Описание */}
          <div className="lg:sticky lg:top-28">
            <p
              className="text-gold text-sm tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {techniqueLabels[artwork.technique] ?? artwork.technique}
            </p>

            <h1
              className="text-4xl md:text-5xl text-ink mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
            >
              {artwork.title}
            </h1>

            <div className="hr-ornate" />

            <dl className="space-y-3 mb-8">
              {artwork.year && (
                <div className="flex gap-4">
                  <dt className="text-sm text-gold tracking-widest uppercase w-28 shrink-0"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Год
                  </dt>
                  <dd style={{ fontFamily: "'Lora', Georgia, serif" }}>{artwork.year}</dd>
                </div>
              )}
              {artwork.dimensions && (
                <div className="flex gap-4">
                  <dt className="text-sm text-gold tracking-widest uppercase w-28 shrink-0"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Размер
                  </dt>
                  <dd style={{ fontFamily: "'Lora', Georgia, serif" }}>{artwork.dimensions} см</dd>
                </div>
              )}
              <div className="flex gap-4">
                <dt className="text-sm text-gold tracking-widest uppercase w-28 shrink-0"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  Техника
                </dt>
                <dd style={{ fontFamily: "'Lora', Georgia, serif" }}>
                  {techniqueLabels[artwork.technique] ?? artwork.technique}
                </dd>
              </div>
            </dl>

            {artwork.description && (
              <p
                className="text-ink-light leading-relaxed"
                style={{ fontFamily: "'Lora', Georgia, serif", lineHeight: '1.8' }}
              >
                {artwork.description}
              </p>
            )}

            <div className="mt-10">
              <Link href="/contact" className="btn-primary">
                Связаться по поводу работы
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
