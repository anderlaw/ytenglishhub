/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ["@mui/x-charts"],
  reactStrictMode:false
};

module.exports = nextConfig;
