import { SectionHeader } from '@/components/ui/Ornament'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакт',
  description: 'Связаться с художником Анастасией Олеховой.',
}

export default function ContactPage() {
  return (
    <div className="py-16">
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
                    <a href="#" className="text-ink hover:text-crimson transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-ink hover:text-crimson transition-colors">
                      ВКонтакте
                    </a>
                    <a href="#" className="text-ink hover:text-crimson transition-colors">
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="frame-ornate">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactForm() {
  return (
    <form
      action="mailto:art@olehova.art"
      method="post"
      encType="text/plain"
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-xs tracking-widest uppercase text-gold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Ваше имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs tracking-widest uppercase text-gold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-xs tracking-widest uppercase text-gold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Тема
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full bg-parchment border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          <option value="artwork">Приобретение работы</option>
          <option value="doll">Авторские куклы</option>
          <option value="commission">Заказ работы</option>
          <option value="exhibition">Сотрудничество / Выставка</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-widest uppercase text-gold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Сообщение
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full bg-transparent border border-ink/20 focus:border-gold outline-none p-3 text-ink resize-none transition-colors duration-200"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        />
      </div>

      <div className="pt-2">
        <button type="submit" className="btn-primary w-full">
          Отправить
        </button>
      </div>
    </form>
  )
}
