import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

try {
  process.loadEnvFile(new URL('../.env', import.meta.url));
} catch {
  // Environment variables may also be supplied by the shell.
}

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

if (!projectId) {
  throw new Error(
    'SANITY_STUDIO_PROJECT_ID is required to run Sanity Studio. Add it to your .env file.',
  );
}

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Profile')
              .id('profile')
              .child(S.document().schemaType('profile').documentId('profile')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'profile',
            ),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (previous) =>
      previous.filter((template) => template.templateId !== 'profile'),
    actions: (previous, context) =>
      context.schemaType === 'profile'
        ? previous.filter(
            ({ action }) => action !== 'delete' && action !== 'duplicate',
          )
        : previous,
  },
});
