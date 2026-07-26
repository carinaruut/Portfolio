export interface ImageAsset {
  url?: string;
  assetRef?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Model3DAsset {
  url: string;
  alt: string;
  fileName?: string;
  size?: number;
}

export interface ProjectCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: ImageAsset;
}

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  shortDescription?: string;
  mainImage?: ImageAsset;
  category: ProjectCategory;
  technologies: string[];
  featured: boolean;
}

export interface Project extends ProjectSummary {
  body: string[];
  gallery: ImageAsset[];
  model3d?: Model3DAsset;
  videoUrl?: string;
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
  finalGrade?: string;
  institutionUrl?: string;
  logo?: ImageAsset;
  details?: ContentSection[];
}

export interface CourseCertificate {
  id: string;
  title: string;
  provider: string;
  kind: 'course' | 'certificate';
  completedAt: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  skills: string[];
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
  coursesCertificates: CourseCertificate[];
  profile: Profile;
}
