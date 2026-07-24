import { defineField, defineType } from 'sanity';

export const workExperience = defineType({
  name: 'workExperience',
  title: 'Work experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      hidden: ({ parent }) => Boolean(parent?.current),
    }),
    defineField({
      name: 'current',
      title: 'Current role',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'companyUrl',
      title: 'Company URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'logo',
      title: 'Company logo',
      type: 'image',
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'role',
      company: 'company',
      current: 'current',
      media: 'logo',
    },
    prepare: ({ title, company, current, media }) => ({
      title,
      subtitle: `${company}${current ? ' · Current' : ''}`,
      media,
    }),
  },
});
