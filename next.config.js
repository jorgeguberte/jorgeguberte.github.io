const { build } = require('velite');

const isDev = process.env.NODE_ENV === 'development' || process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;

console.log(`[next.config.js] NODE_ENV: ${process.env.NODE_ENV}, isDev: ${isDev}`);

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
            {
              source: '/labs',
              destination: '/labs/index.html',
              permanent: false,
            },
            {
              source: '/labs/',
              destination: '/labs/index.html',
              permanent: false,
            },
            {
              source: '/labs/y2k-sensory',
              destination: '/labs/y2k-sensory/index.html',
              permanent: false,
            },
            {
              source: '/labs/y2k-sensory/',
              destination: '/labs/y2k-sensory/index.html',
              permanent: false,
            },
          ];
        },
      }
    : {
        output: 'export',
      }),
};

async function generateFeed() {
  try {
    require('./scripts/generate-feed');
  } catch (err) {
    console.warn('[feed] Could not generate RSS feed:', err.message);
  }
}

buildVelite().then(() => generateFeed()).catch(console.error);

module.exports = nextConfig;
