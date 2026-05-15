import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import path from "path";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.houseinrwanda.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default withSerwist(nextConfig);

