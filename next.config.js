/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'uz'],
    defaultLocale: 'ru'
  },
  images: {
    domains: ["api.raqamlilab.uz"]
  },
  output: "standalone",
  reactStrictMode: false
}

module.exports = nextConfig
