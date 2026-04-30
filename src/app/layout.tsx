import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Анастасия Олехова — Художник и иллюстратор',
    template: '%s · Анастасия Олехова',
  },
  description:
    'Портфолио художника и иллюстратора Анастасии Олеховой. Акварель, графика, авторские куклы. Открыта к сотрудничеству.',
  keywords: ['художник', 'иллюстратор', 'акварель', 'графика', 'авторские куклы', 'Олехова', 'живопись', 'портфолио'],
  authors: [{ name: 'Анастасия Олехова' }],
  creator: 'Анастасия Олехова',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Анастасия Олехова',
    locale: 'ru_RU',
    type: 'website',
    title: 'Анастасия Олехова — Художник и иллюстратор',
    description: 'Портфолио художника и иллюстратора Анастасии Олеховой. Акварель, графика, авторские куклы.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Анастасия Олехова',
            jobTitle: 'Художник и иллюстратор',
            url: 'https://olehova-art.vercel.app',
            email: 'olekhova.anastasiya@yandex.ru',
            sameAs: [
              'https://www.instagram.com/olehova_anastasiya',
              'https://vk.com/id682236515',
            ],
            knowsAbout: ['акварель', 'графика', 'иллюстрация', 'авторские куклы', 'живопись'],
          })}}
        />
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
