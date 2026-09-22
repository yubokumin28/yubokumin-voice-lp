import type { Metadata } from "next";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ShareButtons } from "@/components/ShareButtons";
import { PromptCopyBlocks } from "@/components/PromptCopyBlocks";
import { ViewCounter } from "@/components/ViewCounter";

export const metadata: Metadata = {
  title: "ダウンロード — Grow Voice（グロウボイス）",
  description:
    "声で話すだけで整った文章がそのままカーソルに入る、無料の音声入力ツール Grow Voice。個人でコツコツ作っています。気に入ったらリベシティでひと言つぶやいてもらえると嬉しいです。",
};

const LIBECITY_URL = "https://libecity.com/user_profile/c0bL05vIXaYL1a2dpMrWYBSbGEI3";

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
            <img src="/img/seal-hero.webp" alt="あざらしの遊牧民" className="w-44 h-44 md:w-52 md:h-52 mx-auto rounded-[28px] object-cover bg-white border-2 border-white shadow-[0_18px_50px_rgba(7,59,76,.22)] mb-4" />
            <div className="eyebrow text-lagoon-600">🦭 個人でツールを作っています ｜ 遊牧民</div>
            <h1 className="font-display font-bold text-[clamp(1.7rem,1.2rem+2.2vw,2.7rem)] leading-tight mt-1">「書く」を、声でラクに。</h1>
            <div className="mt-3"><ViewCounter /></div>
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
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">気に入ったら、リベシティで<br className="md:hidden" />ひと言つぶやいてください。</h2>
            <p className="text-lagoon-100 leading-relaxed mb-6">
              料金も登録もいりません。<br className="sm:hidden" />
              あなたの<strong className="text-white">ひと言</strong>が、次の道具を作る燃料になります。
            </p>

            <ShareButtons />

            <div className="mt-7 pt-6 border-t border-white/15">
              <p className="text-sm text-lagoon-100 mb-3">フォローしてくれたら、新しい道具をリベシティでお知らせします。</p>
              <a href={LIBECITY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-coral to-coral-dark ring-1 ring-white/20 hover:scale-[1.03] transition-all">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87m0 0a4 4 0 1 1 6 0M16 7a3 3 0 1 1-3.5 4.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>遊牧民のプロフィール(リベシティ)</span>
              </a>
            </div>
          </div>
        </div>

        {/* つなぎ */}
        <p className="text-center text-sm font-bold text-lagoon-700 mb-4">⬇ つぶやいてくれたら最高! その下から、無料でダウンロードできます</p>

        {/* ④ ツールを試す（3パターンから選ぶ） */}
        <LiquidGlassCard className="!bg-white/70 p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="eyebrow text-lagoon-600 mb-1">Try it ・ 無料 ・ v1.1.6</div>
            <h3 className="font-display font-bold text-xl md:text-2xl mb-2">お使いのパソコンを選ぶだけ</h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              ノートPCでもデスクトップでも、<strong className="text-ink">同じものをダウンロードすればOK</strong>です。<br className="hidden sm:block" />
              起動したときに<strong className="text-ink">あなたのパソコンの性能を自動で測って</strong>、速さと軽さをひとりでに調整します。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">

            {/* Windows */}
            <div className="flex flex-col rounded-2xl bg-white/80 border border-lagoon-200 p-6 shadow-[0_8px_28px_rgba(7,59,76,.10)]">
              <div className="text-4xl mb-2" aria-hidden="true">🪟</div>
              <div className="eyebrow text-lagoon-600">Windows</div>
              <h4 className="font-display font-bold text-lg mb-2 leading-snug">ノートPC・デスクトップ共通</h4>
              <ul className="text-sm text-ink-soft leading-relaxed space-y-1.5 mb-4 flex-1">
                <li>・Windows 10 / 11</li>
                <li>・メモリ 8GB から動きます</li>
                <li>・グラフィックボードは<strong className="text-ink">なくても動きます</strong>(待ち時間は下の推奨スペック参照)</li>
                <li>・あれば自動で高速モードに</li>
              </ul>
              <a href="https://github.com/yubokumin28/grow-voice-releases/releases/download/v1.1.6/GrowVoice-Windows-v1.1.6.zip"
                className="btn-glint inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-bold text-white bg-lagoon-700 hover:bg-lagoon-800 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3 5.6 10.4 4.5v7.1H3V5.6Zm0 12.8 7.4 1.1v-7H3v5.9Zm8.4 1.2L21 21V12.6h-9.6v7Zm0-15.7v7.2H21V3l-9.6 1.2Z" /></svg>
                Windows 版をダウンロード
              </a>
              <p className="text-[11px] text-ink-mute text-center mt-2">約1.5MB(初回起動時に部品を自動取得)</p>
            </div>

            {/* Mac */}
            <div className="flex flex-col rounded-2xl bg-white/80 border border-ink/15 p-6 shadow-[0_8px_28px_rgba(7,59,76,.10)]">
              <div className="text-4xl mb-2" aria-hidden="true">🍎</div>
              <div className="eyebrow text-ink-soft">Mac</div>
              <h4 className="font-display font-bold text-lg mb-2 leading-snug">MacBook・iMac 共通</h4>
              <ul className="text-sm text-ink-soft leading-relaxed space-y-1.5 mb-4 flex-1">
                <li>・Apple Silicon (M1〜M4) 対応</li>
                <li>・macOS 12 以降(速いエンジンは macOS 15 以降)</li>
                <li>・初回だけ<strong className="text-ink">右クリック → 開く</strong></li>
                <li>・<strong className="text-ink">お試し版(Beta)</strong>です</li>
              </ul>
              <a href="https://github.com/yubokumin28/grow-voice-releases/releases/download/v1.1.6/GrowVoice-macOS-v1.1.6.zip"
                className="btn-glint inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-3 text-sm font-bold text-white bg-ink hover:opacity-90 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8s-1.9-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3ZM14.3 5.7c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.7-1.3Z" /></svg>
                Mac 版をダウンロード
              </a>
              <p className="text-[11px] text-ink-mute text-center mt-2">約1.5MB(初回セットアップ時に部品を自動取得)</p>
            </div>
          </div>

          {/* 共通の補足 */}
          <div className="mt-6 pt-5 border-t border-lagoon-200/70 space-y-2 text-xs text-ink-mute leading-relaxed">
            <p>
              <strong className="text-ink-soft">選ぶ必要はありません:</strong> 起動したときにメモリ・CPU・グラフィックボードの有無を測って、
              4段階(軽さ優先 / 標準 / 精度優先 / GPU高速)から自動で選びます。あとから設定画面で手動に変えることもできます。
            </p>
            <p>
              <strong className="text-ink-soft">共通:</strong> 完全ローカルで月額0円・クラウド送信なし。
              <strong className="text-ink-soft">Python 3.10〜3.12 が必要</strong>です(無料。python.org トップの黄色いボタンは 3.14 系で動かないため、同梱マニュアルにある 3.12 の直リンクから入れてください)。
              解凍して Windows は「② 音声入力を起動」、Mac は「② 音声入力を起動.command」を開くと、初回だけ部品と音声モデルを自動で取得し、以後は常駐します。
            </p>
            <p>
              <strong className="text-ink-soft">やめたくなったら:</strong> 解凍したフォルダをそのまま削除するだけです。
              v1.1.6 からは Windows の「設定 → アプリ」/ Mac のメニューバーから<strong className="text-ink-soft">アンインストール</strong>を選べます。
            </p>
            <p>
              <strong className="text-ink-soft">Mac をお使いの方へ:</strong> 署名を付けていないため、初回起動は
              <strong className="text-ink-soft">右クリック → 開く</strong>で許可してください。マイクとアクセシビリティの許可も求められます。
              詳しくは ZIP 同梱の <strong className="text-ink-soft">① はじめに(マニュアル).html</strong> をご覧ください。
            </p>
          </div>
        </LiquidGlassCard>

        {/* ④' ソース同梱 = AI に改良を頼める */}
        <LiquidGlassCard className="!bg-white/70 p-6 md:p-8 mt-6">
          <div className="eyebrow text-lagoon-600 mb-1">Open source ・ 中身が読める</div>
          <h3 className="font-display font-bold text-xl md:text-2xl mb-3">プログラムをそのまま同梱。AI に「ここを直して」と頼めます。</h3>
          <p className="text-sm text-ink-soft leading-relaxed mb-4">
            ZIP の中に Python のソースコードがそのまま入っています。固めたアプリではないので、
            <strong className="text-ink">Claude Code や Codex にフォルダを開かせて、下の文を貼るだけ</strong>で、
            自分のパソコンに合わせた調整や、好みの改良をお願いできます。プログラムが読めなくても大丈夫です。
          </p>
          <PromptCopyBlocks />
          <p className="text-xs text-ink-mute leading-relaxed mt-4">
            使い方: ZIP を解凍したフォルダで Claude Code(または Codex)を開き、「コピー」を押した文をそのまま貼って Enter。
            改良したものを配り直すのも自由です(Moonshine エンジン部分は同梱の NOTICE_moonshine.txt の条件に従ってください)。
          </p>
        </LiquidGlassCard>

        {/* ⑤ 推奨パソコンスペック(正直に書く) */}
        <LiquidGlassCard className="!bg-white/70 p-6 md:p-8 mt-6">
          <div className="text-center mb-5">
            <div className="eyebrow text-lagoon-600 mb-1">Spec ・ 推奨パソコンスペック</div>
            <h3 className="font-display font-bold text-xl md:text-2xl mb-2">正直に書きます: 速さはグラフィックボードで決まります</h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              どのパソコンでも動きますが、<strong className="text-ink">「話し終えてから文字が出るまでの待ち時間」</strong>が大きく変わります。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-xs text-ink-mute border-b border-lagoon-200/70">
                  <th className="py-2 pr-3 font-bold">パソコン</th>
                  <th className="py-2 pr-3 font-bold">待ち時間</th>
                  <th className="py-2 font-bold">精度</th>
                </tr>
              </thead>
              <tbody className="text-ink-soft">
                <tr className="border-b border-lagoon-200/50 bg-lagoon-50/60">
                  <td className="py-3 pr-3 align-top">
                    <div className="font-bold text-ink">◎ おすすめ: NVIDIA グラフィックボード搭載 Windows</div>
                    <div className="text-xs text-ink-mute">GeForce GTX 1650 以上(VRAM 4GB〜)。ゲーミングノートやクリエイター向けノートも含む</div>
                  </td>
                  <td className="py-3 pr-3 align-top font-bold text-lagoon-700">約 0.3 秒</td>
                  <td className="py-3 align-top">最高(large-v3-turbo)</td>
                </tr>
                <tr className="border-b border-lagoon-200/50">
                  <td className="py-3 pr-3 align-top">
                    <div className="font-bold text-ink">○ Apple Silicon Mac(M1〜M4)</div>
                    <div className="text-xs text-ink-mute">お試し版(Beta)。速度・精度は検証中です</div>
                  </td>
                  <td className="py-3 pr-3 align-top">検証中</td>
                  <td className="py-3 align-top">検証中</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 align-top">
                    <div className="font-bold text-ink">△ グラフィックボードなしの Windows</div>
                    <div className="text-xs text-ink-mute">メモリ 8GB 以上。一般的な事務用・薄型ノートはここ</div>
                  </td>
                  <td className="py-3 pr-3 align-top">
                    <span className="font-bold text-lagoon-700">約 0.5 秒</span>
                    <span className="block text-xs text-ink-mute">v1.1.6 から(v1.1.3 以前は約 1〜3 秒)</span>
                  </td>
                  <td className="py-3 align-top">高め(Moonshine 日本語)<span className="block text-xs text-ink-mute">v1.1.3 以前は標準〜やや低め</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 pt-5 border-t border-lagoon-200/70 space-y-2 text-xs text-ink-mute leading-relaxed">
            <p>
              <strong className="text-ink-soft">なぜグラフィックボードなしだと待つのか:</strong>
              中の音声認識エンジン(Whisper)は、<strong className="text-ink-soft">どんなに短い発話でも音声を必ず 30 秒の枠に引き伸ばして処理する</strong>構造です。
              グラフィックボードならこの 1 回分が一瞬で終わりますが、CPU だと 1 回ごとに固定の時間がかかり、
              「ひと言だけ話しても 2 秒待つ」ということが起きます。話す長さを短くしても縮まりません。
            </p>
            <p>
              <strong className="text-ink-soft">実測(2019 年の省電力ノート i7-10710U・グラフィックボード未使用):</strong>
              標準モード(small)で 1.5 秒の発話 → 2.7 秒待ち、6.7 秒の発話 → 3.0 秒待ち。軽さ優先(base)なら約 1 秒待ちですが精度が落ちます。
              新しめの CPU(Core Ultra / Ryzen 7 など)ならこの半分程度が目安です。
            </p>
            <p>
              <strong className="text-ink-soft">v1.1.6 で解決しました:</strong> グラフィックボードなしのパソコンでは、
              30 秒枠に引き伸ばさず<strong className="text-ink-soft">話している間に認識を進める新エンジン(Moonshine 日本語)</strong>を自動で使います。
              同じ上のダウンロードで、パソコンを見て自動で切り替わるので、別のボタンは要りません。
              実測(同じ i7-10710U ノート・グラフィックボード未使用): キーを離してから文字が出るまで <strong className="text-ink-soft">0.4〜0.7 秒</strong>、
              例文 10 文の読み上げで文字誤り率 1.0%。Powered by Moonshine AI。
            </p>
          </div>
        </LiquidGlassCard>

        <p className="text-center text-xs text-ink-mute mt-10">© 2026 Yubokumin Lab ・ 建設 × AI自動化を、ひとりで。海の向こうから。</p>
      </div>
    </main>
  );
}
