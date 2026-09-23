import { defineField, defineType } from 'sanity';

export const release = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'releaseDate', title: 'Release date', type: 'date' }),
    defineField({
      name: 'cover',
      title: 'Cover art',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the artwork for screen readers.',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Optional. One or two sentences shown under the title.',
    }),
    defineField({
      name: 'bandcampUrl',
      title: 'Bandcamp pre-order URL',
      type: 'url',
      validation: (r) => r.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      initialValue: 'Pre-order on Bandcamp',
      description: 'Change to "Buy on Bandcamp" after release day.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'releaseDate', media: 'cover' },
  },
});
