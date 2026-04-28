import { SectionHeader } from '@/components/ui/Ornament'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Контакт',
  description: 'Связаться с художником Анастасией Олеховой.',
}

export default function ContactPage() {
  return (
    <div className="pt-6 pb-16">
      <div className="page-container">
        <SectionHeader
          title="Контакт"
          subtitle="Напишите мне"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          {/* Контактная информация */}
          <div>
            <h2
              className="text-3xl text-ink mb-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Буду рада услышать вас
            </h2>

            <p
              className="text-ink-light mb-10 leading-relaxed"
              style={{ fontFamily: "'Lora', Georgia, serif", lineHeight: '1.8' }}
            >
              Если вас интересует приобретение работ, сотрудничество, участие в выставке
              или вы просто хотите поделиться впечатлениями — напишите мне.
              Я отвечаю в течение нескольких дней.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-gold text-2xl mt-0.5" aria-hidden="true">✉</span>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase text-gold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:art@olehova.art"
                    className="text-ink hover:text-crimson transition-colors"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                  >
                    art@olehova.art
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-gold text-2xl mt-0.5" aria-hidden="true">◉</span>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase text-gold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Социальные сети
                  </p>
                  <div className="flex flex-col gap-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                    <a
                      href="https://www.instagram.com/olehova_anastasiya?igsh=MW9xNG9hbHZxc2ZwZA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-crimson transition-colors"
                    >
                      Instagram — @olehova_anastasiya
                    </a>
                    <a
                      href="https://vk.com/id682236515"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-crimson transition-colors"
                    >
                      ВКонтакте — @id682236515
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="frame-ornate">
            <Suspense fallback={<div />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
