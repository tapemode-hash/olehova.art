import { client } from '@/lib/sanity'
import { SectionHeader } from '@/components/ui/Ornament'
import { ReviewsClient } from './ReviewsClient'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Отзывы',
  description: 'Отзывы покупателей работ Анастасии Олеховой.',
}

async function getReviews() {
  try {
    return await client.fetch(
      `*[_type == "review" && published == true] | order(date desc) {
        _id, name, text, rating, artwork, date
      }`
    )
  } catch {
    return []
  }
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  return (
    <div className="pt-6 pb-16">
      <div className="page-container">
        <SectionHeader
          title="Отзывы"
          subtitle="Впечатления покупателей"
        />
      </div>
      <ReviewsClient initial={reviews} />
    </div>
  )
}
