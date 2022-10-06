/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['www.dropbox.com'],
  },
}

module.exports = nextConfig