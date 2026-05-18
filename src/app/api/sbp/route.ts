import { NextResponse } from 'next/server'

export async function GET() {
  const phone = process.env.SBP_PHONE
  const bank = process.env.SBP_BANK ?? 'Тинькофф'

  if (!phone) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  return NextResponse.json({ phone, bank })
}
