import type { SiteContent } from '../../types';
import { getSanityContent } from './sanity';

let contentPromise: Promise<SiteContent> | undefined;

async function loadContent(): Promise<SiteContent> {
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-07-24';

  if (!projectId) {
    throw new Error(
      'PUBLIC_SANITY_PROJECT_ID is required. Add it to your .env file.',
    );
  }

  return getSanityContent({ projectId, dataset, apiVersion });
}

export function getSiteContent(): Promise<SiteContent> {
  if (import.meta.env.DEV) return loadContent();

  contentPromise ??= loadContent();
  return contentPromise;
}

export async function getProjectBySlug(slug: string) {
  const { projects } = await getSiteContent();
  return projects.find((project) => project.slug === slug);
}

export async function getProjectsByCategory(slug: string) {
  const { projects } = await getSiteContent();
  return projects.filter((project) => project.category.slug === slug);
}

export async function getRelatedProjects(projectId: string) {
  const { projects } = await getSiteContent();
  const project = projects.find((item) => item.id === projectId);
  if (!project) return [];

  const manual = project.relatedProjectIds
    .map((id) => projects.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (manual.length > 0) return manual;

  return projects
    .filter(
      (item) =>
        item.id !== project.id && item.category.id === project.category.id,
    )
    .slice(0, 3);
}
