import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grow Voice（グロウボイス）— 使うほど育つ、ローカル音声入力",
  description:
    "ローカルLLM搭載。話すほどあなたの言葉づかいを学習して育つ音声入力。押して話すだけでカーソル位置へ。完全ローカルだから月額もトークン消費もゼロ。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
