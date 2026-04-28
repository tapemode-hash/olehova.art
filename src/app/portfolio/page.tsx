import { client, queries } from '@/lib/sanity'
import { SectionHeader } from '@/components/ui/Ornament'
import { PortfolioFilter } from '@/components/ui/PortfolioFilter'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Портфолио',
  description: 'Живопись, акварель, графика и смешанные техники — работы Анастасии Олеховой.',
}

async function getArtworks() {
  try {
    return await client.fetch(queries.allArtworks)
  } catch {
    return []
  }
}

export default async function PortfolioPage() {
  const artworks = await getArtworks()

  return (
    <div className="pt-6 pb-16">
      <div className="page-container">
        <SectionHeader
          title="Портфолио"
          subtitle="Живопись · Графика · Иллюстрация"
        />

        <div className="mt-12">
          <PortfolioFilter artworks={artworks} />
        </div>
      </div>
    </div>
  )
}
