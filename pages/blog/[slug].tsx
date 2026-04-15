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

      <main className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
        <div className="mb-12">
          <Link
            href="/blog"
            className="font-mono text-sm text-neutral-500 hover:text-emerald-400 transition-colors"
          >
            ← blog
          </Link>
        </div>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <time className="font-mono">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-invert prose-neutral max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-200
              prose-code:text-emerald-300 prose-code:bg-neutral-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
              prose-li:text-neutral-300
              prose-blockquote:border-emerald-500/30 prose-blockquote:text-neutral-400
              prose-hr:border-neutral-800"
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
