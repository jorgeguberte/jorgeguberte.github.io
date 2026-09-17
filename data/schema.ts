import { profile, thesis } from "./site-content";

export const BASE_URL = "https://jorgeguberte.com";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: profile.name,
    jobTitle: profile.title,
    description: profile.subhead,
    url: BASE_URL,
    email: `mailto:${profile.email}`,
    image: `${BASE_URL}/og-card.png`,
    sameAs: [
      profile.github,
      profile.linkedin,
      profile.orcid,
    ].filter(Boolean),
    worksFor: {
      "@type": "Organization",
      name: "Hub Esfera",
      url: "https://hubesfera.com",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of São Paulo",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressCountry: "BR",
    },
    knowsAbout: [
      "AI systems architecture",
      "Agent orchestration",
      "Agent memory architectures",
      "Emergent Personal Cognitive Graphs (EPCG)",
      "Temporal graph retrieval & LoomDB",
      "Retrieval-Augmented Generation (RAG)",
      "Context engineering",
      "Generative UI",
      "LangGraph",
      "DuckDB",
      "Rust (WASM)",
      "Distributed systems",
    ],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Jorge Guberte",
    alternateName: "Jorge Guberte · Principal AI Systems Architect",
    description:
      "Personal site and research lab of Jorge Guberte. Architecting AI systems that persist, remember, and run in production.",
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    author: {
      "@id": `${BASE_URL}/#person`,
    },
    inLanguage: "en-US",
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${BASE_URL}${item.path}`,
    })),
  };
}

export function getArticleSchema({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}) {
  const url = `${BASE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description: description,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@id": `${BASE_URL}/#person`,
    },
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    image: `${BASE_URL}/og-card.png`,
    inLanguage: "en-US",
    keywords: tags ? tags.join(", ") : undefined,
  };
}

export function getSoftwareSchema({
  name,
  description,
  path,
  codeRepository,
  applicationCategory = "DeveloperApplication",
  license = "https://opensource.org/licenses/MIT",
  operatingSystem = "Cross-platform",
}: {
  name: string;
  description: string;
  path: string;
  codeRepository?: string;
  applicationCategory?: string;
  license?: string;
  operatingSystem?: string;
}) {
  const url = `${BASE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: name,
    description: description,
    url: url,
    applicationCategory: applicationCategory,
    operatingSystem: operatingSystem,
    license: license,
    codeRepository: codeRepository,
    author: {
      "@id": `${BASE_URL}/#person`,
    },
  };
}

export function getResearchProgramSchema({
  name,
  description,
  question,
  path,
  themes,
}: {
  name: string;
  description: string;
  question: string;
  path: string;
  themes: string[];
}) {
  const url = `${BASE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#research`,
    headline: `${name}: ${description}`,
    alternativeHeadline: question,
    description: description,
    url: url,
    author: {
      "@id": `${BASE_URL}/#person`,
    },
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    inLanguage: "en-US",
    keywords: themes.join(", "),
    about: {
      "@type": "Thing",
      name: name,
      description: description,
    },
  };
}
