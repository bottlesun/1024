/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  experimental: {
    appDir: false
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/instances/list",
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
