import type { Metadata } from "next";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export const metadata: Metadata = {
  title: "作っている人 — Grow Voice（グロウボイス）",
  description:
    "サラリーマンから個人事業主へ。AIで時間を生み出す道具を、ひとりで作っています。役に立ちそうなら、フォローだけお願いします。",
};

const X_URL = "https://x.com/Yubokumin28";
const LINKEDIN_URL = "https://www.linkedin.com/in/watarutakahashi1992/";
const LIBECITY_URL = "https://libecity.com/user_profile/c0bL05vIXaYL1a2dpMrWYBSbGEI3";
// TODO: 配布ファイルのURLが決まったらここに入れる。空のままなら「準備中」表示。
const DOWNLOAD_URL = "";

const MOVES = [
  "秋田", "群馬", "小樽", "海老名", "鈴鹿", "ベトナム", "箱根", "河口湖",
  "伊豆", "忍野", "東北全域", "九州", "高崎", "宇都宮",
];
const JOBS = [
  "現場監督", "自動車期間工", "ボーリング場・カラオケ清掃", "塾講師", "家庭教師",
  "結婚式プランナー", "ホテル", "バーテンダー", "厨房", "旅館仲居", "洗い場",
  "大学事務", "輸入ビジネス", "発注者支援", "資料作成",
];

export default function DownloadPage() {
  const ready = DOWNLOAD_URL.length > 0;

  return (
    <main className="relative min-h-[100svh] text-ink overflow-hidden">
      {/* 夜明けの海＝独立への一歩 */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(/img/bg-dawn.jpg)" }} />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, rgba(253,251,246,.80) 0%, rgba(255,246,232,.85) 38%, rgba(253,251,246,.93) 100%)" }}
      />

      <div className="mx-auto w-[min(100%-2rem,880px)] py-[clamp(3.5rem,2rem+8vw,7rem)]">
        {/* 戻る */}
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-lagoon-700 hover:text-lagoon-500 mb-8">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          Grow Voice トップへ
        </a>

        {/* ① はじめまして */}
        <section className="mb-9">
          <div className="flex items-center gap-4 mb-5">
            <img src="/img/seal-logo.jpg" alt="あざらしの遊牧民" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-[0_8px_24px_rgba(7,59,76,.15)]" />
            <div>
              <div className="eyebrow text-lagoon-600">🤖 AIロボットクリエイター ｜ 遊牧民</div>
              <h1 className="font-display font-bold text-[clamp(1.6rem,1.2rem+2vw,2.6rem)] leading-tight">サラリーマンから、<br className="md:hidden" />個人事業主へ。</h1>
            </div>
          </div>
          <div className="space-y-4 text-ink-soft leading-relaxed text-[1.02rem]">
            <p className="text-[1.15rem] font-bold text-ink">
              「毎日同じことの繰り返しで、自分の時間が全くない…」<br />
              <span className="text-ink-soft font-medium">そんな風に、悩んでいませんか？</span>
            </p>
            <p>
              私は、あなたの貴重な時間を生み出す便利な<strong className="text-ink">AIツール</strong>や、
              3Dアニメーションでお客さまを魅了する<strong className="text-ink">「ホームページ・LP」</strong>を開発しています。
              将来は<strong className="text-ink">【AIの個人事業主】</strong>として独立するため、いま爆速成長中です！🔥
            </p>
            <div className="rounded-2xl bg-sun/15 border border-sun/35 px-5 py-4">
              <p className="font-display font-bold text-ink text-lg">＼ 今日1日を、最高の一日に！！🥂✨ ／</p>
              <p className="text-sm text-ink-mute mt-1">アイコンは、あざらし好きな妻 👸🏻 のために “あざらしの遊牧民” にしました 🦭</p>
            </div>
          </div>
        </section>

        {/* ② ぶっちゃけストーリー */}
        <LiquidGlassCard className="!bg-white/72 p-7 md:p-9 mb-7">
          <div className="eyebrow text-coral-dark mb-2">📖 ぶっちゃけます</div>
          <h2 className="font-display font-bold text-2xl md:text-[1.7rem] mb-4">サラリーマン、もう飽きませんか？</h2>
          <div className="space-y-4 text-ink-soft leading-relaxed">
            <p>
              これまで転職と移住を繰り返し、<strong className="text-ink">20種類以上の泥臭い仕事</strong>を経験してきました。
              その結果、<strong className="text-ink">3年で年収 +400万円UP / 資産600万</strong> を達成し、職場の残業もほぼゼロに。
            </p>
            <p>
              でも、気づいてしまったんです。どれだけ効率化して成果を出しても、会社員である以上、結局は
              <strong className="text-ink">「他人のために、自分の時間を切り売りしている」</strong>だけ。
              あなたの人生の主導権は、本当にあなたにありますか？
            </p>
            <p className="font-display font-bold text-ink text-lg">「自分の好きな時間に、自分の力で、自由に働きたい」</p>
            <p>
              その理想を現実にするため、<strong className="text-ink">Claude Code・Antigravity・Python・マクロ</strong>を駆使し、
              自動化ツールを自作してフリーランス独立へ突き進んでいます！
            </p>
            <p className="font-display font-bold text-lagoon-700 text-center pt-2">＼ すべての物事は、あなたの解釈によって世界は一変する ／</p>
          </div>
        </LiquidGlassCard>

        {/* ③ 限定公開ツール */}
        <div className="relative rounded-[26px] p-[1.5px] bg-gradient-to-br from-sun via-[#ff9b76] to-coral mb-7 shadow-[0_18px_50px_rgba(255,122,89,.22)]">
          <div className="rounded-[25px] bg-white/85 backdrop-blur-md p-7 md:p-9 text-center">
            <div className="eyebrow text-coral-dark mb-1">✨ 限定公開</div>
            <h2 className="font-display font-bold text-2xl md:text-[1.7rem] mb-3">自動学習AI付き・音声入力ツール</h2>
            <p className="text-ink-soft leading-relaxed max-w-[44ch] mx-auto mb-6">
              使えば使うほど、あなた好みに賢くなるツールを公開しています。
              驚くほど作業がラクになるので、ぜひ<strong className="text-ink">あなた自身の手で</strong>体感してみてください！
            </p>
            <GlassButton href="#get" primary className="text-lg !px-8 !py-4">
              このツールを試す
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </GlassButton>
            <p className="text-xs text-ink-mute mt-4">※ 使ってみた感想を DM で教えてもらえると、最高に嬉しいです！</p>
          </div>
        </div>

        {/* ④ DM受付中 */}
        <LiquidGlassCard className="!bg-white/72 p-7 md:p-9 mb-7">
          <div className="eyebrow text-lagoon-600 mb-1">📣 DM受付中</div>
          <h2 className="font-display font-bold text-2xl md:text-[1.7rem] mb-4">あなたの課題、AIで解決します</h2>
          <ul className="space-y-3 mb-6">
            {[
              "あなただけの、オーダーメイドなAIワークフローが欲しい",
              "動きのある面白いWebデザインで、ビジネスの認知度を上げたい",
              "面倒な業務を、ボタン一つレベルに爆速で効率化したい",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-ink-soft leading-relaxed">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-lagoon-100 text-lagoon-700 grid place-items-center text-sm font-bold">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-ink-soft leading-relaxed mb-5">
            個人・企業問わず、小さな疑問から「こんなことできる？」というご相談まで、
            すべて<strong className="text-ink">【ダイレクトメッセージ（DM）】</strong>から、どしどしお気軽にどうぞ！🙌
          </p>
          <a
            href={X_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-white bg-ink hover:-translate-y-0.5 transition-transform shadow-[0_12px_34px_rgba(12,43,51,.32)]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.4l7.7-8.8L1 2.3h6.8l4.7 6.2 5.7-6.2Zm-1.2 17.6h1.8L7.1 4.2H5.2L17 19.9Z" /></svg>
            X の DM で相談する
          </a>
        </LiquidGlassCard>

        {/* ⑤ フォローのお願い（主役） */}
        <div className="relative rounded-[26px] overflow-hidden mb-7 shadow-[0_20px_60px_rgba(7,59,76,.18)]">
          <div className="absolute inset-0 bg-gradient-to-br from-lagoon-700 via-lagoon-600 to-lagoon-800" />
          <div className="relative p-7 md:p-10 text-center text-white">
            <div className="text-4xl mb-3">🫶</div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">最後まで読んだあなたは、<br className="md:hidden" />とても優しい人。</h2>
            <p className="text-lagoon-100 leading-relaxed max-w-[44ch] mx-auto mb-7">
              ぜひフォローして、仲良くしてください！料金も登録もいりません。
              新しい道具ができたら、ここでお知らせします。それが、作りつづける燃料になります。
            </p>
            <div className="grid sm:grid-cols-3 gap-3 max-w-[560px] mx-auto">
              <a href={X_URL} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-bold text-white bg-ink/90 ring-1 ring-white/20 hover:bg-ink hover:scale-[1.03] transition-all shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.6l-5.2-6.8-6 6.8H1.4l7.7-8.8L1 2.3h6.8l4.7 6.2 5.7-6.2Zm-1.2 17.6h1.8L7.1 4.2H5.2L17 19.9Z" /></svg>
                X でフォロー
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-bold text-white bg-[#0a66c2] ring-1 ring-white/20 hover:brightness-110 hover:scale-[1.03] transition-all shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6ZM8.3 18.3H5.4V9.5h2.9v8.8ZM6.9 8.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm11.4 10H15.4v-4.3c0-1 0-2.4-1.4-2.4s-1.7 1.1-1.7 2.3v4.4H9.5V9.5h2.7v1.2h.1a3 3 0 0 1 2.7-1.5c2.9 0 3.4 1.9 3.4 4.4v4.7Z" /></svg>
                LinkedIn
              </a>
              <a href={LIBECITY_URL} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 font-bold text-white bg-gradient-to-br from-coral to-coral-dark ring-1 ring-white/20 hover:scale-[1.03] transition-all shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m0 0a4 4 0 1 1 6 0M16 7a3 3 0 1 1-3.5 4.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                リベシティ
              </a>
            </div>
          </div>
        </div>

        {/* ⑥ これまでの歩み */}
        <LiquidGlassCard className="!bg-white/70 p-7 md:p-9 mb-7">
          <div className="eyebrow text-lagoon-600 mb-1">📍 これまでの歩み</div>
          <h2 className="font-display font-bold text-xl md:text-2xl mb-1">泥臭い経験が、私の強みの原点です</h2>
          <p className="text-sm text-ink-mute mb-5">移住14か所・職種20種以上。この雑多さが、現場で効く道具づくりの土台になっています。</p>

          <div className="mb-5">
            <div className="text-sm font-bold text-lagoon-700 mb-2">🗺️ 移住の軌跡</div>
            <div className="flex flex-wrap items-center gap-1.5">
              {MOVES.map((m, i) => (
                <span key={m} className="inline-flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-lagoon-50 text-lagoon-700 text-sm font-medium border border-lagoon-100">{m}</span>
                  {i < MOVES.length - 1 && <span className="text-lagoon-300">→</span>}
                </span>
              ))}
            </div>
            <p className="text-sm text-ink-mute mt-2">現在は栃木で仮住まい。もうゲルが欲しい 🐃</p>
          </div>

          <div>
            <div className="text-sm font-bold text-lagoon-700 mb-2">🛠️ 経験してきた職種</div>
            <div className="flex flex-wrap gap-2">
              {JOBS.map((j) => (
                <span key={j} className="px-3 py-1 rounded-full bg-sand-100 text-ink-soft text-sm border border-sand-300">{j}</span>
              ))}
            </div>
          </div>
        </LiquidGlassCard>

        {/* ⑦ ダウンロード */}
        <div id="get" className="scroll-mt-8" />
        <LiquidGlassCard className="!bg-white/65 p-7 md:p-9 text-center">
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
                いま最後の仕上げをしています。上の X ・ LinkedIn をフォローしておけば、
                公開したらすぐ気づけます。もう少しだけ、お待ちください。
              </p>
            </>
          )}
        </LiquidGlassCard>

        <p className="text-center text-xs text-ink-mute mt-10">© 2026 Yubokumin Lab ・ 建設 × AI自動化を、ひとりで。海の向こうから。</p>
      </div>
    </main>
  );
}
