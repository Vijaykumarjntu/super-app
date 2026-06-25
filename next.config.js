/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'ia.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazon.com',
      },
    ],
  },
}

module.exports = nextConfig
