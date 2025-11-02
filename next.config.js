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
  }
}

module.exports = nextConfig