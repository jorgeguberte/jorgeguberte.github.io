import Head from "next/head";

const SITE_NAME = "Jorge Guberte";
const BASE_URL = "https://jorgeguberte.com";
const DEFAULT_OG_IMAGE = "/og-card.svg";

type SeoHeadProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function SeoHead({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
}: SeoHeadProps) {
  const canonical = new URL(path, BASE_URL).toString();
  const imageUrl = new URL(image, BASE_URL).toString();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${title} — ${SITE_NAME}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
