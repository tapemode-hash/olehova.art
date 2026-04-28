export const metadata = {
  title: 'Sanity Studio · Олехова',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
