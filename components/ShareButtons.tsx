"use client";

import { useState } from "react";

// リベシティ(リベッター)専用の拡散ボタン(2026-09-21 に X / LinkedIn を撤去)
//
// リベッターには投稿用 URL も API も無く、本文中の URL からリンクカードが出るのも
// YouTube だけ(2026-09-21 実測)。画像は投稿欄の「画像を追加」から選ぶしかないので、
// 1 クリックで ①紹介文をコピー ②画像をダウンロード ③投稿欄を開く の 3 つを済ませ、
// 利用者には「貼り付け」と「画像を選ぶ」の 2 操作だけ残す。
// ⛔ リベッターには外部サイト(Vercel)の URL を載せない決まり(2026-09-21 旦那様指示)。
//    載せるのは遊牧民のリベシティ プロフィール URL だけ。
const PROFILE_URL = "https://libecity.com/user_profile/c0bL05vIXaYL1a2dpMrWYBSbGEI3";
const SHARE_TEXT =
  "遊牧民さんから無料の音声入力ツール『Grow Voice』をもらいました🦭\n"
  + "声で話すだけで、整った文章がそのままカーソルに入る。使うほど自分の言葉に育つ辞書がすごい。\n"
  + "完全ローカルで月額0・トークン消費0。ソース同梱なので Claude Code や Codex に「ここを直して」と頼めます。\n"
  + "配布はこのプロフィールから👇";
const SHARE_FULL = SHARE_TEXT + "\n" + PROFILE_URL;

// 投稿に添える画像(public/img に置く)。差し替える時はこのファイルを上書きするだけ。
const SHARE_IMAGE = "/img/share-libecity.png";
const SHARE_IMAGE_NAME = "GrowVoice_紹介.png";

// 「自分のつぶやき・返信」は開いた瞬間に入力欄が最上部に出る(みんなのつぶやきは
// ボタンを押してポップアップを開く手間が 1 つ増える)。
const LIBECITY_POST_URL = "https://libecity.com/tweet/my";

const LibeIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-coral-dark" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m0 0a4 4 0 1 1 6 0M16 7a3 3 0 1 1-3.5 4.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export function ShareButtons() {
  const [done, setDone] = useState(false);

  const go = () => {
    // ① 紹介文 + URL をクリップボードへ
    try {
      navigator.clipboard?.writeText(SHARE_FULL).catch(() => {});
    } catch {}
    // ② 画像を保存(同一オリジンなので download 属性が効く)
    const a = document.createElement("a");
    a.href = SHARE_IMAGE;
    a.download = SHARE_IMAGE_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // ③ リベッターの投稿欄を開く
    window.open(LIBECITY_POST_URL, "_blank", "noopener,noreferrer");
    setDone(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={go}
        className={
          "relative w-full max-w-md mx-auto inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-5 " +
          "bg-white text-lagoon-800 font-display font-bold text-lg ring-4 ring-sun/60 " +
          "shadow-[0_14px_36px_rgba(0,0,0,.22)] hover:scale-[1.04] active:scale-[0.98] transition-transform duration-150"
        }
      >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sun text-ink text-[11px] font-bold px-3 py-0.5 shadow">
          リベシティ会員の方向け
        </span>
        {LibeIcon}
        <span>リベシティでつぶやく</span>
      </button>

      {/* 押す前から見える 3 ステップ。押した後は「済み」表示に変わる */}
      <ol className="mt-5 grid gap-2 sm:grid-cols-3 text-left text-sm">
        {[
          ["1", "ボタンを押す", "紹介文をコピーし、画像を保存して、つぶやき画面が開きます"],
          ["2", "貼り付ける", "入力欄で Ctrl+V(Mac は ⌘+V)"],
          ["3", "画像を選ぶ", "「画像を追加」で保存した " + SHARE_IMAGE_NAME + " を選んで「つぶやく」"],
        ].map(([n, t, d]) => (
          <li key={n} className="rounded-xl bg-white/10 ring-1 ring-white/15 px-3.5 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-sun text-ink text-xs font-bold">{n}</span>
              <span className="font-bold text-white">{t}</span>
            </div>
            <p className="text-xs text-lagoon-100 leading-relaxed">{d}</p>
          </li>
        ))}
      </ol>

      {done && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 inline-block rounded-xl bg-white/95 text-ink text-sm font-bold px-4 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,.25)]"
        >
          📋 紹介文をコピーし、画像を保存しました。開いた画面に貼り付け → 画像を選んで「つぶやく」で完了です。
        </div>
      )}
    </div>
  );
}
