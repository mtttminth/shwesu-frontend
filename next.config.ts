import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.shwesu.com",
        port: "",
        pathname: "/storage/**",
        search: "",
      },
      {
        protocol: "http",
        hostname: "shwesu.test",
        port: "",
        pathname: "/storage/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
