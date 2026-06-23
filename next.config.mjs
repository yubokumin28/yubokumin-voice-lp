/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: false,
  images: { unoptimized: true },
  transpilePackages: ["three"],
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
