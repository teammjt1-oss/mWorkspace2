import "@repo/env/load-root";
import "./src/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/db", "@repo/env", "@repo/ui"],
};

export default nextConfig;
