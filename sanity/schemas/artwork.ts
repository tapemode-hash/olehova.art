import { defineField, defineType } from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Работа',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-идентификатор',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technique',
      title: 'Техника',
      type: 'string',
      options: {
        list: [
          { title: 'Акварель', value: 'watercolor' },
          { title: 'Масло', value: 'oil' },
          { title: 'Графика', value: 'graphics' },
          { title: 'Смешанная техника', value: 'mixed' },
          { title: 'Тушь', value: 'ink' },
          { title: 'Пастель', value: 'pastel' },
          { title: 'Цифровая иллюстрация', value: 'digital' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Год',
      type: 'number',
    }),
    defineField({
      name: 'dimensions',
      title: 'Размеры (см)',
      type: 'string',
      placeholder: 'например: 40 × 60',
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'price',
      title: 'Стоимость (руб.)',
      type: 'number',
    }),
    defineField({
      name: 'available',
      title: 'Доступна для приобретения',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Показать на главной',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Порядок (меньше = выше)',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'По порядку',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'По году (новые сначала)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      technique: 'technique',
      media: 'image',
    },
    prepare({ title, technique, media }) {
      const techniqueLabels: Record<string, string> = {
        watercolor: 'Акварель',
        oil: 'Масло',
        graphics: 'Графика',
        mixed: 'Смешанная',
        ink: 'Тушь',
        pastel: 'Пастель',
        digital: 'Цифровая',
      }
      return {
        title,
        subtitle: techniqueLabels[technique] ?? technique,
        media,
      }
    },
  },
})
