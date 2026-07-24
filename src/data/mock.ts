import { existsSync } from 'node:fs';
import { join } from 'node:path';
import portfolioCards from './portfolioCards.json';
import timeline from './timeline.json';
import type {
  ContentSection,
  Education,
  ProjectCategory,
  SiteContent,
  WorkExperience,
} from '../types';

const portfolioCategory: ProjectCategory = {
  id: 'category-portfolio',
  title: 'Portfolio',
  slug: 'portfolio',
  description: 'Web design, 3D work, and digital illustration collections.',
};

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
    description: 'description' in section ? section.description : undefined,
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

export const mockContent: SiteContent = {
  categories: [portfolioCategory],
  projects: portfolioCards.map((card) => ({
    id: `project-${card.slug}`,
    title: card.cardTitle,
    slug: card.slug,
    shortDescription: card.description,
    body: [card.description],
    mainImage: getPortfolioImage(card.img, card.imgAlt),
    gallery: [],
    category: portfolioCategory,
    technologies: [],
    featured: true,
    relatedProjectIds: [],
  })),
  workExperiences,
  education,
  profile: {
    name: 'Your Name',
    professionalTitle: 'Software Developer & Digital Creator',
    shortIntroduction:
      'I build maintainable software and explore web design, 3D objects, and digital illustration.',
    biography: [
      'I am a software developer with a practical full-stack background and a focus on maintainable systems, structured data, and clean code.',
      'Alongside software engineering, I enjoy creating website concepts, custom 3D objects, and digital illustrations.',
    ],
    email: 'hello@example.com',
    location: 'Estonia',
    skills: [
      '.NET',
      'C#',
      'TypeScript',
      'Vue',
      'SQL',
      'Web design',
      '3D design',
    ],
    socialLinks: [],
  },
};
