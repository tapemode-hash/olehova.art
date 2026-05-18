'use client'

import { useSearchParams } from 'next/navigation'

const inputCls = 'w-full bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200'
const labelCls = 'block text-xs tracking-widest uppercase text-gold mb-2'
const labelStyle = { fontFamily: "'Cormorant Garamond', Georgia, serif" }
const fieldStyle = { fontFamily: "'Lora', Georgia, serif" }

const DELIVERY_OPTIONS = [
  { value: 'cdek', label: 'СДЭК' },
  { value: 'pochta', label: 'Почта России' },
  { value: 'boxberry', label: 'Boxberry' },
  { value: 'yandex', label: 'Яндекс Доставка' },
  { value: 'pickup', label: 'Самовывоз (Москва)' },
]

export function ContactForm() {
  const searchParams = useSearchParams()
  const workParam = searchParams.get('work') ?? ''
  const paid = searchParams.get('paid') === 'true'

  return (
    <>
      {paid && workParam && (
        <div
          className="mb-8 p-4 border border-gold/40 bg-parchment-dark text-sm"
          style={fieldStyle}
        >
          Вы оплатили работу <strong>«{workParam}»</strong> через СБП.
          Укажите адрес и способ доставки — я свяжусь для подтверждения.
        </div>
      )}

      <form
        action="mailto:olekhova.anastasiya@yandex.ru"
        method="post"
        encType="text/plain"
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className={labelCls} style={labelStyle}>Ваше имя</label>
          <input id="name" name="name" type="text" required className={inputCls} style={fieldStyle} />
        </div>

        <div>
          <label htmlFor="email" className={labelCls} style={labelStyle}>Email</label>
          <input id="email" name="email" type="email" required className={inputCls} style={fieldStyle} />
        </div>

        <div>
          <label htmlFor="phone" className={labelCls} style={labelStyle}>Телефон</label>
          <input
            id="phone" name="phone" type="tel"
            className={inputCls} style={fieldStyle}
            placeholder="+7 (___) ___-__-__"
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelCls} style={labelStyle}>Тема</label>
          <select
            id="subject" name="subject"
            defaultValue="artwork"
            className="w-full bg-parchment border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200"
            style={fieldStyle}
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
            <label htmlFor="work" className={labelCls} style={labelStyle}>Работа</label>
            <input
              id="work" name="work" type="text"
              defaultValue={workParam}
              className={inputCls} style={fieldStyle}
            />
          </div>
        )}

        {/* Блок доставки — только после оплаты */}
        {paid && (
          <>
            <div className="hr-ornate" />
            <p
              className="text-xs tracking-widest uppercase text-gold"
              style={labelStyle}
            >
              Доставка
            </p>

            <div>
              <label htmlFor="delivery" className={labelCls} style={labelStyle}>
                Способ доставки
              </label>
              <select
                id="delivery" name="delivery"
                className="w-full bg-parchment border-b border-ink/30 focus:border-gold outline-none py-2 text-ink transition-colors duration-200"
                style={fieldStyle}
              >
                {DELIVERY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className={labelCls} style={labelStyle}>Город</label>
              <input
                id="city" name="city" type="text"
                required={paid}
                placeholder="Москва"
                className={inputCls} style={fieldStyle}
              />
            </div>

            <div>
              <label htmlFor="address" className={labelCls} style={labelStyle}>
                Адрес (улица, дом, квартира)
              </label>
              <input
                id="address" name="address" type="text"
                required={paid}
                placeholder="ул. Пушкина, д. 10, кв. 5"
                className={inputCls} style={fieldStyle}
              />
            </div>

            <div>
              <label htmlFor="index" className={labelCls} style={labelStyle}>
                Почтовый индекс
              </label>
              <input
                id="index" name="index" type="text"
                placeholder="123456"
                className={inputCls} style={fieldStyle}
              />
            </div>
            <div className="hr-ornate" />
          </>
        )}

        {!paid && (
          <div>
            <label htmlFor="time" className={labelCls} style={labelStyle}>
              Удобное время для связи
            </label>
            <input
              id="time" name="time" type="text"
              className={inputCls} style={fieldStyle}
              placeholder="например: будни с 10 до 19"
            />
          </div>
        )}

        <div>
          <label htmlFor="message" className={labelCls} style={labelStyle}>Сообщение</label>
          <textarea
            id="message" name="message" rows={5} required
            defaultValue={
              paid && workParam
                ? `Оплатил по СБП за работу «${workParam}». Прошу подтвердить получение.`
                : ''
            }
            className="w-full bg-transparent border border-ink/20 focus:border-gold outline-none p-3 text-ink resize-none transition-colors duration-200"
            style={fieldStyle}
          />
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-primary w-full">
            Отправить
          </button>
        </div>
      </form>
    </>
  )
}
