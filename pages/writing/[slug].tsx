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
        path={`/writing/${post.slug}`}
        type="article"
        publishedTime={new Date(post.date).toISOString()}
      />

      <article className="shell max-w-3xl py-20 md:py-28">
        <nav className="mb-12">
          <Link href="/writing" className="link-quiet">
            ← Writing
          </Link>
        </nav>

        <header className="mb-14 border-b border-ink-700 pb-12">
          <div className="mb-8 flex items-center gap-6">
            <span className="h-px w-12 bg-brass-500/70" />
            <p className="kicker">Essay</p>
          </div>
          <h1 className="display text-4xl md:text-6xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <time className="tag">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.tags && post.tags.length > 0 && (
              <p className="tag">{post.tags.join(" · ")}</p>
            )}
          </div>
        </header>

        <div
          className="essay"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-16 border-t border-ink-700 pt-10">
          <p className="body-text text-bone-400">
            Working on the problems this essay describes?{" "}
            <Link href="/work-with-me" className="link-serif">
              Work with me.
            </Link>
          </p>
        </footer>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: posts.map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  const post = posts.find((p) => p.slug === params?.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
};
