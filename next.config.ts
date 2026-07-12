import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {hostname: "images.unsplash.com"}
    ]
  },
  reactCompiler: true,
};

export default nextConfig;
