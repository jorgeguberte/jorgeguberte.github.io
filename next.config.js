const { build } = require('velite');

const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;

async function buildVelite() {
  if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
    process.env.VELITE_STARTED = '1';
    await build({ watch: isDev, clean: !isDev });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
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
