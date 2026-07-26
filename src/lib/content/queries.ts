export const siteContentQuery = `{
  "projects": *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    publishedAt,
    shortDescription,
    "body": coalesce(body[].children[].text, []),
    mainImage {
      alt,
      "assetRef": asset._ref,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    },
    model3d {
      alt,
      "url": asset->url,
      "fileName": asset->originalFilename,
      "size": asset->size
    },
    videoUrl,
    "gallery": coalesce(gallery[] {
      alt,
      "assetRef": asset._ref,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }, []),
    category-> {
      "id": _id,
      title,
      "slug": slug.current,
      description,
      image { alt, "assetRef": asset._ref }
    },
    "technologies": coalesce(technologies, []),
    "featured": coalesce(featured, false),
    projectUrl,
    sourceUrl,
    "relatedProjectIds": coalesce(relatedProjects[]._ref, [])
  },
  "categories": *[_type == "projectCategory" && defined(slug.current)] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description,
    image { alt, "assetRef": asset._ref }
  },
  "workExperiences": *[_type == "workExperience"] | order(startDate desc) {
    "id": _id,
    company,
    role,
    startDate,
    endDate,
    current,
    description,
    positions[] { title, period },
    details[] { title, description, "items": coalesce(items, []) },
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
    finalGrade,
    details[] { title, description, "items": coalesce(items, []) },
    institutionUrl,
    logo { alt, "assetRef": asset._ref }
  },
  "coursesCertificates": *[_type == "courseCertificate"] | order(completedAt desc) {
    "id": _id,
    title,
    provider,
    kind,
    completedAt,
    description,
    credentialId,
    credentialUrl,
    "pdfUrl": pdfFile.asset->url,
    "pdfFileName": pdfFile.asset->originalFilename,
    "skills": coalesce(skills, [])
  },
  "profile": *[_type == "profile"][0] {
    name,
    professionalTitle,
    shortIntroduction,
    "biography": coalesce(biography[].children[].text, []),
    profileImage { alt, "assetRef": asset._ref },
    email,
    location,
    "skills": coalesce(skills, []),
    "socialLinks": coalesce(socialLinks[] { label, url }, [])
  }
}`;
