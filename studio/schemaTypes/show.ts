import { defineField, defineType } from 'sanity';

export const show = defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  fields: [
    defineField({ name: 'date', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'venue', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'city',
      type: 'string',
      description: 'e.g. "Los Angeles, CA"',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'ticketUrl', title: 'Ticket link', type: 'url' }),
    defineField({
      name: 'note',
      type: 'string',
      description: 'Optional, e.g. "Album release show" or "w/ Special Guest".',
    }),
    defineField({ name: 'soldOut', title: 'Sold out', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Date', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: {
    select: { venue: 'venue', city: 'city', date: 'date' },
    prepare: ({ venue, city, date }) => ({ title: `${date ?? '—'} · ${venue ?? ''}`, subtitle: city }),
  },
});
