/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['gogocdn.net', 's4.anilist.co'],
  },
  env: {
    SERVER_ADDRESS: 'https://anibay.xyz',
  },
}

module.exports = nextConfig
