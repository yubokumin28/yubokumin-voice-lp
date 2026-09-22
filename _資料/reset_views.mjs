// 閲覧数カウンターをゼロに戻す(動作確認で増えた分を消すため。2026-09-23)
// 使い方: node "_資料/reset_views.mjs"
import fs from "node:fs";
import path from "node:path";
import { put, head } from "@vercel/blob";

const root = path.resolve(process.cwd());
for (const line of fs.readFileSync(path.join(root, ".env.local"), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
}

const PATH = "stats/download-views.json";
const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
const stats = { total: 0, days: {}, since: today };

await put(PATH, JSON.stringify(stats), {
  access: "public",
  contentType: "application/json",
  addRandomSuffix: false,
  allowOverwrite: true,
  cacheControlMaxAge: 60,
});
const h = await head(PATH);
const r = await fetch(`${h.url}?t=${Date.now()}`, { cache: "no-store" });
console.log("reset ->", await r.text());
