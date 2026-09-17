const fs = require("fs");
const path = require("path");

const BASE_URL = "https://jorgeguberte.com";

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const routes = [
    { loc: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
    { loc: "/about", priority: "0.8", changefreq: "monthly", lastmod: today },
    { loc: "/cv", priority: "0.7", changefreq: "monthly", lastmod: today },
    { loc: "/work-with-me", priority: "0.8", changefreq: "monthly", lastmod: today },
    { loc: "/lab", priority: "0.9", changefreq: "weekly", lastmod: today },
    { loc: "/lab/loomdb", priority: "0.85", changefreq: "monthly", lastmod: today },
    { loc: "/lab/epcg", priority: "0.85", changefreq: "monthly", lastmod: today },
    { loc: "/lab/y2k-sensory", priority: "0.75", changefreq: "monthly", lastmod: today },
    { loc: "/systems", priority: "0.9", changefreq: "weekly", lastmod: today },
    { loc: "/systems/strata", priority: "0.85", changefreq: "monthly", lastmod: today },
    { loc: "/systems/pixie", priority: "0.85", changefreq: "monthly", lastmod: today },
    { loc: "/systems/multiverse", priority: "0.85", changefreq: "monthly", lastmod: today },
    { loc: "/writing", priority: "0.85", changefreq: "weekly", lastmod: today },
    { loc: "/labs/", priority: "0.7", changefreq: "monthly", lastmod: today },
    { loc: "/labs/y2k-sensory/", priority: "0.7", changefreq: "monthly", lastmod: today },
    { loc: "/labs/interaction/", priority: "0.7", changefreq: "monthly", lastmod: today },
  ];

  // Read Velite posts if available
  const postsPath = path.join(__dirname, "..", ".velite", "posts.json");
  if (fs.existsSync(postsPath)) {
    try {
      const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
      for (const post of posts) {
        // Exclude internal draft / placeholder meta posts from sitemap
        const tags = post.tags ?? [];
        if (tags.includes("meta") || post.slug === "hello-world" || post.slug === "testing-blog") {
          continue;
        }
        const postDate = post.date ? new Date(post.date).toISOString().split("T")[0] : today;
        routes.push({
          loc: `/writing/${post.slug}`,
          priority: "0.8",
          changefreq: "monthly",
          lastmod: postDate,
        });
      }
    } catch (err) {
      console.warn("[sitemap] Failed to parse posts.json:", err.message);
    }
  }

  const urlsXml = routes
    .map(
      (r) => `  <url>
    <loc>${BASE_URL}${r.loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

  const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemapXml, "utf-8");
  console.log(`[sitemap] Generated sitemap with ${routes.length} URLs → public/sitemap.xml`);
}

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
