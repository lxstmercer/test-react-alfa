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
  basePath: '/test-react-alfa',
  assetPrefix: '/test-react-alfa/',
  skipTrailingSlashRedirect: true,
  experimental: {
    esmExternals: true,
  }
}

module.exports = nextConfig