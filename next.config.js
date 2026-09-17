const { build } = require('velite');

const isDev = process.env.NODE_ENV === 'development' || process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;

async function buildVelite() {
  if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = '1';
    await build({ watch: isDev, clean: !isDev });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isDev
    ? {
        async redirects() {
          return [
            { source: '/labs', destination: '/labs/index.html', permanent: false },
            { source: '/labs/', destination: '/labs/index.html', permanent: false },
            { source: '/labs/y2k-sensory', destination: '/labs/y2k-sensory/index.html', permanent: false },
            { source: '/labs/y2k-sensory/', destination: '/labs/y2k-sensory/index.html', permanent: false },
          { source: '/labs/interaction', destination: '/labs/interaction/index.html', permanent: false },
          { source: '/labs/interaction/', destination: '/labs/interaction/index.html', permanent: false },
            { source: '/blog', destination: '/writing', permanent: true },
            { source: '/blog/:slug', destination: '/writing/:slug', permanent: true },
          ];
        },
      }
    : {
        output: 'export',
      }),
};

async function generateStaticAssets() {
  try {
    require('./scripts/generate-feed');
  } catch (err) {
    console.warn('[feed] Could not generate RSS feed:', err.message);
  }
  try {
    const { generateSitemap } = require('./scripts/generate-sitemap');
    generateSitemap();
  } catch (err) {
    console.warn('[sitemap] Could not generate sitemap:', err.message);
  }
}

buildVelite().then(() => generateStaticAssets()).catch(console.error);

module.exports = nextConfig;
