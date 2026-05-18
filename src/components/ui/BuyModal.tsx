'use client'

import { useState } from 'react'

const SBP_PHONE = '89642955291'
const SBP_PHONE_FORMATTED = '8 (964) 295-52-91'
const SBP_BANK = 'Тинькофф'

interface BuyModalProps {
  title: string
  price: number
}

export function BuyModal({ title, price }: BuyModalProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(SBP_PHONE)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary">
        Купить · {price.toLocaleString('ru-RU')} ₽
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(28,20,16,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-parchment w-full max-w-md relative"
            style={{ border: '1px solid rgba(201,168,76,0.4)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="flex items-start justify-between p-6 pb-0">
              <div>
                <h2
                  className="text-2xl text-ink"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                >
                  Оплата через СБП
                </h2>
                <p
                  className="text-ink-light text-sm mt-1 italic"
                  style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                  «{title}»
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-light hover:text-ink transition-colors text-xl leading-none ml-4 mt-1"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className="hr-ornate mx-6" />

            {/* Реквизиты */}
            <div className="px-6 space-y-5">
              <div>
                <p
                  className="text-xs tracking-widest uppercase text-gold mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Сумма
                </p>
                <p
                  className="text-3xl text-crimson"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300 }}
                >
                  {price.toLocaleString('ru-RU')} ₽
                </p>
              </div>

              <div>
                <p
                  className="text-xs tracking-widest uppercase text-gold mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Номер телефона · СБП
                </p>
                <div className="flex items-center gap-3">
                  <p
                    className="text-xl text-ink"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {SBP_PHONE_FORMATTED}
                  </p>
                  <button
                    onClick={copy}
                    className={`text-xs tracking-widest uppercase px-3 py-1 border transition-all duration-200 ${
                      copied
                        ? 'bg-gold border-gold text-ink'
                        : 'border-gold/50 text-gold hover:bg-gold hover:text-ink'
                    }`}
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {copied ? '✓ Скопировано' : 'Копировать'}
                  </button>
                </div>
              </div>

              <div>
                <p
                  className="text-xs tracking-widest uppercase text-gold mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Банк получателя
                </p>
                <p style={{ fontFamily: "'Lora', Georgia, serif" }} className="text-ink">
                  {SBP_BANK}
                </p>
              </div>
            </div>

            <div className="hr-ornate mx-6" />

            {/* Инструкция */}
            <ol
              className="px-6 space-y-2 text-sm text-ink-light"
              style={{ fontFamily: "'Lora', Georgia, serif", lineHeight: 1.7 }}
            >
              <li>1. Откройте приложение банка → Переводы → По номеру СБП</li>
              <li>2. Введите номер <strong className="text-ink">{SBP_PHONE_FORMATTED}</strong> и сумму <strong className="text-ink">{price.toLocaleString('ru-RU')} ₽</strong></li>
              <li>
                3. В комментарии к переводу напишите:{' '}
                <em className="text-ink">«{title}»</em>
              </li>
              <li>4. После оплаты нажмите кнопку ниже — я свяжусь с вами</li>
            </ol>

            {/* Кнопка подтверждения */}
            <div className="p-6 pt-6">
              <a
                href={`/contact?work=${encodeURIComponent(title)}&paid=true`}
                className="btn-primary block text-center"
              >
                Я оплатил — подтвердить
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
