import type { Metadata } from "next";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "ダウンロード — Grow Voice（グロウボイス）",
  description:
    "Grow Voiceは無料で配っています。作っているのはひとり。もし役に立ったら、SNSのフォローだけお願いします。",
};

const X_URL = "https://x.com/Yubokumin28";
const LINKEDIN_URL = "https://www.linkedin.com/in/watarutakahashi1992/";
const LIBECITY_URL = "https://libecity.com/user_profile/c0bL05vIXaYL1a2dpMrWYBSbGEI3";
// TODO: 配布ファイル（ZIP / GitHub Release / Drive）のURLが決まったらここに入れる。空のままなら「準備中」表示。
const DOWNLOAD_URL = "";

export default function DownloadPage() {
  const ready = DOWNLOAD_URL.length > 0;

  return (
    <main className="relative min-h-[100svh] text-ink overflow-hidden">
      {/* 海の背景 */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(/img/hero-bg.png)" }} />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(253,251,246,.86) 0%, rgba(234,250,248,.9) 45%, rgba(253,251,246,.96) 100%)" }}
      />

      <div className="mx-auto w-[min(100%-2rem,860px)] py-[clamp(4rem,2rem+8vw,7rem)]">
        {/* 戻る */}
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-lagoon-700 hover:text-lagoon-500 mb-8">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          Grow Voice トップへ
        </a>

        {/* ① はじめまして（自己紹介） */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-5">
            <img src="/img/seal-logo.jpg" alt="遊牧民ラボ" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-[0_8px_24px_rgba(7,59,76,.15)]" />
            <div>
              <div className="eyebrow text-lagoon-600">About / はじめまして</div>
              <h1 className="font-display font-bold text-[clamp(1.6rem,1.2rem+2vw,2.6rem)] leading-tight">作っているのは、ひとりです。</h1>
            </div>
          </div>
          <div className="space-y-4 text-ink-soft leading-relaxed text-[1.02rem]">
            <p>
              はじめまして。<strong className="text-ink">遊牧民ラボ</strong>です。建設の現場で働きながら、
              日々の「めんどくさい作業」をAIで減らす道具を、ひとりでコツコツ作っています。
              この <strong className="text-ink">Grow Voice（グロウボイス）</strong> もそのひとつ。
            </p>
            <p>
              完全に<strong className="text-ink">無料</strong>で配っています。お金より先に、いま欲しいのは
              「こんな道具を作っているやつがいる」と<strong className="text-ink">知ってもらうこと</strong>。
              それが、次の道具を作りつづける燃料になります。
            </p>
          </div>
        </section>

        {/* ② フォローのお願い */}
        <LiquidGlassCard className="!bg-white/70 p-7 md:p-9 mb-8">
          <div className="text-center">
            <div className="text-3xl mb-2">🦭</div>
            <h2 className="font-display font-bold text-xl md:text-2xl mb-2">
              もし役に立ちそうなら、<br className="md:hidden" />フォローだけお願いします。
            </h2>
            <p className="text-ink-soft leading-relaxed max-w-[42ch] mx-auto mb-6">
              料金も登録もいりません。代わりに、どちらかをフォローしてもらえると、
              開発を続ける励みになります。新しい道具ができたらここでお知らせします。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={X_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white bg-ink hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_rgba(12,43,51,.3)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.4l7.7-8.8L1 2.3h6.8l4.7 6.2 5.7-6.2Zm-1.2 17.6h1.8L7.1 4.2H5.2L17 19.9Z" /></svg>
                Xでフォロー
              </a>
              <a
                href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white bg-lagoon-600 hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_rgba(13,126,135,.3)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6ZM8.3 18.3H5.4V9.5h2.9v8.8ZM6.9 8.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm11.4 10H15.4v-4.3c0-1 0-2.4-1.4-2.4s-1.7 1.1-1.7 2.3v4.4H9.5V9.5h2.7v1.2h.1a3 3 0 0 1 2.7-1.5c2.9 0 3.4 1.9 3.4 4.4v4.7Z" /></svg>
                LinkedInでフォロー
              </a>
              <a
                href={LIBECITY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white bg-coral hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_rgba(255,122,89,.3)]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m0 0a4 4 0 1 1 6 0M16 7a3 3 0 1 1-3.5 4.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                リベシティでフォロー
              </a>
            </div>
          </div>
        </LiquidGlassCard>

        {/* ③ ダウンロード */}
        <LiquidGlassCard className="!bg-white/60 p-7 md:p-9 text-center">
          <div className="eyebrow text-lagoon-600 mb-1">Download</div>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">Grow Voice を手に入れる</h2>
          {ready ? (
            <>
              <p className="text-ink-soft mb-6">Windows 用 ・ 完全無料 ・ 月額もトークン消費もゼロ</p>
              <GlassButton href={DOWNLOAD_URL} primary className="text-lg !px-8 !py-4">
                ダウンロード（無料）
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14" /></svg>
              </GlassButton>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sun/20 border border-sun/40 text-ink font-bold mb-4">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                公開準備中
              </div>
              <p className="text-ink-soft leading-relaxed max-w-[40ch] mx-auto">
                いま最後の仕上げをしています。上のX・LinkedInをフォローしておけば、
                公開したらすぐ気づけます。もう少しだけ、お待ちください。
              </p>
            </>
          )}
        </LiquidGlassCard>

        <p className="text-center text-xs text-ink-mute mt-10">© 2026 Yubokumin Lab ・ 建設×AI自動化を、ひとりで。</p>
      </div>
    </main>
  );
}
