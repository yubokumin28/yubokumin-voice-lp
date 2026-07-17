"use client";

/**
 * モニター参加表明ページ(/monitor)
 * 合言葉 → 表明画像をブラウザ内で自動合成 → X/リベシティへ投稿 → みんなの声ギャラリーに自動掲載。
 * 参考: リベシティ「稼ぐ！大交流会」参加者ページの体験を Grow Voice 向けに簡略化。
 */

import { useEffect, useRef, useState } from "react";
import { GIFEncoder, quantize, applyPalette } from "gifenc";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

const SITE_URL = "https://yubokumin-voice-lp.vercel.app";
const LIBECITY_URL = "https://libecity.com/";

/** 投稿本文(感想があれば先頭に入れる)。X もリベシティも共通で使う */
function buildPostText(comment: string): string {
  const head = comment.trim() ? `「${comment.trim()}」\n` : "";
  return `${head}無料の音声入力ツール「Grow Voice」のモニターに参加しました🎤\n話すだけで整った文章がカーソルに入る、使うほど育つツールです。\n#GrowVoice\n${SITE_URL}`;
}

type Step = "gate" | "create" | "share";
type VoiceItem = { url: string; name: string; ts: number };

/** 画像読み込み(Promise化) */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

/** 角丸クリップ */
function roundedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** 1フレーム描画(t: 0〜1 のアニメ位相) */
function drawFrame(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  name: string,
  comment: string,
  seal: HTMLImageElement | null,
  icon: HTMLImageElement | null
) {
  // 背景: クリーム→ラグーンの淡いグラデ
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#fdfbf6");
  bg.addColorStop(0.62, "#f3f8f4");
  bg.addColorStop(1, "#d9f2ef");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 下部の波(2層・横に流れる)
  const wave = (amp: number, yBase: number, color: string, phase: number) => {
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= W; x += 8) {
      ctx.lineTo(x, yBase + Math.sin((x / W) * Math.PI * 2.2 + phase + t * Math.PI * 2) * amp);
    }
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };
  wave(13, H - 77, "rgba(79,211,204,.28)", 0);
  wave(18, H - 46, "rgba(18,156,160,.30)", Math.PI / 2);

  // キラキラ(瞬く星)
  const stars: Array<[number, number, number]> = [
    [214, 76, 0],
    [710, 62, 2],
    [906, 320, 4],
    [96, 260, 1],
    [582, 408, 3],
  ];
  for (const [sx, sy, ph] of stars) {
    const a = 0.2 + 0.8 * Math.abs(Math.sin(t * Math.PI * 2 + ph));
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = "#ffc857";
    ctx.translate(sx, sy);
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.quadraticCurveTo(2, -2, 9, 0);
    ctx.quadraticCurveTo(2, 2, 0, 9);
    ctx.quadraticCurveTo(-2, 2, -9, 0);
    ctx.quadraticCurveTo(-2, -2, 0, -9);
    ctx.fill();
    ctx.restore();
  }

  // 枠線
  ctx.strokeStyle = "rgba(11,98,110,.25)";
  ctx.lineWidth = 5;
  roundedPath(ctx, 11, 11, W - 22, H - 22, 24);
  ctx.stroke();

  // ① あざらし(作者)からのお礼コメント(右下ロゴの上・ふわふわ逆位相)
  const bob = Math.sin(t * Math.PI * 2) * 5;
  ctx.textAlign = "center";
  ctx.fillStyle = "#f0603d";
  ctx.font = "700 22px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("＼ ありがとう ／", 823, 196 - bob);
  ctx.font = "700 17px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("これからもよろしくね", 823, 224 - bob);
  ctx.textAlign = "left";

  // あざらしロゴ(右下・ぷかぷか上下)
  if (seal) {
    const s = 168;
    const sx = W - 53 - s;
    const sy = H - s - 94 + bob;
    ctx.save();
    roundedPath(ctx, sx, sy, s, s, 29);
    ctx.clip();
    ctx.drawImage(seal, sx, sy, s, s);
    ctx.restore();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    roundedPath(ctx, sx, sy, s, s, 29);
    ctx.stroke();
  }

  // 見出し
  ctx.textAlign = "left";
  ctx.fillStyle = "#0b626e";
  ctx.font = "700 27px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("無料の育つ音声入力ツール", 264, 120);
  ctx.fillStyle = "#0c2b33";
  ctx.font = "700 61px 'Zen Maru Gothic', sans-serif";
  ctx.fillText("Grow Voice、", 261, 192);
  ctx.fillText("使ってみた！", 261, 264);

  // 投稿者アイコン(左上・丸)
  // 白っぽいアイコンが背景に溶けて小さく見えないよう、白い下地+ラグーン色の縁取りで円の輪郭を必ず見せる
  if (icon) {
    const iconCx = 126;
    const iconCy = 120;
    const iconR = 62;
    ctx.beginPath();
    ctx.arc(iconCx, iconCy, iconR, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    ctx.arc(iconCx, iconCy, iconR, 0, Math.PI * 2);
    ctx.clip();
    const ratio = Math.max((iconR * 2) / icon.width, (iconR * 2) / icon.height);
    const iw = icon.width * ratio;
    const ih = icon.height * ratio;
    ctx.drawImage(icon, iconCx - iw / 2, iconCy - ih / 2, iw, ih);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(iconCx, iconCy, iconR + 3, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(iconCx, iconCy, iconR + 7, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(18,156,160,.75)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // ② 使ってみた感想の吹き出し(左上アイコンの真下・文字幅にフィット・中央揃え)
  const cmt = comment.trim();
  if (cmt) {
    const maxChars = 11;
    const lines: string[] = [];
    for (let i = 0; i < cmt.length && lines.length < 3; i += maxChars) {
      lines.push(cmt.slice(i, i + maxChars));
    }
    ctx.font = "700 17px 'Zen Kaku Gothic New', sans-serif";
    const textW = Math.max(...lines.map((ln) => ctx.measureText(ln).width));
    const boxW = Math.min(textW + 32, 240);
    // アイコン(cx=126)の真下に中央合わせ。枠からはみ出す場合だけ内側へ寄せる
    let boxX = 126 - boxW / 2;
    boxX = Math.max(boxX, 15);
    boxX = Math.min(boxX, W - 15 - boxW);
    const bcx = boxX + boxW / 2;
    const lineH = 25;
    const boxH = lines.length * lineH + 22;
    const boxY = 198;
    ctx.fillStyle = "rgba(255,255,255,.9)";
    roundedPath(ctx, boxX, boxY, boxW, boxH, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(18,156,160,.55)";
    ctx.lineWidth = 3;
    roundedPath(ctx, boxX, boxY, boxW, boxH, 14);
    ctx.stroke();
    // 吹き出しのしっぽ(アイコンに向けて上向き)
    ctx.beginPath();
    ctx.moveTo(bcx - 11, boxY + 1);
    ctx.lineTo(bcx, boxY - 12);
    ctx.lineTo(bcx + 11, boxY + 1);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,.95)";
    ctx.fill();
    ctx.fillStyle = "#0c2b33";
    ctx.textAlign = "center";
    lines.forEach((ln, i) => {
      ctx.fillText(ln, bcx, boxY + 30 + i * lineH);
    });
    ctx.textAlign = "left";
  }

  // 名前プレート(画像の中央・文字幅にフィット)
  const plateY = 320;
  ctx.font = "700 37px 'Zen Kaku Gothic New', sans-serif";
  const label = `${name} さん`;
  const shown = label.length > 14 ? label.slice(0, 14) + "…" : label;
  const plateW = ctx.measureText(shown).width + 72;
  const plateX = W / 2 - plateW / 2;
  ctx.fillStyle = "rgba(255,255,255,.85)";
  roundedPath(ctx, plateX, plateY, plateW, 77, 21);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,122,89,.7)";
  ctx.lineWidth = 3;
  roundedPath(ctx, plateX, plateY, plateW, 77, 21);
  ctx.stroke();
  ctx.fillStyle = "#0c2b33";
  ctx.textAlign = "center";
  ctx.fillText(shown, W / 2, plateY + 50);
  ctx.textAlign = "left";

  // フッター(URL)
  ctx.fillStyle = "#0b626e";
  ctx.font = "700 24px 'Outfit', sans-serif";
  ctx.fillText(SITE_URL.replace("https://", ""), 264, 448);
}

/** 参加表明のアニメGIFを合成して dataURL を返す */
async function composeBanner(name: string, comment: string, iconSrc: string | null): Promise<string> {
  const W = 960;
  const H = 504;
  const FRAMES = 12;
  const DELAY = 120; // ms/フレーム
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;

  let seal: HTMLImageElement | null = null;
  let icon: HTMLImageElement | null = null;
  try {
    seal = await loadImage("/img/seal-hero.png");
  } catch {
    /* ロゴが読めなくても画像自体は成立させる */
  }
  try {
    icon = await loadImage(iconSrc || "/img/seal-hero.png");
  } catch {
    /* アイコン無しでも成立 */
  }

  const gif = GIFEncoder();
  for (let f = 0; f < FRAMES; f++) {
    drawFrame(ctx, W, H, f / FRAMES, name, comment, seal, icon);
    const { data } = ctx.getImageData(0, 0, W, H);
    const palette = quantize(data, 256);
    const index = applyPalette(data, palette);
    gif.writeFrame(index, W, H, { palette, delay: DELAY });
  }
  gif.finish();

  const blob = new Blob([gif.bytes()], { type: "image/gif" });
  return await new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result));
    r.onerror = rej;
    r.readAsDataURL(blob);
  });
}

export default function MonitorPage() {
  const [step, setStep] = useState<Step>("gate");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const [iconSrc, setIconSrc] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [items, setItems] = useState<VoiceItem[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  // ギャラリー読込
  const loadGallery = async () => {
    try {
      const r = await fetch("/api/voices", { cache: "no-store" });
      const j = await r.json();
      setItems(j.items || []);
    } catch {
      /* ギャラリーが読めなくてもページは使える */
    }
  };
  useEffect(() => {
    loadGallery();
  }, []);

  // ① 合言葉チェック
  const enter = async () => {
    setErr("");
    if (!password.trim() || !name.trim()) {
      setErr("合言葉と、表示するお名前(ニックネーム)を入れてください。");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/voices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, checkOnly: true }),
      });
      if (r.status === 401) {
        setErr("合言葉が違うようです。案内された合言葉をご確認ください。");
        return;
      }
      if (!r.ok) throw new Error();
      setStep("create");
    } catch {
      setErr("通信に失敗しました。少し待ってもう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  // アイコン画像の読み込み(端末から選択)
  const onIconPick = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setIconSrc(String(reader.result));
    reader.readAsDataURL(f);
  };

  // ② 画像を合成
  const generate = async () => {
    setBusy(true);
    setErr("");
    try {
      await (document as any).fonts?.ready;
      const url = await composeBanner(name.trim(), comment, iconSrc);
      setBanner(url);
    } catch {
      setErr("画像の作成に失敗しました。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  // ③ この画像で決定 → ギャラリー登録 → シェアへ
  const publish = async () => {
    if (!banner) return;
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/voices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, name: name.trim(), image: banner }),
      });
      if (!r.ok) throw new Error();
      setStep("share");
      loadGallery();
    } catch {
      setErr("掲載に失敗しました。少し待ってもう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  const download = () => {
    if (!banner) return;
    const a = document.createElement("a");
    a.href = banner;
    a.download = "growvoice-monitor.gif";
    a.click();
  };

  const tweet = () => {
    const url = `https://x.com/intent/post?text=${encodeURIComponent(buildPostText(comment))}`;
    window.open(url, "_blank", "noopener");
  };

  // リベシティ等に貼る用: 投稿本文をコピー
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(buildPostText(comment));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setErr("コピーに失敗しました。お手数ですが手で入力してください。");
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-lagoon-200 bg-white/80 px-4 py-3 text-ink outline-none focus:border-lagoon-400";
  const heroBtn =
    "cta-shine inline-flex items-center justify-center gap-2 rounded-full bg-coral text-white font-bold px-7 py-3.5 hover:bg-coral-dark transition disabled:opacity-50 disabled:animation-none";
  const subBtn =
    "inline-flex items-center justify-center gap-2 rounded-full border-2 border-lagoon-500 text-lagoon-700 font-bold px-7 py-3 hover:bg-lagoon-50 transition disabled:opacity-50";

  return (
    <main className="relative min-h-[100svh] text-ink overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(/img/bg-shore.jpg)" }} />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(253,251,246,.86) 0%, rgba(255,246,232,.88) 40%, rgba(253,251,246,.94) 100%)" }}
      />

      <div className="mx-auto w-[min(100%-2rem,760px)] py-[clamp(3rem,2rem+6vw,6rem)]">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-lagoon-700 hover:text-lagoon-500 mb-8">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          Grow Voice トップへ
        </a>

        <div className="text-center mb-10">
          <div className="eyebrow text-lagoon-600">🦭 MONITOR VOICES</div>
          <h1 className="display-1 text-[clamp(1.8rem,1.3rem+2.4vw,2.9rem)]">モニターのみなさまの声</h1>
          <p className="text-ink-soft mt-3 leading-relaxed">
            Grow Voice を使ってみてくれるあなたへ。<br />
            <strong className="text-ink">感想入りの画像を作って、ひとことつぶやいてもらえたら</strong>、このページに声が並びます。
          </p>
        </div>

        {/* STEP1: 合言葉 */}
        {step === "gate" && (
          <LiquidGlassCard className="p-7 md:p-9">
            <h2 className="font-display font-bold text-xl mb-1">① 合言葉を入れて入場</h2>
            <p className="text-sm text-ink-mute mb-5">合言葉は、モニター募集のご案内(リベシティのチャット等)でお伝えしています。</p>
            <label className="block text-sm font-bold mb-1">合言葉</label>
            <input className={inputCls} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="合言葉を入力" />
            <label className="block text-sm font-bold mb-1 mt-5">表示するお名前(ニックネーム)</label>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} maxLength={24} placeholder="例: あざらし親方" />
            {err && <p className="text-sm font-bold text-coral-dark mt-4">{err}</p>}
            <div className="text-center mt-7">
              <button className={heroBtn} onClick={enter} disabled={busy}>{busy ? "確認中…" : "入場する →"}</button>
            </div>
          </LiquidGlassCard>
        )}

        {/* STEP2: 画像を作る */}
        {step === "create" && (
          <LiquidGlassCard className="p-7 md:p-9">
            <h2 className="font-display font-bold text-xl mb-1">② 参加表明の画像を作る</h2>
            <p className="text-sm text-ink-mute mb-5">アイコン画像(任意)を選ぶと、あなた仕様の1枚になります。無しでも作れます。</p>
            <div className="flex items-center gap-4 mb-5">
              {iconSrc ? (
                <img src={iconSrc} alt="あなたのアイコン" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-lagoon-100 border-2 border-white shadow grid place-items-center text-2xl">🦭</div>
              )}
              <button className={subBtn} onClick={() => fileRef.current?.click()}>アイコン画像を選ぶ</button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onIconPick(e.target.files?.[0])} />
            </div>
            <label className="block text-sm font-bold mb-1">使ってみた感想(一言・任意)</label>
            <input
              className={inputCls + " mb-5"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={33}
              placeholder="例: 議事録のメモ書きがすごく楽になった！"
            />
            <p className="text-xs text-ink-mute -mt-3 mb-5">画像の吹き出しと、つぶやき本文の両方に入ります。あとから「作り直す」で変更できます。</p>
            {banner && (
              <img src={banner} alt="参加表明画像のプレビュー" className="w-full rounded-2xl border border-white shadow-lg mb-5" />
            )}
            {err && <p className="text-sm font-bold text-coral-dark mb-4">{err}</p>}
            <div className="text-center flex flex-col sm:flex-row gap-3 justify-center">
              <button className={subBtn} onClick={generate} disabled={busy}>{busy ? "作成中…" : banner ? "作り直す" : "画像を作る(数秒)"}</button>
              {banner && (
                <button className={heroBtn} onClick={publish} disabled={busy}>{busy ? "掲載中…" : "この画像で決定(みんなの声に載る) →"}</button>
              )}
            </div>
          </LiquidGlassCard>
        )}

        {/* STEP3: つぶやく */}
        {step === "share" && (
          <LiquidGlassCard className="p-7 md:p-9">
            <h2 className="font-display font-bold text-xl mb-1">③ つぶやいて完了！</h2>
            <p className="text-sm text-ink-mute mb-5">「みんなの声」への掲載が完了しました。よければ画像を添えて、ひとことつぶやいてください。</p>
            {banner && <img src={banner} alt="参加表明画像" className="w-full rounded-2xl border border-white shadow-lg mb-6" />}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className={subBtn} onClick={download}>① 画像をダウンロード</button>
              <button className={heroBtn} onClick={tweet}>② X でつぶやく(本文入り)</button>
            </div>
            <div className="mt-5 rounded-2xl bg-lagoon-50/70 border border-lagoon-200 p-4 text-center">
              <p className="text-sm font-bold text-ink mb-2">リベシティ(リベッター)でつぶやく方</p>
              <button className={subBtn} onClick={copyText}>{copied ? "✓ コピーしました！" : "投稿本文をコピー"}</button>
              <p className="text-sm text-ink-mute mt-2">
                <a href={LIBECITY_URL} target="_blank" rel="noopener" className="font-bold text-lagoon-700 underline">リベシティを開いて</a> 本文を貼り付け、①のGIF画像を添付して投稿してください。
              </p>
            </div>
          </LiquidGlassCard>
        )}

        {/* みんなの声 */}
        <section className="mt-14">
          <div className="text-center mb-6">
            <div className="eyebrow text-lagoon-600">VOICES</div>
            <h2 className="display-1 text-[clamp(1.4rem,1.1rem+1.6vw,2.1rem)]">みんなの声</h2>
            {items.length > 0 && <p className="text-sm text-ink-mute mt-1">現在 {items.length} 名の声が届いています</p>}
          </div>
          {items.length === 0 ? (
            <p className="text-center text-ink-mute">まだ投稿はありません。1人目になってくれたら嬉しいです🦭</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((it) => (
                <figure key={it.url} className="rounded-2xl overflow-hidden border border-white/70 bg-white/60 backdrop-blur shadow-[0_10px_30px_rgba(7,59,76,.12)]">
                  <img src={it.url} alt={`${it.name} さんの参加表明`} loading="lazy" className="w-full" />
                  <figcaption className="px-4 py-2.5 text-sm font-bold text-ink-soft">{it.name} さん</figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
