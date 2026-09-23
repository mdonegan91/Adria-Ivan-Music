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
      initialValue: 'Pre-order',
      description: 'Change to "Buy" after release day.',
    }),
    defineField({
      name: 'song',
      title: 'Song to play',
      type: 'file',
      options: { accept: 'audio/mpeg,audio/mp4,audio/*' },
      description: 'Optional. An MP3 (full song or a short preview) for the player on the home page.',
      fields: [
        defineField({ name: 'title', title: 'Song title', type: 'string', validation: (r) => r.required() }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'releaseDate', media: 'cover' },
  },
});
