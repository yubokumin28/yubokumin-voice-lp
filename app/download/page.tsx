import type { Metadata } from "next";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ShareButtons } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "ダウンロード — Grow Voice（グロウボイス）",
  description:
    "声で話すだけで整った文章がそのままカーソルに入る、無料の音声入力ツール Grow Voice。個人でコツコツ作っています。気に入ったら SNS でひと言ひろめてもらえると嬉しいです。",
};

const X_URL = "https://x.com/Yubokumin28";
const LINKEDIN_URL = "https://www.linkedin.com/in/watarutakahashi1992/";
const LIBECITY_URL = "https://libecity.com/user_profile/c0bL05vIXaYL1a2dpMrWYBSbGEI3";

const X_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.4l7.7-8.8L1 2.3h6.8l4.7 6.2 5.7-6.2Zm-1.2 17.6h1.8L7.1 4.2H5.2L17 19.9Z" /></svg>
);

export default function DownloadPage() {
  return (
    <main className="relative min-h-[100svh] text-ink overflow-hidden">
      {/* 夜明けの海＝独立への一歩 */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(/img/bg-dawn.jpg)" }} />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(253,251,246,.80) 0%, rgba(255,246,232,.85) 38%, rgba(253,251,246,.93) 100%)" }}
      />

      <div className="mx-auto w-[min(100%-2rem,820px)] py-[clamp(3.5rem,2rem+8vw,7rem)]">
        {/* 戻る */}
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-lagoon-700 hover:text-lagoon-500 mb-8">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          Grow Voice トップへ
        </a>

        {/* ① はじめまして */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <img src="/img/seal-hero.png" alt="あざらしの遊牧民" className="w-44 h-44 md:w-52 md:h-52 mx-auto rounded-[28px] object-cover border-2 border-white shadow-[0_18px_50px_rgba(7,59,76,.22)] mb-4" />
            <div className="eyebrow text-lagoon-600">🦭 個人でツールを作っています ｜ 遊牧民</div>
            <h1 className="font-display font-bold text-[clamp(1.7rem,1.2rem+2.2vw,2.7rem)] leading-tight mt-1">「書く」を、声でラクに。</h1>
          </div>
          <div className="space-y-4 text-ink-soft leading-relaxed text-[1.02rem]">
            <p className="text-[1.12rem] font-bold text-ink">
              「キーボードを打つのが多くて、手も時間も足りない…」<br />
              <span className="text-ink-soft font-medium">そんな人のために作りました。</span>
            </p>
            <p>
              <strong className="text-ink">Grow Voice</strong> は、声で話すだけで、整った文章がそのままカーソルに入る音声入力ツールです。
              <strong className="text-ink">月額0円・完全ローカル</strong>（ネット送信なし）で、使うほどあなたの言葉に育ちます。
            </p>
          </div>
        </section>

        {/* ② ぶっちゃけストーリー */}
        <LiquidGlassCard className="!bg-white/72 p-7 md:p-9 mb-7">
          <div className="eyebrow text-coral-dark mb-2">📝 こんな人に</div>
          <h2 className="font-display font-bold text-2xl md:text-[1.7rem] mb-4">たくさん書く人ほど、ラクになります。</h2>
          <div className="space-y-4 text-ink-soft leading-relaxed">
            <p>
              議事録・メール・チャット・ブログ・原稿…<strong className="text-ink">文字を打つ時間が長い人</strong>ほど、効果が大きいツールです。
              話すスピードは、タイピングよりずっと速い。考えたことを、そのまま声で残せます。
            </p>
            <p>
              市販の音声入力は月額制やクラウド送信が多いけれど、Grow Voice は
              <strong className="text-ink">完全無料・このPCの中だけ</strong>で完結。誤変換は、使うほど
              <strong className="text-ink">あなた専用の辞書</strong>に覚えていきます。
            </p>
            <p className="font-display font-bold text-lagoon-700 text-center pt-1">＼ まずは気軽に使ってみてください ／</p>
          </div>
        </LiquidGlassCard>

        {/* ③ 拡散のお願い（主役） */}
        <div className="relative rounded-[26px] overflow-hidden mb-7 shadow-[0_20px_60px_rgba(7,59,76,.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-lagoon-700 via-lagoon-600 to-lagoon-800" />
          <div className="relative p-7 md:p-10 text-center text-white">
            <div className="text-4xl mb-3">📣</div>
            <p className="peek-badge inline-block rounded-full bg-sun text-lagoon-900 font-display font-bold text-[clamp(1.05rem,.9rem+.8vw,1.45rem)] px-7 py-2.5 mb-5 shadow-[0_12px_36px_rgba(255,200,87,.5)]">
              ＼ ここが、いちばんのお願いです ／
            </p>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">気に入ったら、ひと言つぶやいて<br className="md:hidden" />広めてください。</h2>
            <p className="text-lagoon-100 leading-relaxed mb-6">
              料金も登録もいりません。<br className="sm:hidden" />
              あなたの<strong className="text-white">ひと言</strong>が、次の道具を作る燃料になります。
            </p>

            <ShareButtons />

            <div className="mt-7 pt-6 border-t border-white/15">
              <p className="text-sm text-lagoon-100 mb-3">フォローしてくれたら、新しい道具をここでお知らせします。</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href={X_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white bg-ink/90 ring-1 ring-white/20 hover:bg-ink hover:scale-[1.03] transition-all">
                  {X_ICON}<span>X でフォロー</span>
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white bg-[#0a66c2] ring-1 ring-white/20 hover:brightness-110 hover:scale-[1.03] transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6ZM8.3 18.3H5.4V9.5h2.9v8.8ZM6.9 8.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm11.4 10H15.4v-4.3c0-1 0-2.4-1.4-2.4s-1.7 1.1-1.7 2.3v4.4H9.5V9.5h2.7v1.2h.1a3 3 0 0 1 2.7-1.5c2.9 0 3.4 1.9 3.4 4.4v4.7Z" /></svg>
                  <span>LinkedIn</span>
                </a>
                <a href={LIBECITY_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-coral to-coral-dark ring-1 ring-white/20 hover:scale-[1.03] transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m0 0a4 4 0 1 1 6 0M16 7a3 3 0 1 1-3.5 4.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>リベシティ</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* つなぎ */}
        <p className="text-center text-sm font-bold text-lagoon-700 mb-4">⬇ つぶやいてくれたら最高! その下から、無料でダウンロードできます</p>

        {/* ④ ツールを試す（3パターンから選ぶ） */}
        <LiquidGlassCard className="!bg-white/70 p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="eyebrow text-lagoon-600 mb-1">Try it ・ 無料 ・ v1.1.4</div>
            <h3 className="font-display font-bold text-xl md:text-2xl mb-2">お使いのパソコンに合わせて選んでください</h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              中身は同じ音声入力ツールです。<strong className="text-ink">お使いの機種に合わせて軽さと速さを調整した3種類</strong>を用意しました。
            </p>
          </div>

          {/* 迷ったときの1行ガイド */}
          <div className="rounded-2xl bg-sun/25 border border-sun/60 px-4 py-3 mb-6 text-center">
            <p className="text-sm font-bold text-ink">
              迷ったら ─ ノートパソコンなら <span className="text-lagoon-700">①</span> ／ デスクトップなら <span className="text-lagoon-700">②</span> ／ Mac なら <span className="text-lagoon-700">③</span>
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {/* ① ノートパソコン用 */}
            <div className="flex flex-col rounded-2xl bg-white/80 border border-lagoon-200 p-5 shadow-[0_8px_28px_rgba(7,59,76,.10)]">
              <div className="text-3xl mb-2" aria-hidden="true">💻</div>
              <div className="eyebrow text-lagoon-600">① ノートパソコン用</div>
              <h4 className="font-display font-bold text-lg mb-2 leading-snug">持ち運ぶノートPCに</h4>
              <ul className="text-sm text-ink-soft leading-relaxed space-y-1.5 mb-4 flex-1">
                <li>・グラフィックボードは<strong className="text-ink">不要</strong></li>
                <li>・メモリ 8GB でも動きます</li>
                <li>・<strong className="text-ink">電池と発熱に配慮</strong>した設定</li>
                <li>・他のアプリを止めにくい作り</li>
              </ul>
              <a href="https://github.com/yubokumin28/grow-voice-releases/releases/download/v1.1.4/GrowVoice-Windows-Laptop-v1.1.4.zip"
                className="btn-glint inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white bg-lagoon-700 hover:bg-lagoon-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3 5.6 10.4 4.5v7.1H3V5.6Zm0 12.8 7.4 1.1v-7H3v5.9Zm8.4 1.2L21 21V12.6h-9.6v7Zm0-15.7v7.2H21V3l-9.6 1.2Z" /></svg>
                ダウンロード
              </a>
              <p className="text-[11px] text-ink-mute text-center mt-2">Windows ・ 約103MB</p>
            </div>

            {/* ② デスクトップ用 */}
            <div className="flex flex-col rounded-2xl bg-white/80 border border-lagoon-200 p-5 shadow-[0_8px_28px_rgba(7,59,76,.10)]">
              <div className="text-3xl mb-2" aria-hidden="true">🖥️</div>
              <div className="eyebrow text-lagoon-600">② デスクトップ用</div>
              <h4 className="font-display font-bold text-lg mb-2 leading-snug">速さを求めるなら</h4>
              <ul className="text-sm text-ink-soft leading-relaxed space-y-1.5 mb-4 flex-1">
                <li>・<strong className="text-ink">いちばん高精度なモデル</strong></li>
                <li>・グラフィックボードがあると高速</li>
                <li>・句読点や誤変換をAIが自動学習</li>
                <li>・メモリ 16GB 以上を推奨</li>
              </ul>
              <a href="https://github.com/yubokumin28/grow-voice-releases/releases/download/v1.1.4/GrowVoice-Windows-Desktop-v1.1.4.zip"
                className="btn-glint inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white bg-lagoon-700 hover:bg-lagoon-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3 5.6 10.4 4.5v7.1H3V5.6Zm0 12.8 7.4 1.1v-7H3v5.9Zm8.4 1.2L21 21V12.6h-9.6v7Zm0-15.7v7.2H21V3l-9.6 1.2Z" /></svg>
                ダウンロード
              </a>
              <p className="text-[11px] text-ink-mute text-center mt-2">Windows ・ 約104MB</p>
            </div>

            {/* ③ Mac用 */}
            <div className="flex flex-col rounded-2xl bg-white/80 border border-ink/15 p-5 shadow-[0_8px_28px_rgba(7,59,76,.10)]">
              <div className="text-3xl mb-2" aria-hidden="true">🍎</div>
              <div className="eyebrow text-ink-soft">③ Mac用</div>
              <h4 className="font-display font-bold text-lg mb-2 leading-snug">MacBook / iMac に</h4>
              <ul className="text-sm text-ink-soft leading-relaxed space-y-1.5 mb-4 flex-1">
                <li>・Apple Silicon (M1〜M4) 対応</li>
                <li>・ノート / デスクトップ共通</li>
                <li>・初回だけ<strong className="text-ink">右クリック → 開く</strong></li>
                <li>・<strong className="text-ink">お試し版(Beta)</strong>です</li>
              </ul>
              <a href="https://github.com/yubokumin28/grow-voice-releases/releases/download/v1.1.4/GrowVoice-macOS-v1.1.4.zip"
                className="btn-glint inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white bg-ink hover:opacity-90 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8s-1.9-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3ZM14.3 5.7c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.7-1.3Z" /></svg>
                ダウンロード
              </a>
              <p className="text-[11px] text-ink-mute text-center mt-2">macOS ・ 約75MB</p>
            </div>
          </div>

          {/* 共通の補足 */}
          <div className="mt-6 pt-5 border-t border-lagoon-200/70 space-y-2 text-xs text-ink-mute leading-relaxed">
            <p>
              <strong className="text-ink-soft">3つとも共通:</strong> 完全ローカルで月額0円・クラウド送信なし。
              <strong className="text-ink-soft">Python のインストールは不要</strong>です。解凍してアプリをダブルクリックするだけで常駐します。
            </p>
            <p>
              <strong className="text-ink-soft">やめたくなったら:</strong> Windows は「設定 → アプリ」から、Mac はメニューバーのアイコンから
              <strong className="text-ink-soft">アンインストール</strong>を選ぶだけ。残りかすもまとめて消えます(v1.1.4 から)。
            </p>
            <p>
              <strong className="text-ink-soft">選び方に迷ったら:</strong> ①と②の違いは「速さ」と「PCへの負担」だけで、使い方も認識できる言葉も同じです。
              ノートPCで②を使うと動作が重くなることがあります。
            </p>
            <p>
              <strong className="text-ink-soft">Mac をお使いの方へ:</strong> 署名を付けていないため、初回起動は
              <strong className="text-ink-soft">右クリック → 開く</strong>で許可してください。マイクとアクセシビリティの許可も求められます。
              詳しくは ZIP 同梱の <strong className="text-ink-soft">README-macOS.txt</strong> と <strong className="text-ink-soft">manual.html</strong> をご覧ください。
            </p>
          </div>
        </LiquidGlassCard>

        <p className="text-center text-xs text-ink-mute mt-10">© 2026 Yubokumin Lab ・ 建設 × AI自動化を、ひとりで。海の向こうから。</p>
      </div>
    </main>
  );
}
