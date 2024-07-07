/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    BACKEND_BASEURL: process.env.BACKEND_BASEURL,
  },
};

module.exports = nextConfig;
