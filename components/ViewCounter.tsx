"use client";

import { useEffect, useState } from "react";

// ダウンロードページの閲覧数(2026-09-23)
// 同じブラウザからは 1 日 1 回だけ数える(再読み込みで増えない)。
type Counts = { total: number; today: number; since?: string };

function todayKey(): string {
  const d = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
  return `gv_viewed_${d}`;
}

export function ViewCounter() {
  const [c, setC] = useState<Counts | null>(null);

  useEffect(() => {
    let alive = true;
    let first = true;
    try {
      first = !localStorage.getItem(todayKey());
    } catch {
      // プライベートウィンドウ等で localStorage が使えない時は数えるだけ
    }
    (async () => {
      try {
        const r = await fetch("/api/views", { method: first ? "POST" : "GET", cache: "no-store" });
        if (!r.ok) return;
        const j = (await r.json()) as Counts;
        if (!alive) return;
        setC(j);
        if (first) {
          try {
            localStorage.setItem(todayKey(), "1");
          } catch {}
        }
      } catch {
        // 数が出なくてもページは普通に使えるので、黙って諦める
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // 数が届くまでは同じ高さの空きを置く(文字が飛び跳ねないように)
  if (!c) return <div className="h-[34px]" aria-hidden="true" />;

  return (
    <div
      className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-white/75 ring-1 ring-lagoon-200 px-4 py-1.5 text-sm text-ink-soft shadow-[0_6px_20px_rgba(7,59,76,.10)]"
      aria-live="polite"
    >
      <span aria-hidden="true">👀</span>
      <span>
        このページを見た人{" "}
        <strong className="font-bold text-lagoon-700 tabular-nums">{c.total.toLocaleString("ja-JP")}</strong> 人
      </span>
      <span className="text-xs text-ink-mute">
        （今日 <strong className="font-bold tabular-nums">{c.today.toLocaleString("ja-JP")}</strong> 人）
      </span>
    </div>
  );
}
