export const revalidate = 60

import { client, urlFor, queries } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader, OrnamentDivider } from '@/components/ui/Ornament'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Куклы',
  description: 'Авторские куклы ручной работы Анастасии Олеховой.',
}

const materialLabels: Record<string, string> = {
  polymer_clay: 'Полимерная глина',
  papier_mache: 'Папье-маше',
  textile: 'Текстиль',
  mixed: 'Смешанные материалы',
  ceramic: 'Керамика',
}

async function getDolls() {
  try {
    return await client.fetch(queries.allDolls)
  } catch {
    return []
  }
}

interface Doll {
  _id: string
  title: string
  slug: { current: string }
  material: string
  height: number
  images: Array<{ asset: object; alt?: string }>
  description: object[]
  available: boolean
  price: number
}

export default async function DollsPage() {
  const dolls: Doll[] = await getDolls()

  return (
    <div className="pt-6 pb-16">
      <div className="page-container">
        <SectionHeader
          title="Авторские куклы"
          subtitle="Каждая — уникальная история"
        />

        {/* Вступительный текст */}
        <div className="max-w-2xl mx-auto text-center my-12">
          <p
            className="text-lg text-ink-light italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", lineHeight: '1.8' }}
          >
            Куклы создаются вручную в единственном экземпляре. Каждый персонаж наделён
            характером и историей, воплощёнными через детали костюма, мимику и позу.
          </p>
        </div>

        <OrnamentDivider />

        {dolls.length === 0 ? (
          <div className="text-center py-20">
            <p
              className="text-ink-light italic text-xl"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Куклы будут добавлены через Sanity Studio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {dolls.map((doll) => {
              const coverImage = doll.images?.[0]
              return (
                <article key={doll._id} className="card-artwork group">
                  {/* Изображение */}
                  <div className="relative aspect-[2/3] overflow-hidden bg-parchment-dark">
                    {coverImage ? (
                      <Image
                        src={urlFor(coverImage).width(500).height(750).url()}
                        alt={coverImage.alt ?? doll.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gold/30 text-7xl select-none"
                        aria-hidden="true">
                        ❧
                      </div>
                    )}

                    {/* Метка доступности */}
                    {doll.available && (
                      <div className="absolute top-4 right-4 bg-crimson text-parchment text-xs tracking-widest uppercase px-3 py-1"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        В наличии
                      </div>
                    )}
                  </div>

                  {/* Информация */}
                  <div className="p-5">
                    <h3
                      className="text-2xl text-ink mb-1 group-hover:text-crimson transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {doll.title}
                    </h3>

                    <p className="text-sm text-ink-light mb-3" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                      {materialLabels[doll.material] ?? doll.material}
                      {doll.height ? ` · ${doll.height} см` : ''}
                    </p>

                    {doll.available && doll.price && (
                      <p
                        className="text-gold text-lg"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {doll.price.toLocaleString('ru-RU')} ₽
                      </p>
                    )}

                    {doll.available && (
                      <Link href="/contact" className="btn-primary mt-4 text-sm inline-block">
                        Запрос
                      </Link>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <OrnamentDivider className="mt-16" />

        <div className="text-center">
          <p
            className="text-ink-light italic mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem' }}
          >
            Заинтересованы в приобретении или заказе куклы?
          </p>
          <Link href="/contact" className="btn-gold">
            Написать художнику
          </Link>
        </div>
      </div>
    </div>
  )
}
