/** @type {import('next').NextConfig} */
const basePath = "";
const nextConfig = {
    basePath,
  env: {
    BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
