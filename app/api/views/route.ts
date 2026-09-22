import { NextResponse } from "next/server";
import { head, put } from "@vercel/blob";

// 閲覧数カウンター(2026-09-23)
// 置き場は既存の Vercel Blob。新しい契約も鍵も増やさない。
//   GET  = 数を返すだけ
//   POST = 1 足してから返す(1 日 1 回、ブラウザ側で制御)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PATH = "stats/download-views.json";
const KEEP_DAYS = 60;

type Stats = { total: number; days: Record<string, number>; since: string };

/** 日本時間の YYYY-MM-DD */
function today(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

const empty = (): Stats => ({ total: 0, days: {}, since: today() });

// Blob の CDN は最短でも 60 秒キャッシュするので、同じ関数インスタンスが
// 温まっている間は自分が書いた値を正とする(読み直しで巻き戻らないための保険)。
const mem = globalThis as unknown as { __gvViews?: Stats };

async function read(): Promise<Stats> {
  try {
    const h = await head(PATH);
    // クエリを変えて CDN のキャッシュを避ける
    const r = await fetch(`${h.url}?t=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) throw new Error("fetch_failed");
    const j = (await r.json()) as Partial<Stats>;
    const fresh: Stats = {
      total: Number(j.total) || 0,
      days: j.days || {},
      since: j.since || today(),
    };
    const m = mem.__gvViews;
    return m && m.total > fresh.total ? m : fresh;
  } catch {
    return mem.__gvViews ?? empty();
  }
}

async function write(s: Stats): Promise<void> {
  mem.__gvViews = s;
  await put(PATH, JSON.stringify(s), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

const view = (s: Stats) => ({ total: s.total, today: s.days[today()] || 0, since: s.since });
const noStore = { headers: { "cache-control": "no-store" } };

export async function GET() {
  return NextResponse.json(view(await read()), noStore);
}

export async function POST() {
  const s = await read();
  const d = today();
  s.total += 1;
  s.days[d] = (s.days[d] || 0) + 1;
  // 直近 KEEP_DAYS 日だけ残して JSON を小さく保つ
  const keep = Object.keys(s.days).sort().slice(-KEEP_DAYS);
  s.days = Object.fromEntries(keep.map((k) => [k, s.days[k]]));
  try {
    await write(s);
  } catch {
    // 書けなくても表示は返す(利用者の画面を止めない)
  }
  return NextResponse.json(view(s), noStore);
}
