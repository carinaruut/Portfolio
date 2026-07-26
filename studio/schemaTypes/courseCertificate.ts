import { defineArrayMember, defineField, defineType } from 'sanity';

export const courseCertificate = defineType({
  name: 'courseCertificate',
  title: 'Courses and certificates',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Course', value: 'course' },
          { title: 'Certificate', value: 'certificate' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'completedAt',
      title: 'Completion date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(1200),
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF file',
      description: 'Upload the course or certificate document as a PDF.',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      provider: 'provider',
      kind: 'kind',
    },
    prepare: ({ title, provider, kind }) => ({
      title,
      subtitle: `${kind === 'course' ? 'Course' : 'Certificate'} · ${provider}`,
    }),
  },
});
