"use client";

import { useState } from "react";

// 「AI に改良を頼む」ためのコピペ用プロンプト。ZIP を解凍したフォルダで
// Claude Code / Codex を開き、そのまま貼れる文にしてある。
const PROMPTS: { title: string; body: string }[] = [
  {
    title: "まず動かしたい(Windows / Mac 共通)",
    body:
      "このフォルダは Grow Voice という音声入力ツールです。_app(Mac は同梱の _mac)の中のマニュアルと "
      + "requirements.txt を読んで、このパソコンで動くようにセットアップしてください。"
      + "Python が無ければ入れ方から教えてください。",
  },
  {
    title: "Mac で動くように直したい",
    body:
      "このフォルダの音声入力ツール(Grow Voice)を、この Mac で動くように直してください。"
      + "_mac/セットアップ.command を実行して、エラーが出たら原因を調べて修正し、"
      + "最後に「音声入力を起動.command」で右 Ctrl(または設定したキー)を押しながら話すと文字が入るところまで確認してください。",
  },
  {
    title: "自分好みに改良したい",
    body:
      "このフォルダの音声入力ツール(Grow Voice)の src/ を読んで、次の改良をしてください: "
      + "(ここに要望を書く。例: ホットキーを F8 に変える / 話し終わって 1 秒で確定する / 句読点を「。」だけにする)。"
      + "変更したら python -m pytest tests でテストが通ることを確認してください。",
  },
];

function CopyButton({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard?.writeText(text).then(() => {
        setOk(true);
        setTimeout(() => setOk(false), 1800);
      }).catch(() => {});
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white bg-lagoon-700 hover:bg-lagoon-800 transition-colors"
    >
      {ok ? "✓ コピーしました" : "コピー"}
    </button>
  );
}

export function PromptCopyBlocks() {
  return (
    <div className="space-y-3">
      {PROMPTS.map((p) => (
        <div key={p.title} className="rounded-xl bg-white/85 border border-lagoon-200 p-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="font-bold text-ink text-sm">{p.title}</div>
            <CopyButton text={p.body} />
          </div>
          <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed text-ink-soft bg-sand-50 rounded-lg p-3 border border-lagoon-100">{p.body}</pre>
        </div>
      ))}
    </div>
  );
}
