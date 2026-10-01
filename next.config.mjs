import { createRequire } from "node:module";

const { redirects } = createRequire(import.meta.url)("./vercel.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { viewTransition: true },
  async redirects() { return redirects; },
};

export default nextConfig;
