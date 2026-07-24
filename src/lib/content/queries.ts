export const siteContentQuery = `{
  "projects": *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    publishedAt,
    shortDescription,
    "body": body[].children[].text,
    mainImage { alt, "assetRef": asset._ref },
    gallery[] { alt, "assetRef": asset._ref },
    category-> {
      "id": _id,
      title,
      "slug": slug.current,
      description
    },
    technologies,
    featured,
    projectUrl,
    sourceUrl,
    "relatedProjectIds": relatedProjects[]._ref
  },
  "categories": *[_type == "projectCategory" && defined(slug.current)] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description
  },
  "workExperiences": *[_type == "workExperience"] | order(startDate desc) {
    "id": _id,
    company,
    role,
    startDate,
    endDate,
    current,
    description,
    companyUrl,
    logo { alt, "assetRef": asset._ref }
  },
  "education": *[_type == "education"] | order(startDate desc) {
    "id": _id,
    institution,
    qualification,
    field,
    startDate,
    endDate,
    description,
    institutionUrl,
    logo { alt, "assetRef": asset._ref }
  },
  "profile": *[_type == "profile"][0] {
    name,
    professionalTitle,
    shortIntroduction,
    "biography": biography[].children[].text,
    profileImage { alt, "assetRef": asset._ref },
    email,
    location,
    skills,
    socialLinks[] { label, url }
  }
}`;
