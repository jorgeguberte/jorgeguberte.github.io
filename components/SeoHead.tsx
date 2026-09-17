import Head from "next/head";

const SITE_NAME = "Jorge Guberte";
const BASE_URL = "https://jorgeguberte.com";
const DEFAULT_OG_IMAGE = "/og-card.png";

type JsonLdType = Record<string, any> | Record<string, any>[];

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: JsonLdType;
};

export function SeoHead({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  jsonLd,
}: SeoHeadProps) {
  const canonical = path.startsWith("http")
    ? path
    : new URL(path, BASE_URL).toString();

  const imageUrl = image.startsWith("http")
    ? image
    : new URL(image, BASE_URL).toString();

  const imageType = imageUrl.endsWith(".png")
    ? "image/png"
    : imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")
    ? "image/jpeg"
    : imageUrl.endsWith(".webp")
    ? "image/webp"
    : imageUrl.endsWith(".svg")
    ? "image/svg+xml"
    : "image/png";

  const jsonLdData = Array.isArray(jsonLd)
    ? jsonLd
    : jsonLd
    ? [jsonLd]
    : [];

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content="Jorge Guberte" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />

      {/* Crawlers & Indexing */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:alt" content={`${title} — ${SITE_NAME}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${title} — ${SITE_NAME}`} />

      {/* Article Specific */}
      {publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {modifiedTime ? (
        <meta property="article:modified_time" content={modifiedTime} />
      ) : null}

      {/* Feeds and discovery */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${SITE_NAME} — RSS Feed`}
        href={`${BASE_URL}/feed.xml`}
      />
      <link
        rel="help"
        type="text/markdown"
        href={`${BASE_URL}/llms.txt`}
        title="LLM Context"
      />

      {/* Structured Data (JSON-LD) */}
      {jsonLdData.map((data, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
}
