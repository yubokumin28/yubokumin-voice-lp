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

// Blob の CDN は最短でも 60 秒キャッシュするので、直前に自分が書いた値を
// 90 秒だけ正として持つ(読み直しで巻き戻らないための保険)。
// ⛔ 期限を切らないと、外から 0 に戻しても温まった関数が古い数を返し続ける
//    (2026-09-23 実測)。
const MEM_TTL_MS = 90_000;
const mem = globalThis as unknown as { __gvViews?: { s: Stats; at: number } };

function fresherThan(fresh: Stats): Stats | null {
  const m = mem.__gvViews;
  if (!m || Date.now() - m.at > MEM_TTL_MS) return null;
  return m.s.total > fresh.total ? m.s : null;
}

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
    return fresherThan(fresh) ?? fresh;
  } catch {
    return mem.__gvViews?.s ?? empty();
  }
}

async function write(s: Stats): Promise<void> {
  mem.__gvViews = { s, at: Date.now() };
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
