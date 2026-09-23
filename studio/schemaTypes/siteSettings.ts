import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'artistName', title: 'Artist name', type: 'string', initialValue: 'Adria Ivan' }),
    defineField({ name: 'tagline', type: 'string', description: 'Short line under the name.' }),
    defineField({
      name: 'featuredRelease',
      title: 'Featured release',
      type: 'reference',
      to: [{ type: 'release' }],
      description: 'The release shown on the landing page.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'url', type: 'url', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
