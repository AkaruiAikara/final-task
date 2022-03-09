/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeimg.com"],
  },
  env: {
    TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
  },
};

module.exports = nextConfig;
