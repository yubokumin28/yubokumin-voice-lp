/** @type {import('next').NextConfig} */
const repo = "yubokumin-voice-lp";
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  reactStrictMode: false,
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  transpilePackages: ["three"],
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
