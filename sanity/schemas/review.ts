import { defineField, defineType } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя покупателя',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Текст отзыва',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Оценка',
      type: 'number',
      options: {
        list: [
          { title: '★★★★★', value: 5 },
          { title: '★★★★', value: 4 },
          { title: '★★★', value: 3 },
          { title: '★★', value: 2 },
          { title: '★', value: 1 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'artwork',
      title: 'Работа (если к конкретной)',
      type: 'string',
    }),
    defineField({
      name: 'published',
      title: 'Опубликован',
      type: 'boolean',
      initialValue: false,
      description: 'Отзыв виден на сайте только после публикации',
    }),
    defineField({
      name: 'date',
      title: 'Дата',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'По дате (новые сначала)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'text',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle?.slice(0, 60),
      }
    },
  },
})
