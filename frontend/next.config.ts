import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  compress: true,
  trailingSlash: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },

  async redirects() {
    return [
      {
        source: '/auth/',
        destination: '/auth/login/',
        permanent: true,
      },
      // {
      //   source: '/dashboard',
      //   destination: '/dashboard/client/',
      //   permanent: false,
      // }
    ]
  },
  experimental: {}
};

export default nextConfig;
