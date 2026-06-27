import type { Metadata } from "next";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

export const metadata: Metadata = {
  title: "作っている人 — Grow Voice（グロウボイス）",
  description:
    "サラリーマンから個人事業主へ。AIで時間を生み出す道具を、ひとりで作っています。気に入ったら、SNSでひと言ひろめてください。",
};

const X_URL = "https://x.com/Yubokumin28";
const LINKEDIN_URL = "https://www.linkedin.com/in/watarutakahashi1992/";
const LIBECITY_URL = "https://libecity.com/user_profile/c0bL05vIXaYL1a2dpMrWYBSbGEI3";

// SNS 拡散用：紹介文を入れた状態で X が開く
const SITE_URL = "https://yubokumin-voice-lp.vercel.app";
const SHARE_TEXT =
  "声で話すだけで、整った文章がそのままカーソルに入る無料の音声入力ツール『Grow Voice』。使うほど自分の言葉に育つ辞書がすごい。完全ローカルで月額0・トークン消費0。";
const TWEET_URL =
  "https://twitter.com/intent/tweet?text=" +
  encodeURIComponent(SHARE_TEXT) +
  "&url=" + encodeURIComponent(SITE_URL) +
  "&via=Yubokumin28&hashtags=" + encodeURIComponent("GrowVoice,音声入力");

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
            <div className="eyebrow text-lagoon-600">🤖 AIロボットクリエイター ｜ 遊牧民</div>
            <h1 className="font-display font-bold text-[clamp(1.7rem,1.2rem+2.2vw,2.7rem)] leading-tight mt-1">サラリーマンから、個人事業主へ。</h1>
          </div>
          <div className="space-y-4 text-ink-soft leading-relaxed text-[1.02rem]">
            <p className="text-[1.12rem] font-bold text-ink">
              「毎日同じことの繰り返しで、自分の時間が全くない…」<br />
              <span className="text-ink-soft font-medium">そんな風に、悩んでいませんか？</span>
            </p>
            <p>
              私は、あなたの時間を生み出す<strong className="text-ink">AIツール</strong>や、3Dで魅せる
              <strong className="text-ink">「ホームページ・LP」</strong>を、ひとりで開発しています。
              この <strong className="text-ink">Grow Voice</strong> もそのひとつ。完全無料で配っているのは、
              お金より先に<strong className="text-ink">「こんなやつがいる」</strong>と知ってほしいからです。🔥
            </p>
            <p className="text-sm text-ink-mute">アイコンは、あざらし好きな妻 👸🏻 のために “あざらしの遊牧民” にしました 🦭</p>
          </div>
        </section>

        {/* ② ぶっちゃけストーリー */}
        <LiquidGlassCard className="!bg-white/72 p-7 md:p-9 mb-7">
          <div className="eyebrow text-coral-dark mb-2">📖 ぶっちゃけます</div>
          <h2 className="font-display font-bold text-2xl md:text-[1.7rem] mb-4">サラリーマン、もう飽きませんか？</h2>
          <div className="space-y-4 text-ink-soft leading-relaxed">
            <p>
              転職と移住を繰り返し、<strong className="text-ink">20種類以上の泥臭い仕事</strong>を経験。
              その中で <strong className="text-ink">3年で年収 +400万円 / 資産600万</strong> を作り、残業もほぼゼロに。
            </p>
            <p>
              でも気づきました。どれだけ効率化しても、会社員でいる限り
              <strong className="text-ink">「他人のために、自分の時間を切り売りしている」</strong>だけ。
              だから今、Claude Code や Python で道具を自作し、<strong className="text-ink">個人事業主としての独立</strong>へ突き進んでいます。
            </p>
            <p className="font-display font-bold text-lagoon-700 text-center pt-1">＼ すべての物事は、あなたの解釈で世界が一変する ／</p>
          </div>
        </LiquidGlassCard>

        {/* ③ 拡散のお願い（主役） */}
        <div className="relative rounded-[26px] overflow-hidden mb-7 shadow-[0_20px_60px_rgba(7,59,76,.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-lagoon-700 via-lagoon-600 to-lagoon-800" />
          <div className="relative p-7 md:p-10 text-center text-white">
            <div className="text-4xl mb-3">📣</div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">気に入ったら、ひと言つぶやいて<br className="md:hidden" />広めてください。</h2>
            <p className="text-lagoon-100 leading-relaxed max-w-[46ch] mx-auto mb-3">
              <strong className="text-white">ダウンロードの前に、ひと言だけ。</strong>料金も登録もいりません。
              あなたの<strong className="text-white">ひとつぶやき</strong>が、次の道具を作りつづける一番の燃料になります。
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sun/25 border border-sun/50 px-3 py-1 text-xs font-bold text-white mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sun animate-pulse" />ここが、いちばんのお願いです
            </div>

            <div>
              <a href={TWEET_URL} target="_blank" rel="noopener noreferrer"
                className="peek-badge inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-lagoon-800 bg-white ring-4 ring-white/30 hover:scale-[1.04] transition-transform shadow-[0_20px_52px_rgba(0,0,0,.3)]">
                {X_ICON}
                X でつぶやいて広める
              </a>
            </div>
            <p className="text-xs text-lagoon-200 mt-3">タップすると、紹介文が入った状態で X が開きます。そのまま投稿 OK 🙌</p>

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

        {/* ④ ツールを試す（控えめ・無料DL） */}
        <LiquidGlassCard className="!bg-white/70 p-6 md:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1">
              <div className="eyebrow text-lagoon-600 mb-1">Try it ・ 無料 ・ v1.0.1</div>
              <h3 className="font-display font-bold text-lg mb-1">自動学習AI付き・音声入力ツール</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                使うほど、あなた好みに育つ。完全ローカルで月額0・トークン消費0。
                解凍したら「① はじめに(マニュアル)」を開き、「② 音声入力を起動」を押すだけ。初回だけ自動準備します。
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <a href="/downloads/GrowVoice-Windows-v1.0.1.zip" download
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white bg-lagoon-700 hover:bg-lagoon-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3 5.6 10.4 4.5v7.1H3V5.6Zm0 12.8 7.4 1.1v-7H3v5.9Zm8.4 1.2L21 21V12.6h-9.6v7Zm0-15.7v7.2H21V3l-9.6 1.2Z" /></svg>
                Windows
              </a>
              <a href="/downloads/GrowVoice-macOS-v1.0.1.zip" download
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold text-white bg-ink hover:opacity-90 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8s-1.9-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3ZM14.3 5.7c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.7-1.3Z" /></svg>
                Mac
              </a>
            </div>
          </div>
          <p className="text-xs text-ink-mute mt-3">くわしい手順は ZIP 同梱の <strong>manual.html</strong>(Windows / Mac 別)を見てください。</p>
        </LiquidGlassCard>

        <p className="text-center text-xs text-ink-mute mt-10">© 2026 Yubokumin Lab ・ 建設 × AI自動化を、ひとりで。海の向こうから。</p>
      </div>
    </main>
  );
}
