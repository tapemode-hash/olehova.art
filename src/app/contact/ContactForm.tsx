'use client'

import { useSearchParams } from 'next/navigation'

export function ContactForm() {
  const searchParams = useSearchParams()
  const workParam = searchParams.get('work') ?? ''

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
          htmlFor="phone"
          className="block text-xs tracking-widest uppercase text-gold mb-2"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
          placeholder="+7 (___) ___-__-__"
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
          defaultValue={workParam ? 'artwork' : 'artwork'}
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

      {workParam && (
        <div>
          <label
            htmlFor="work"
            className="block text-xs tracking-widest uppercase text-gold mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Работа
          </label>
          <input
            id="work"
            name="work"
            type="text"
            defaultValue={workParam}
            className="w-full bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          />
        </div>
      )}

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
