import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  compress: true,
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: '/auth/',
        destination: '/auth/login/',
        permanent: true,
      },
      {
        source: '/',
        destination: '/dashboard/',
        permanent: false,
      }
    ]
  },
  experimental: {}
};

export default nextConfig;
