import { defineField, defineType } from 'sanity'

export const doll = defineType({
  name: 'doll',
  title: 'Кукла',
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
      name: 'material',
      title: 'Материал',
      type: 'string',
      options: {
        list: [
          { title: 'Полимерная глина', value: 'polymer_clay' },
          { title: 'Папье-маше', value: 'papier_mache' },
          { title: 'Текстиль', value: 'textile' },
          { title: 'Смешанные материалы', value: 'mixed' },
          { title: 'Керамика', value: 'ceramic' },
        ],
      },
    }),
    defineField({
      name: 'height',
      title: 'Высота (см)',
      type: 'number',
    }),
    defineField({
      name: 'images',
      title: 'Изображения',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Описание',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'available',
      title: 'Доступна для приобретения',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Цена (руб.)',
      type: 'number',
      hidden: ({ document }) => !document?.available,
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
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
  ],
  preview: {
    select: {
      title: 'title',
      material: 'material',
      media: 'images.0',
    },
    prepare({ title, material, media }) {
      return { title, subtitle: material, media }
    },
  },
})
