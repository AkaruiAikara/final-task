/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placeimg.com", "the-journey-api.herokuapp.com", "localhost"],
  },
  env: {
    TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
    SERVER_API_URL: process.env.SERVER_API_URL,
    SERVER_URL: process.env.SERVER_URL,
  },
};

module.exports = nextConfig;
