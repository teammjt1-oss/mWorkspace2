import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  transpilePackages: ["@repo/ui"],
};

// Turbopack은 플러그인을 함수가 아닌 패키지 이름 문자열로 받아야 한다.
const withMDX = createMDX({
  options: { remarkPlugins: [["remark-gfm"]] },
});

export default withMDX(nextConfig);
