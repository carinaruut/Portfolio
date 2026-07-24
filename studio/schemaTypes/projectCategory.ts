import { defineField, defineType } from 'sanity';

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(10).max(240),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});
