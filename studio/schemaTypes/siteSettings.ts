import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'about', title: 'About' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({
      name: 'artistName',
      title: 'Artist name',
      type: 'string',
      initialValue: 'Adria Ivan',
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'Small line above the album title, e.g. "New album — pre-order now".',
      group: 'general',
    }),
    defineField({
      name: 'featuredRelease',
      title: 'Featured release',
      type: 'reference',
      to: [{ type: 'release' }],
      description: 'The release shown on the home page.',
      group: 'general',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Shown in the header and footer.',
      group: 'general',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Other links',
      type: 'array',
      description: 'Extra footer links: Spotify, YouTube, etc.',
      group: 'general',
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
    defineField({
      name: 'about',
      title: 'About',
      type: 'array',
      description: 'Shown in the About section on the home page. Leave empty to hide it.',
      group: 'about',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Bold', value: 'strong' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'contactIntro',
      title: 'Contact intro',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactEmails',
      title: 'Contact emails',
      type: 'array',
      description: 'e.g. Booking, Press, Management.',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactEmail',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'email', type: 'email', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'email' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
