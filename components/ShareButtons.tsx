"use client";

import { useState } from "react";
import type { ReactNode } from "react";

// 拡散用の紹介文（X は本文に自動入力、その他はクリップボードへコピー）
const SITE_URL = "https://yubokumin-voice-lp.vercel.app";
const SHARE_TEXT =
  "声で話すだけで、整った文章がそのままカーソルに入る無料の音声入力ツール『Grow Voice』。使うほど自分の言葉に育つ辞書がすごい。完全ローカルで月額0・トークン消費0。";
const SHARE_FULL = SHARE_TEXT + "\n" + SITE_URL;

const TWEET_URL =
  "https://twitter.com/intent/tweet?text=" +
  encodeURIComponent(SHARE_TEXT) +
  "&url=" + encodeURIComponent(SITE_URL) +
  "&via=Yubokumin28&hashtags=" + encodeURIComponent("GrowVoice,音声入力");
// LinkedIn は本文の事前入力ができない仕様のため URL のみ（OGプレビューが出る）
const LINKEDIN_SHARE =
  "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(SITE_URL);
// リベシティは投稿用URLが無いためホーム（投稿欄）を開く
const LIBECITY_SHARE = "https://libecity.com/";

const XIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink" fill="currentColor"><path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.4l7.7-8.8L1 2.3h6.8l4.7 6.2 5.7-6.2Zm-1.2 17.6h1.8L7.1 4.2H5.2L17 19.9Z" /></svg>
);
const InIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0a66c2]" fill="currentColor"><path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6ZM8.3 18.3H5.4V9.5h2.9v8.8ZM6.9 8.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm11.4 10H15.4v-4.3c0-1 0-2.4-1.4-2.4s-1.7 1.1-1.7 2.3v4.4H9.5V9.5h2.7v1.2h.1a3 3 0 0 1 2.7-1.5c2.9 0 3.4 1.9 3.4 4.4v4.7Z" /></svg>
);
const LibeIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-coral-dark" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m0 0a4 4 0 1 1 6 0M16 7a3 3 0 1 1-3.5 4.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

type Item = {
  key: string;
  label: string;
  icon: ReactNode;
  url: string;
  paste: boolean;
  note: string; // ボタン押下前から見える常時表示の案内
};

const ITEMS: Item[] = [
  {
    key: "in", label: "LinkedInで広める", icon: InIcon, url: LINKEDIN_SHARE, paste: true,
    note: "開いた投稿画面に貼り付け（Ctrl+V）",
  },
  {
    key: "x", label: "Xで広める", icon: XIcon, url: TWEET_URL, paste: false,
    note: "そのまま投稿OK（貼り付け不要）",
  },
  {
    key: "libe", label: "リベシティで広める", icon: LibeIcon, url: LIBECITY_SHARE, paste: true,
    note: "リベシティ会員の方向け・投稿欄に貼り付け",
  },
];

export function ShareButtons() {
  const [toast, setToast] = useState<string | null>(null);

  const go = (item: Item) => {
    // ワンクリックで紹介文をコピー（X以外は貼り付け用）→ そのSNSを開く
    try {
      navigator.clipboard?.writeText(SHARE_FULL).catch(() => {});
    } catch {}
    window.open(item.url, "_blank", "noopener,noreferrer");
    if (!item.paste) {
      setToast("📋 そのまま投稿OK！紹介文が入った状態で開きます（コピー済み）。");
    } else if (item.key === "libe") {
      setToast(
        "📋 紹介文をコピーしました！リベシティにログイン後、投稿欄に貼り付け"
        + "（Ctrl+V / ⌘+V）してください（会員の方向けです）。"
      );
    } else {
      setToast(
        "📋 紹介文をコピーしました！開いた画面に貼り付け（Ctrl+V / ⌘+V）して投稿してください。"
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ITEMS.map((it) => (
          <div key={it.key} className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(it)}
              className={
                "relative w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-4 " +
                "bg-white text-lagoon-800 font-bold ring-1 ring-white/40 " +
                "shadow-[0_14px_36px_rgba(0,0,0,.22)] hover:scale-[1.04] active:scale-[0.98] " +
                "transition-transform duration-150 " +
                (it.key === "x" ? "ring-4 ring-sun/60" : "")
              }
            >
              {it.key === "x" && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun text-ink text-[10px] font-bold px-2 py-0.5 shadow">
                  そのまま投稿OK
                </span>
              )}
              {it.icon}
              <span className="text-[15px]">{it.label}</span>
            </button>
            {/* 押す前から見える案内。トースト(押した後)と合わせて二重で案内する */}
            <span className="text-[11px] text-lagoon-100/90 text-center leading-snug">
              {it.note}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-lagoon-200 mt-3 leading-relaxed">
        どのボタンも、押すと紹介文を<strong className="text-white">ワンクリックで自動コピー</strong>して、そのSNSが開きます。
        <br className="hidden sm:block" />
        <strong className="text-white">X はそのまま投稿OK</strong> ／ LinkedIn・リベシティは <strong className="text-white">貼り付け（Ctrl+V）</strong>して投稿。
      </p>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 inline-block rounded-xl bg-white/95 text-ink text-sm font-bold px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,.25)]"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
