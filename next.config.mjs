/** @type {import('next').NextConfig} */
const nextConfig = {
  // 2026-07-17: モニターの声(/monitor)のAPI保存を使うため静的書き出しを解除。
  // Vercel は framework=nextjs 設定のため、そのままサーバーレスで動く。
  reactStrictMode: false,
  images: { unoptimized: true },
  transpilePackages: ["three"],
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
