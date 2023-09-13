/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['gogocdn.net', 's4.anilist.co'],
  },
  env: {
    SERVER_ADDRESS: 'http://192.168.0.61:3000',
  },
}

module.exports = nextConfig
