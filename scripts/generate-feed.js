const fs = require("fs");
const path = require("path");

const BASE_URL = "https://jorgeguberte.com";
const SITE_NAME = "Jorge Guberte";
const SITE_DESCRIPTION =
  "Essays and research notes on memory, context engineering, and the architecture of AI systems that last.";

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateFeed() {
  const postsPath = path.join(__dirname, "..", ".velite", "posts.json");
  if (!fs.existsSync(postsPath)) {
    console.warn("[feed] No .velite/posts.json found. Skipping feed generation.");
    return;
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

  const now = new Date().toUTCString();
  const latestPostDate =
    posts.length > 0 ? new Date(posts[0].date).toUTCString() : now;

  const items = posts
    .filter((post) => {
      const tags = post.tags ?? [];
      return (
        !tags.includes("meta") &&
        post.slug !== "hello-world" &&
        post.slug !== "testing-blog"
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const url = `${BASE_URL}/writing/${post.slug}`;
      const date = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${date}</pubDate>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(BASE_URL)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${latestPostDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  const outPath = path.join(__dirname, "..", "public", "feed.xml");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, rss, "utf-8");
  console.log(`[feed] RSS feed generated → public/feed.xml (${posts.length} posts)`);
}

generateFeed();