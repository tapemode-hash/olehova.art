import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'olehova-art',
  title: 'Ольхова — Портфолио',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.documentTypeListItem('artwork').title('Работы'),
            S.documentTypeListItem('doll').title('Куклы'),
            S.documentTypeListItem('exhibition').title('Выставки'),
            S.documentTypeListItem('review').title('Отзывы'),
            S.listItem()
              .title('О художнике')
              .child(
                S.document().schemaType('about').documentId('about')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
