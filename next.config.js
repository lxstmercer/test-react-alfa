/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
  skipTrailingSlashRedirect: true,
  experimental: {
    esmExternals: true,
  },
  output: 'standalone',
}

module.exports = nextConfig