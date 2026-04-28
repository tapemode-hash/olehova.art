import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Анастасия Олехова — Художник',
    template: '%s · Анастасия Олехова',
  },
  description:
    'Портфолио художника и иллюстратора Анастасии Олеховой. Акварель, графика, авторские куклы.',
  openGraph: {
    siteName: 'Анастасия Олехова',
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" style={{ colorScheme: 'light', backgroundColor: '#F5F0E8' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="color-scheme" content="light" />
      </head>
      <body style={{ backgroundColor: '#F5F0E8' }}>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
