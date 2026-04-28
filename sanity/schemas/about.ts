import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'О художнике',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя',
      type: 'string',
      initialValue: 'Анастасия Ольхова',
    }),
    defineField({
      name: 'tagline',
      title: 'Подзаголовок / девиз',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Фото',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Биография',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'statement',
      title: 'Художественное заявление',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'education',
      title: 'Образование',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Год', type: 'string' }),
            defineField({ name: 'institution', title: 'Учреждение', type: 'string' }),
            defineField({ name: 'degree', title: 'Специальность', type: 'string' }),
          ],
          preview: {
            select: { title: 'institution', subtitle: 'year' },
          },
        },
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Награды и премии',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Год', type: 'string' }),
            defineField({ name: 'title', title: 'Название', type: 'string' }),
            defineField({ name: 'description', title: 'Описание', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' },
          },
        },
      ],
    }),
    defineField({
      name: 'contacts',
      title: 'Контакты',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'vk', title: 'ВКонтакте', type: 'url' }),
        defineField({ name: 'telegram', title: 'Telegram', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photo' },
  },
})
