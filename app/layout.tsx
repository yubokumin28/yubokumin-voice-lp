import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "声で、整って、入る。— 音声入力ツール | 遊牧民ラボ",
  description:
    "マイクに話すだけ。誤変換もフィラーも自動で直して、カーソル位置へ。月額有料の音声入力を、完全ローカル・無料で置き換える自作ツール。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
