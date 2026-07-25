import type { SiteContent } from '../../types';
import { getMockContent } from './mock';
import { getSanityContent } from './sanity';

let contentPromise: Promise<SiteContent> | undefined;

async function loadContent(): Promise<SiteContent> {
  const useMockData = import.meta.env.PUBLIC_USE_MOCK_DATA !== 'false';
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-07-24';

  if (useMockData) return getMockContent();

  if (!projectId) {
    console.warn(
      'PUBLIC_USE_MOCK_DATA=false, but PUBLIC_SANITY_PROJECT_ID is missing. Falling back to local mock content.',
    );
    return getMockContent();
  }

  return getSanityContent({ projectId, dataset, apiVersion })
    .then((content) => {
      const fallback = getMockContent();
      return {
        profile: content.profile,
        projects:
          content.projects.length > 0 ? content.projects : fallback.projects,
        categories:
          content.categories.length > 0
            ? content.categories
            : fallback.categories,
        workExperiences:
          content.workExperiences.length > 0
            ? content.workExperiences
            : fallback.workExperiences,
        education:
          content.education.length > 0 ? content.education : fallback.education,
        coursesCertificates:
          content.coursesCertificates.length > 0
            ? content.coursesCertificates
            : fallback.coursesCertificates,
      };
    })
    .catch((error: unknown) => {
      const message =
        error instanceof Error ? error.message : 'Unknown Sanity error';
      console.warn(
        `Unable to load Sanity content (${message}). Falling back to local mock content.`,
      );
      return getMockContent();
    });
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
