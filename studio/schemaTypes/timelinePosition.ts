import { defineField, defineType } from 'sanity';

export const timelinePosition = defineType({
  name: 'timelinePosition',
  title: 'Position',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Position title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'For example: Feb 2023 - Jul 2025',
      validation: (rule) => rule.required().max(80),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'period' } },
});
