import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { posts } from "#site/content";

interface RedirectProps {
  slug: string;
}

/** Legacy URL — /blog/[slug] moved to /writing/[slug]. Static-export-safe redirect. */
export default function BlogPostRedirect({ slug }: RedirectProps) {
  const router = useRouter();
  const target = `/writing/${slug}`;

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <Head>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <link rel="canonical" href={`https://jorgeguberte.com${target}`} />
      <title>Redirecting…</title>
    </Head>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: posts.map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<RedirectProps> = async ({ params }) => {
  const slug = String(params?.slug ?? "");
  if (!posts.some((p) => p.slug === slug)) return { notFound: true };
  return { props: { slug } };
};
