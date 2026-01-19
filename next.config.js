/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'syro-merch.pt',
        pathname: '/cdn/**',
      },
    ],
  },
}

module.exports = nextConfig
