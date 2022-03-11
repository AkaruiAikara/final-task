/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeimg.com"],
  },
  env: {
    TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
    SERVER_API_URL: process.env.SERVER_API_URL,
  },
};

module.exports = nextConfig;
