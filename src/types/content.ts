export interface ImageAsset {
  url?: string;
  assetRef?: string;
  alt: string;
}

export interface ProjectCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  shortDescription: string;
  mainImage?: ImageAsset;
  category: ProjectCategory;
  technologies: string[];
  featured: boolean;
}

export interface Project extends ProjectSummary {
  body: string[];
  gallery: ImageAsset[];
  projectUrl?: string;
  sourceUrl?: string;
  relatedProjectIds: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  professionalTitle: string;
  shortIntroduction: string;
  biography: string[];
  profileImage?: ImageAsset;
  email: string;
  location?: string;
  skills: string[];
  socialLinks: SocialLink[];
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  companyUrl?: string;
  logo?: ImageAsset;
  positions?: TimelinePosition[];
  details?: ContentSection[];
}

export interface Education {
  id: string;
  institution: string;
  qualification: string;
  field: string;
  startDate: string;
  endDate?: string;
  description: string;
  institutionUrl?: string;
  logo?: ImageAsset;
  details?: ContentSection[];
}

export interface TimelinePosition {
  title: string;
  period: string;
}

export interface ContentSection {
  title: string;
  description?: string;
  items: string[];
}

export interface SiteContent {
  projects: Project[];
  categories: ProjectCategory[];
  workExperiences: WorkExperience[];
  education: Education[];
  profile: Profile;
}
