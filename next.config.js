/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-presentations',
  assetPrefix: '/my-presentations',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;

