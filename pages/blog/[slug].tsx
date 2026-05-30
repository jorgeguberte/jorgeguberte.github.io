import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { posts } from "#site/content";
import type { Post } from "#site/content";
import { SeoHead } from "../../components/SeoHead";

interface PostPageProps {
  post: Post;
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <>
      <SeoHead
        title={`${post.title} — Jorge Guberte`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        publishedTime={new Date(post.date).toISOString()}
      />

      <main className="page-shell max-w-3xl">
        <nav className="mb-12 flex items-center justify-between gap-4">
          <Link href="/blog" className="nav-pill">
            ← blog
          </Link>
          <Link href="/" className="nav-pill">
            home →
          </Link>
        </nav>

        <article className="glass-card p-7 md:p-10">
          <header className="mb-10 border-b border-white/10 pb-8">
            <h1 className="gradient-text mb-4 text-4xl font-bold tracking-[-0.04em] md:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <time className="font-mono">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-invert prose-neutral max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-a:text-emerald-300 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-100
              prose-code:text-emerald-200 prose-code:bg-neutral-900/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-neutral-950/80 prose-pre:border prose-pre:border-white/10
              prose-li:text-neutral-300
              prose-blockquote:border-emerald-400/40 prose-blockquote:text-neutral-300 prose-blockquote:bg-emerald-300/[0.04] prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:rounded-r-2xl
              prose-hr:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const post = posts.find((p) => p.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return { props: { post } };
};
