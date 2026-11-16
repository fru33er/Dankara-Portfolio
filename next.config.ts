import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/locktimer",
        destination: "/lock-timer",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
