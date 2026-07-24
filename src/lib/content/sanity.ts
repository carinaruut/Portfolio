import { createClient } from '@sanity/client';
import type { SiteContent } from '../../types';
import { siteContentQuery } from './queries';

interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
}

export async function getSanityContent(
  config: SanityConfig,
): Promise<SiteContent> {
  const client = createClient({
    ...config,
    useCdn: true,
    perspective: 'published',
  });

  const content = await client.fetch<SiteContent>(siteContentQuery);

  if (!content.profile) {
    throw new Error(
      'Sanity is connected, but no profile document was found. Create the profile in Studio or enable mock data.',
    );
  }

  return content;
}
