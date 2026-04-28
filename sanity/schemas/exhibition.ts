import { defineField, defineType } from 'sanity'

export const exhibition = defineType({
  name: 'exhibition',
  title: 'Выставка',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Тип',
      type: 'string',
      options: {
        list: [
          { title: 'Персональная', value: 'solo' },
          { title: 'Групповая', value: 'group' },
          { title: 'Ярмарка', value: 'fair' },
        ],
      },
    }),
    defineField({
      name: 'venue',
      title: 'Место проведения',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'Город',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Страна',
      type: 'string',
      initialValue: 'Россия',
    }),
    defineField({
      name: 'dateStart',
      title: 'Дата начала',
      type: 'date',
      options: { dateFormat: 'DD.MM.YYYY' },
    }),
    defineField({
      name: 'dateEnd',
      title: 'Дата окончания',
      type: 'date',
      options: { dateFormat: 'DD.MM.YYYY' },
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Фото с выставки',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'upcoming',
      title: 'Предстоящая',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'По дате (новые сначала)',
      name: 'dateDesc',
      by: [{ field: 'dateStart', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      venue: 'venue',
      city: 'city',
      dateStart: 'dateStart',
      media: 'image',
    },
    prepare({ title, venue, city, dateStart, media }) {
      const year = dateStart ? new Date(dateStart).getFullYear() : ''
      return {
        title,
        subtitle: [year, venue, city].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
