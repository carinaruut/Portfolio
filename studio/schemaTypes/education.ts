import { defineField, defineType } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qualification',
      title: 'Qualification',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'field',
      title: 'Field of study',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'endDate', title: 'End date', type: 'date' }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'institutionUrl',
      title: 'Institution URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'logo',
      title: 'Institution logo',
      type: 'image',
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      qualification: 'qualification',
      field: 'field',
      institution: 'institution',
      media: 'logo',
    },
    prepare: ({ qualification, field, institution, media }) => ({
      title: `${qualification} · ${field}`,
      subtitle: institution,
      media,
    }),
  },
});
