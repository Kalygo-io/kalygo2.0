/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true };
    return config;
  },
};

module.exports = nextConfig;
