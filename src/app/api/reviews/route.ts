import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'da3pwhay',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function GET() {
  try {
    const reviews = await writeClient.fetch(
      `*[_type == "review" && published == true] | order(date desc) {
        _id, name, text, rating, artwork, date
      }`
    )
    return NextResponse.json(reviews)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, text, rating, artwork } = body

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json({ error: 'Имя и текст обязательны' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'review',
      name: name.trim(),
      text: text.trim(),
      rating: rating ?? 5,
      artwork: artwork?.trim() || undefined,
      published: false,
      date: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Ошибка сохранения' }, { status: 500 })
  }
}
