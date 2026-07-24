import type { SiteContent } from '../types';

const image = (seed: string, alt: string) => ({
  url: `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1400&q=80`,
  alt,
});

export const mockContent: SiteContent = {
  categories: [
    {
      id: 'category-web',
      title: 'Web Development',
      slug: 'web-development',
      description: 'Accessible, fast websites and thoughtful digital products.',
    },
    {
      id: 'category-brand',
      title: 'Brand & Identity',
      slug: 'brand-identity',
      description:
        'Visual systems that make organizations recognizable and clear.',
    },
    {
      id: 'category-experiment',
      title: 'Experiments',
      slug: 'experiments',
      description:
        'Small explorations in interaction, data, and creative technology.',
    },
  ],
  projects: [
    {
      id: 'project-field-notes',
      title: 'Field Notes Journal',
      slug: 'field-notes-journal',
      publishedAt: '2026-05-12',
      shortDescription:
        'A calm publishing platform for stories from the outdoors.',
      body: [
        'Field Notes is a concept for an editorial team sharing practical guides and first-person stories from remote places.',
        'The design prioritizes readable typography, resilient image layouts, and a clear path through related stories.',
      ],
      mainImage: image(
        '1500530855697-b586d89ba3ee',
        'Mountain landscape at sunrise',
      ),
      gallery: [
        image('1464822759023-fed622ff2c3b', 'Notebook and pencil on a desk'),
        image('1473448912268-2022ce9509d8', 'Forest path in soft daylight'),
      ],
      category: {
        id: 'category-web',
        title: 'Web Development',
        slug: 'web-development',
        description:
          'Accessible, fast websites and thoughtful digital products.',
      },
      technologies: ['Astro', 'TypeScript', 'Sanity'],
      featured: true,
      projectUrl: 'https://example.com',
      relatedProjectIds: ['project-civic-map'],
    },
    {
      id: 'project-northline',
      title: 'Northline Identity',
      slug: 'northline-identity',
      publishedAt: '2026-02-18',
      shortDescription:
        'A flexible identity for a neighborhood architecture studio.',
      body: [
        'Northline needed an identity that felt precise without becoming cold. The system pairs a direct wordmark with warm, material-led photography.',
        'A compact set of layout rules lets the team create proposals, signage, and project stories consistently.',
      ],
      mainImage: image(
        '1497366811353-6870744d04b2',
        'Minimal modern office interior',
      ),
      gallery: [
        image(
          '1494438639946-1ebd1d20bf85',
          'Design materials arranged on a table',
        ),
      ],
      category: {
        id: 'category-brand',
        title: 'Brand & Identity',
        slug: 'brand-identity',
        description:
          'Visual systems that make organizations recognizable and clear.',
      },
      technologies: ['Art direction', 'Typography', 'Identity'],
      featured: true,
      relatedProjectIds: [],
    },
    {
      id: 'project-civic-map',
      title: 'Civic Services Map',
      slug: 'civic-services-map',
      publishedAt: '2025-11-04',
      shortDescription:
        'A clear directory for finding nearby community services.',
      body: [
        'This prototype explores how residents could find essential local services without navigating the structure of local government.',
        'The interface is designed for low-bandwidth devices and supports browsing by need, place, or opening time.',
      ],
      mainImage: image(
        '1524661135-423995f22d0b',
        'City map and travel planning materials',
      ),
      gallery: [],
      category: {
        id: 'category-web',
        title: 'Web Development',
        slug: 'web-development',
        description:
          'Accessible, fast websites and thoughtful digital products.',
      },
      technologies: ['Accessibility', 'Maps', 'Prototyping'],
      featured: false,
      sourceUrl: 'https://github.com/example',
      relatedProjectIds: [],
    },
    {
      id: 'project-sound-archive',
      title: 'Everyday Sound Archive',
      slug: 'everyday-sound-archive',
      publishedAt: '2025-07-21',
      shortDescription:
        'An interactive study of familiar sounds and the places they evoke.',
      body: [
        'The archive is a small creative coding experiment that groups field recordings by texture, rhythm, and location.',
        'Visitors can move through visual clusters while keeping playback controls predictable and keyboard accessible.',
      ],
      mainImage: image(
        '1516280440614-37939bbacd81',
        'Headphones beside audio equipment',
      ),
      gallery: [
        image(
          '1590602847861-f357a9332bbc',
          'Microphone prepared for recording',
        ),
      ],
      category: {
        id: 'category-experiment',
        title: 'Experiments',
        slug: 'experiments',
        description:
          'Small explorations in interaction, data, and creative technology.',
      },
      technologies: ['Web Audio', 'Data visualization', 'JavaScript'],
      featured: false,
      relatedProjectIds: [],
    },
  ],
  workExperiences: [
    {
      id: 'work-studio-common',
      company: 'Studio Common',
      role: 'Senior Digital Designer',
      startDate: '2023-04-01',
      current: true,
      description:
        'Designing and building clear digital products with small, multidisciplinary teams.',
      companyUrl: 'https://example.com',
    },
    {
      id: 'work-north-co',
      company: 'North & Co.',
      role: 'Product Designer',
      startDate: '2020-01-01',
      endDate: '2023-03-01',
      current: false,
      description:
        'Led product design for publishing and community-focused client work.',
    },
  ],
  education: [
    {
      id: 'education-design',
      institution: 'City School of Design',
      qualification: 'BA',
      field: 'Communication Design',
      startDate: '2016-09-01',
      endDate: '2019-06-01',
      description:
        'Focused on digital editorial design, typography, and interaction.',
      institutionUrl: 'https://example.com',
    },
    {
      id: 'education-code',
      institution: 'Open Technology Institute',
      qualification: 'Certificate',
      field: 'Creative Web Development',
      startDate: '2021-02-01',
      endDate: '2021-08-01',
      description:
        'Built accessible, data-driven projects with modern web standards.',
    },
  ],
  profile: {
    name: 'Your Name',
    professionalTitle: 'Designer & Developer',
    shortIntroduction:
      'I create useful, expressive digital experiences with a focus on clarity, accessibility, and lasting craft.',
    biography: [
      'I am a multidisciplinary designer and developer who enjoys turning complex ideas into approachable digital experiences.',
      'My practice moves between product thinking, visual design, and front-end development. I value simple systems, close collaboration, and work that remains useful over time.',
    ],
    profileImage: image(
      '1500648767791-00dcc994a43e',
      'Portrait placeholder for Your Name',
    ),
    email: 'hello@example.com',
    location: 'Based in Your City',
    skills: [
      'Product design',
      'Front-end development',
      'Design systems',
      'Accessibility',
      'Prototyping',
      'Content strategy',
    ],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    ],
  },
};
