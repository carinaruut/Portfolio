import { existsSync } from 'node:fs';
import { join } from 'node:path';
import coursesCertificatesData from './coursesCertificates.json';
import portfolioCards from './portfolioCards.json';
import portfolioItems from './portfolioItems.json';
import profile from './profile.json';
import timeline from './timeline.json';
import type {
  ContentSection,
  CourseCertificate,
  Education,
  Project,
  ProjectCategory,
  SiteContent,
  WorkExperience,
} from '../types';

const getPortfolioImage = (path: string, alt: string) => {
  const url = path.replace(/^\./, '');
  return {
    ...(existsSync(join(process.cwd(), 'public', url)) && { url }),
    alt,
  };
};

const toIsoDate = (value: string, end = false) => {
  const [month = 'Jan', year = '2000'] = value.trim().split(/\s+/);
  const monthIndex =
    [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ].indexOf(month.slice(0, 3).toLowerCase()) + 1;
  const day = end
    ? new Date(Date.UTC(Number(year), monthIndex, 0)).getUTCDate()
    : 1;
  return `${year}-${String(monthIndex).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const parsePeriod = (value: string) => {
  const [start = value, finish] = value.split(' - ');
  return {
    startDate: toIsoDate(start),
    endDate: finish ? toIsoDate(finish, true) : undefined,
  };
};

const getDetails = (entry: (typeof timeline)[number]): ContentSection[] =>
  (entry.additionals ?? []).map((section) => ({
    title: section.title,
    description:
      'description' in section && typeof section.description === 'string'
        ? section.description
        : undefined,
    items: [...section.items],
  }));

const education: Education[] = timeline
  .filter((entry) => 'preview' in entry)
  .map((entry) => {
    const dates = parsePeriod(entry.date);
    return {
      id: entry.id,
      institution: entry.title,
      qualification: entry.subtitle,
      field: '',
      ...dates,
      description: entry.preview ?? '',
      details: getDetails(entry),
    };
  })
  .reverse();

const workExperiences: WorkExperience[] = timeline
  .filter((entry) => 'positions' in entry)
  .map((entry) => {
    const positions = entry.positions ?? [];
    const latestPosition = positions.at(-1);
    const dates = parsePeriod(entry.date);
    return {
      id: entry.id,
      company: entry.title,
      role: latestPosition?.position ?? entry.subtitle,
      startDate: dates.startDate,
      current: true,
      description: entry.subtitle,
      positions: positions.map((position) => ({
        title: position.position,
        period: position.period,
      })),
      details: getDetails(entry),
    };
  })
  .reverse();

const coursesCertificates: CourseCertificate[] = coursesCertificatesData
  .map((item) => ({ ...item, kind: item.kind as CourseCertificate['kind'] }))
  .sort((a, b) => b.completedAt.localeCompare(a.completedAt));

const categories: ProjectCategory[] = portfolioCards.map((card) => ({
  id: `category-${card.slug}`,
  title: card.cardTitle,
  slug: card.slug,
  description: card.description,
  image: getPortfolioImage(card.img, card.imgAlt),
}));

const projects: Project[] = portfolioItems.flatMap((item) => {
  const category = categories.find(
    (category) => category.slug === item.categorySlug,
  );
  if (!category) return [];

  return [
    {
      id: `project-${item.id}`,
      title: item.title,
      slug: item.slug,
      publishedAt: item.publishedAt,
      shortDescription: item.description,
      body: item.body,
      mainImage: getPortfolioImage(item.img, item.imgAlt),
      gallery: [],
      category,
      technologies: item.tags,
      featured: item.featured,
      relatedProjectIds: [],
    },
  ];
});

export const mockContent: SiteContent = {
  categories,
  projects,
  workExperiences,
  education,
  coursesCertificates,
  profile,
};
