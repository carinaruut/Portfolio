import { defineCliConfig } from 'sanity/cli';

try {
  process.loadEnvFile(new URL('../.env', import.meta.url));
} catch {
  // Environment variables may also be supplied by the shell.
}

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  server: { hostname: 'localhost', port: 3333 },
});
