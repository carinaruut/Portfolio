import { defineArrayMember, defineField, defineType } from 'sanity';

const isSupportedVideoUrl = (value: string) => {
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol)) return false;

    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const path = url.pathname.split('/').filter(Boolean);

    if (host === 'youtu.be') {
      return /^[\w-]{11}$/.test(path[0] ?? '');
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const videoId =
        url.pathname === '/watch'
          ? url.searchParams.get('v')
          : ['embed', 'live', 'shorts'].includes(path[0] ?? '')
            ? path[1]
            : undefined;
      return /^[\w-]{11}$/.test(videoId ?? '');
    }

    return (
      host === 'instagram.com' &&
      ['p', 'reel', 'reels', 'tv'].includes(path[0] ?? '') &&
      /^[\w-]+$/.test(path[1] ?? '')
    );
  } catch {
    return false;
  }
};

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      description: 'Optional summary shown on project cards and page headers.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.min(20).max(220),
    }),
    defineField({
      name: 'body',
      title: 'Full description',
      description: 'Optional longer description shown on the project page.',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'model3d',
      title: 'Interactive 3D model',
      description:
        'Upload an optimized GLB exported from Blender. Keep the original .blend file private.',
      type: 'file',
      options: { accept: '.glb,model/gltf-binary' },
      fields: [
        defineField({
          name: 'alt',
          title: 'Model description',
          description:
            'Describe the model for visitors who cannot see the interactive preview.',
          type: 'string',
          validation: (rule) => rule.required().max(240),
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { videoUrl?: string } | undefined;
          return value && parent?.videoUrl
            ? 'Use either an interactive 3D model or a video, not both.'
            : true;
        }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      description:
        'Paste a YouTube video, Short, or Instagram post/reel URL to play it on the project page.',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).custom((value, context) => {
          if (!value) return true;

          const parent = context.parent as { model3d?: unknown } | undefined;
          if (parent?.model3d) {
            return 'Use either a video or an interactive 3D model, not both.';
          }

          return isSupportedVideoUrl(value)
            ? true
            : 'Enter a valid YouTube or Instagram video URL.';
        }),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies or tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'projectUrl',
      title: 'External project URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source-code URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related projects',
      description: 'Leave empty to show projects from the same category.',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      validation: (rule) => rule.unique().max(3),
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'mainImage',
      featured: 'featured',
    },
    prepare: ({ title, subtitle, media, featured }) => ({
      title,
      subtitle: `${featured ? 'Featured · ' : ''}${subtitle ?? 'Uncategorized'}`,
      media,
    }),
  },
});
