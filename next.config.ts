import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    domains: ['fakestoreapi.com', 'localhost', 'localhost:3000']
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // basePath: process.env.NODE_ENV === 'production' ? '/pdoducts-alfa' : ''
};

export default nextConfig;
