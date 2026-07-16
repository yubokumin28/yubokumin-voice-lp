import { NextRequest, NextResponse } from "next/server";
import { list, put } from "@vercel/blob";

export const runtime = "nodejs";
// キャッシュさせない(投稿が即ギャラリーに反映されるように)
export const dynamic = "force-dynamic";

const PREFIX = "voices/";
const MAX_IMAGE_BYTES = 3_800_000; // 3.8MB(アニメGIF12フレームを想定。Vercel関数のbody上限4.5MB未満)
const MAX_NAME_LEN = 24;

/** 合言葉の照合(前後空白と全角半角ゆらぎを吸収) */
function checkPassword(input: string): boolean {
  const expected = (process.env.MONITOR_PASSWORD || "").trim();
  if (!expected) return false;
  return input.normalize("NFKC").trim().toLowerCase() === expected.normalize("NFKC").toLowerCase();
}

/** GET: みんなの声一覧(新しい順) */
export async function GET() {
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 500 });
    const items = blobs
      .filter((b) => /\.(png|gif)$/.test(b.pathname))
      .map((b) => {
        // voices/{timestamp}__{encodedName}.(png|gif)
        const base = b.pathname.slice(PREFIX.length).replace(/\.(png|gif)$/, "");
        const sep = base.indexOf("__");
        const ts = Number(base.slice(0, sep));
        const name = decodeURIComponent(base.slice(sep + 2));
        return { url: b.url, name, ts: Number.isFinite(ts) ? ts : 0 };
      })
      .sort((a, b) => b.ts - a.ts);
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ items: [], error: "list_failed" }, { status: 500 });
  }
}

/** POST: 参加表明画像をギャラリーに登録 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = String(body.password || "");
    const name = String(body.name || "").trim().slice(0, MAX_NAME_LEN);
    const dataUrl = String(body.image || "");

    if (!checkPassword(password)) {
      return NextResponse.json({ error: "bad_password" }, { status: 401 });
    }
    // 合言葉チェックだけして戻る(入口ゲート用)
    if (body.checkOnly) {
      return NextResponse.json({ ok: true });
    }
    if (!name) {
      return NextResponse.json({ error: "no_name" }, { status: 400 });
    }
    const m = dataUrl.match(/^data:image\/(png|gif);base64,(.+)$/);
    if (!m) {
      return NextResponse.json({ error: "bad_image" }, { status: 400 });
    }
    const ext = m[1];
    const buf = Buffer.from(m[2], "base64");
    if (buf.byteLength > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "too_large" }, { status: 413 });
    }

    const pathname = `${PREFIX}${Date.now()}__${encodeURIComponent(name)}.${ext}`;
    const blob = await put(pathname, buf, {
      access: "public",
      contentType: `image/${ext}`,
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
