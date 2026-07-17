"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { VoiceWave } from "@/components/ui/VoiceWave";

const ScrollScene = dynamic(() => import("@/components/ScrollScene"), { ssr: false });
const SealMobile = dynamic(() => import("@/components/SealMobile"), { ssr: false });

export default function Home() {
  // スクショ拡大表示(ライトボックス)。nullなら閉じている
  const [zoom, setZoom] = useState<{ src: string; cap: string } | null>(null);
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [zoom]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative">
      <ScrollScene />

      {/* ===== Nav ===== */}
      <header className="fixed top-0 inset-x-0 z-50 h-[68px] flex items-center">
        <div className="mx-auto w-[min(100%-2rem,1200px)] flex items-center justify-between rounded-full px-4 py-2 bg-white/55 backdrop-blur-xl border border-white/60 shadow-[0_8px_24px_rgba(7,59,76,.10)] mt-3">
          <a href="#hero" className="flex items-center gap-2 font-display font-bold text-ink">
            <img src="img/seal-logo.jpg" alt="" className="w-9 h-9 rounded-full object-cover border border-white/70" />
            <span>Grow Voice<span className="block text-[10px] font-latin tracking-[.18em] text-lagoon-600">グロウボイス</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink">
            <a href="#benefits" className="hover:text-lagoon-600">特長</a>
            <a href="#how" className="hover:text-lagoon-600">使い方</a>
            <a href="#testi" className="hover:text-lagoon-600">声</a>
          </nav>
          <GlassButton href="/download" primary className="!px-5 !py-2.5 text-sm">無料で使う</GlassButton>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="hero" className="relative min-h-[100svh] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/hero-bg.png)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(95deg, rgba(7,59,76,.72) 0%, rgba(7,59,76,.42) 38%, rgba(7,59,76,.05) 62%, transparent 78%), linear-gradient(0deg, rgba(7,59,76,.5), transparent 35%)" }} />
        <div className="mx-auto w-[min(100%-2rem,1200px)] pt-[68px]">
          <span className="eyebrow text-lagoon-200 block">Voice Input Tool ・ 音声入力ツール</span>
          {/* ツール名を最大表示(ブランド最優先) */}
          <h1 className="font-latin font-extrabold tracking-tight leading-none text-white mt-3 text-[clamp(3rem,1.8rem+7vw,7rem)]">
            Grow <span className="bg-gradient-to-br from-sun via-[#ff9b76] to-coral bg-clip-text text-transparent">Voice</span>
          </h1>
          <span className="text-lagoon-100 tracking-[.14em] mt-2 block text-[clamp(.95rem,.78rem+.45vw,1.2rem)]">グロウ ボイス</span>
          {/* サブタイトル(アザラシの視線の先) */}
          <p id="hero-sub" className="display-1 text-white mt-4 mb-5 text-[clamp(1.55rem,1rem+2.8vw,3.1rem)]">
            <span className="bg-gradient-to-br from-sun via-[#ff9b76] to-coral bg-clip-text text-transparent">成長する</span>音声入力ツール
          </p>
          <p className="text-lagoon-100 text-[clamp(1rem,.9rem+.5vw,1.35rem)] leading-relaxed max-w-[46ch]">
            <strong className="text-white">Grow Voice</strong> は、ローカルLLM搭載の音声入力ツール。ボタンを押して話すだけで、整った文章がカーソル位置へ流れ込む。<br />使うほどあなたの言葉づかいを学習して、変換がどんどん正確に育つ。<strong className="text-white">完全ローカルだから月額もトークン消費もゼロ。</strong>
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <GlassButton href="/download" primary className="text-lg !px-8 !py-4">
              無料で使う
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </GlassButton>
            <GlassButton href="#how" className="text-lg !px-8 !py-4 !text-white !bg-white/15 !border-white/35">仕組みを見る</GlassButton>
          </div>
          {/* クリック前の不安を消す一言 */}
          <p className="mt-3 text-sm text-lagoon-100/90">Windows / Mac 対応 ・ アカウント登録不要 ・ ずっと無料</p>
          <a href="/download" className="peek-badge group mt-6 inline-flex items-center gap-2 rounded-full bg-white/12 border border-white/30 backdrop-blur-md px-4 py-2 text-sm text-lagoon-100 hover:bg-white/20 transition-colors">
            <span className="text-base">👀</span>
            <span>押した先で、声が文章に変わる瞬間を体験</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <div className="flex gap-x-10 gap-y-6 mt-12 flex-wrap items-end">
            {[["¥0", "月額・トークン0"], ["100%", "ローカル動作"], ["∞", "使うほど成長"]].map(([n, l]) => (
              <div key={l}><div className="font-latin font-extrabold text-sun leading-none text-[clamp(1.6rem,1.1rem+2.5vw,3.25rem)]">{n}</div><div className="text-xs text-lagoon-200 tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
          {/* スマホだけ: 文章の下に小さなアザラシ(流し込みなので文字と重ならない) */}
          <SealMobile />
        </div>
      </section>

      {/* ===== Benefits ===== */}
      <section id="benefits" className="relative overflow-hidden py-[clamp(5rem,3rem+8vw,10rem)]">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/bg-ocean.jpg)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(253,251,246,.90) 0%, rgba(238,250,248,.78) 50%, rgba(253,251,246,.92) 100%)" }} />
        <div className="mx-auto w-[min(100%-2rem,1100px)]">
          <div className="max-w-[640px] mb-14 reveal ml-auto text-right">
            <span className="eyebrow text-lagoon-600">Why it is enough</span>
            <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2">なぜ、これだけで<br />十分なのか。</h2>
          </div>
          <div className="md:pl-[36%]">
            {[
              ["01", "話すほど、育つ", "ローカルLLMがあなたの話し方の癖を学習。使えば使うほど認識と変換が正確になり、あなた専用の音声入力に育っていきます。", "学習AI"],
              ["02", "押して話すだけ", "起動ボタンを押しっぱなしにして喋るだけ。整った文章が、いま開いているアプリのカーソル位置にそのまま入っていきます。", "ワンボタン"],
              ["03", "辞書も自分仕様に", "変換させたい固有名詞や独自の言い回しも、話して覚えさせるだけ。完全ローカルで動くので月額もトークン消費もゼロです。", "育つ辞書"],
            ].map(([no, t, d, chip]) => (
              <div key={no} className="reveal grid md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-center py-7 border-t border-sand-300">
                <div className="font-latin font-extrabold text-3xl text-lagoon-300">{no}</div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-1">{t}</h3>
                  <p className="text-ink-soft leading-relaxed max-w-[52ch]">{d}</p>
                </div>
                <LiquidGlassCard className="px-5 py-3 text-lagoon-700 font-bold text-sm whitespace-nowrap">{chip}</LiquidGlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how" className="relative overflow-hidden py-[clamp(5rem,3rem+8vw,10rem)] bg-gradient-to-b from-sand-50 to-lagoon-50">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/bg-shore.jpg)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(250,245,234,.88) 0%, rgba(238,250,248,.80) 55%, rgba(250,245,234,.9) 100%)" }} />
        <div className="mx-auto w-[min(100%-2rem,1100px)]">
          <div className="max-w-[640px] mb-14 reveal">
            <span className="eyebrow text-lagoon-600">How it works</span>
            <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2">押して話す → 整って学ぶ → 入る。<br />たった3ステップ。</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["🎙️", "押して話す", "起動キーを押しっぱなしにして、いつも通り話すだけ。常駐しているのですぐ呼べます。"],
              ["🧠", "整って学ぶ", "PC内のローカルLLMが誤変換やフィラーを除去して整文。同時にあなたの癖や言葉を学習します。"],
              ["📄", "そのまま入る", "整った文章が、いま開いているアプリのカーソル位置にそのまま流れ込みます。"],
            ].map(([ic, t, d], i) => (
              <LiquidGlassCard key={t} className="reveal p-7">
                <div className="text-4xl mb-3">{ic}</div>
                <div className="font-latin font-bold text-lagoon-400 text-sm">STEP {i + 1}</div>
                <h3 className="font-display font-bold text-xl mt-1 mb-2">{t}</h3>
                <p className="text-ink-soft leading-relaxed">{d}</p>
              </LiquidGlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Voice waveform ===== */}
      <section id="live" className="relative py-[clamp(5rem,3rem+8vw,10rem)] overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/bg-ocean.jpg)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(253,251,246,.92) 0%, rgba(238,250,248,.80) 50%, rgba(253,251,246,.93) 100%)" }} />
        <div className="mx-auto w-[min(100%-2rem,900px)] text-center">
          <span className="eyebrow text-lagoon-600 reveal">Live</span>
          <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2 mb-3 reveal">押している間、<br />耳をすませている。</h2>
          <p className="text-ink-soft leading-relaxed max-w-[44ch] mx-auto mb-10 reveal">
            起動キーを押すと、ローカルLLMがあなたの声をリアルタイムに受け止め、整った文章へ変えていきます。
          </p>
          <div className="reveal">
            <LiquidGlassCard className="!bg-white/60 px-6 py-10 md:px-12 md:py-12">
              <VoiceWave />
            </LiquidGlassCard>
          </div>
        </div>
      </section>

      {/* ===== Screenshot ===== */}
      <section className="relative py-[clamp(5rem,3rem+8vw,10rem)]">
        <div className="mx-auto w-[min(100%-2rem,1180px)] text-center">
          <span className="eyebrow text-lagoon-600 reveal">Screenshot</span>
          <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2 mb-10 reveal">これが、実際の画面。</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["img/tool-dict.png", "辞書 ・ 自動学習"],
              ["img/tool-record.png", "録音キー"],
              ["img/tool-visual.png", "見える化"],
            ].map(([src, cap]) => (
              <LiquidGlassCard key={cap} className="reveal !bg-white/70 !p-3">
                <button type="button" onClick={() => setZoom({ src, cap })} aria-label={`${cap} を拡大表示`}
                  className="block w-full cursor-zoom-in group relative">
                  <img src={src} alt={cap} className="w-full block rounded-lg shadow-[0_10px_30px_rgba(7,59,76,.14)] transition-transform duration-300 group-hover:scale-[1.02]" />
                  <span className="absolute right-2 bottom-2 w-8 h-8 grid place-items-center rounded-full bg-lagoon-900/70 text-white text-base opacity-80 group-hover:opacity-100 transition-opacity">🔍</span>
                </button>
                <div className="mt-3 text-sm font-bold text-lagoon-700">{cap}</div>
              </LiquidGlassCard>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-mute reveal">画像をクリック / タップすると拡大できます</p>
        </div>
      </section>

      {/* ===== Learning depth (育つ辞書のしくみ) ===== */}
      <section id="learn" className="relative overflow-hidden py-[clamp(5rem,3rem+8vw,10rem)]">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/bg-shore.jpg)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(253,251,246,.91) 0%, rgba(238,250,248,.80) 50%, rgba(253,251,246,.92) 100%)" }} />
        <div className="mx-auto w-[min(100%-2rem,1100px)] relative">
          <img src="img/seal-logo.jpg" alt="" className="block absolute right-0 -top-8 w-14 h-14 sm:w-16 sm:h-16 lg:-top-2 lg:w-20 lg:h-20 rounded-full object-cover border border-white/70 shadow-[0_10px_30px_rgba(7,59,76,.18)] animate-floaty" />
          <div className="max-w-[680px] mb-14 reveal">
            <span className="eyebrow text-lagoon-600">Grows with you</span>
            <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2">使うほど、あなた専用に<br />育つ辞書のしくみ。</h2>
            <p className="text-ink-soft leading-relaxed max-w-[52ch] mt-4">話した履歴をローカルLLMが読み直し、誤変換を自動で辞書に蓄積。再起動しても消えず、間違いは自分で正していきます。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["🧠", "育つ辞書（自動学習）", "「本当はこう言いたかった」をローカルLLMが裏で読み取り、誤変換を自動で辞書に登録。話すほど、あなたの言葉に変換が近づきます。"],
              ["💾", "消えずに、蓄積される", "覚えた言い換えはPC内に保存。アプリやPCを再起動しても消えず、使うほど積み上がる「あなた専用辞書」に育ちます。"],
              ["🔁", "間違いは自動で修正", "1回で覚えた仮登録は「確認中」として様子見。後で誤りと分かれば自動で取り消し、正しければ確定。間違いを引きずりません。"],
            ].map(([ic, t, d], i) => (
              <LiquidGlassCard key={t} className="reveal p-7">
                <div className="text-4xl mb-3 inline-block animate-floaty" style={{ animationDelay: `${i * 0.9}s` }}>{ic}</div>
                <h3 className="font-display font-bold text-xl mt-1 mb-2">{t}</h3>
                <p className="text-ink-soft leading-relaxed">{d}</p>
              </LiquidGlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section id="testi" className="relative overflow-hidden py-[clamp(5rem,3rem+8vw,10rem)] bg-gradient-to-b from-lagoon-50 to-sand-50">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/bg-sand.jpg)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(238,250,248,.82) 0%, rgba(250,245,234,.80) 50%, rgba(253,251,246,.88) 100%)" }} />
        <div className="mx-auto w-[min(100%-2rem,1100px)]">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow text-lagoon-600">Voices</span>
            <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2">使った人の、静かな実感。</h2>
          </div>
        </div>

        {/* 左右に流れるレビュー(上段=左へ / 下段=右へ)。ホバーで一時停止、reduced-motionでは静止 */}
        <div className="space-y-5">
          {[
            [
              ["長文の下書きが、しゃべるだけで終わる。タイピングに戻れなくなった。", "現場監督 / 建設", "K.T"],
              ["固有名詞の誤変換が自分仕様に直っていく。使うほど賢くなる感じ。", "個人事業主 / 士業", "M.N"],
              ["音声が外に出ないのが一番の安心。社内資料の下書きにも使える。", "総務 / 中小企業", "H.A"],
            ],
            [
              ["現場から戻る車を停めて日報を吹き込むだけ。事務所に着いたら下書きができてる。", "土木 / 一人親方", "S.Y"],
              ["タイピングが苦手でも、見積メモと連絡文が口だけで終わるのがありがたい。", "工務店 / 経営", "T.K"],
              ["「えー」「あのー」が勝手に消えるから、話したまま資料に貼れる。", "ライター / 個人", "R.S"],
            ],
          ].map((row, ri) => (
            <div key={ri} className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
              <div
                className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
                style={{ animationDuration: ri === 0 ? "48s" : "56s", animationDirection: ri === 0 ? "normal" : "reverse" }}
              >
                {[...row, ...row, ...row, ...row].map(([q, role, name], i) => (
                  <LiquidGlassCard key={i} className="w-[min(82vw,360px)] shrink-0 mr-5 p-6 flex flex-col">
                    <div className="text-3xl text-lagoon-300 font-display leading-none mb-2">“</div>
                    <p className="text-ink-soft leading-relaxed flex-1 italic">{q}</p>
                    <div className="mt-5 pt-4 border-t border-sand-200">
                      <div className="font-display font-bold text-ink">{name}</div>
                      <div className="text-xs tracking-[.18em] text-ink-mute font-latin uppercase">{role}</div>
                    </div>
                  </LiquidGlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto w-[min(100%-2rem,1100px)] text-center mt-10">
          <a href="/monitor" className="inline-block py-2 text-sm font-bold text-lagoon-700 hover:text-lagoon-500 transition-colors">
            モニターのみなさまの声を見る →
          </a>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className="relative min-h-[92svh] flex flex-col items-center justify-center text-center overflow-hidden bg-lagoon-900 text-white">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/cta-underwater.jpg)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(135% 100% at 50% 6%, rgba(7,59,76,.26) 0%, rgba(7,59,76,.64) 46%, rgba(6,36,68,.92) 100%)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(6,36,68,.55) 100%)" }} />
        <span className="eyebrow text-lagoon-200 reveal">Get it</span>
        <h2 className="display-1 text-white text-[clamp(2.2rem,1.4rem+4vw,4.6rem)] mt-3 mb-8 reveal max-w-[16ch] drop-shadow-[0_3px_22px_rgba(4,24,44,.5)]">今日から、<br />タイピングを減らす。</h2>
        <div className="reveal mt-2">
          <LiquidGlassCard className="!bg-white/10 !border-white/25 px-8 py-5 inline-flex items-center gap-6">
            <span className="font-latin font-extrabold text-4xl text-sun">¥0</span>
            <GlassButton primary href="/download" className="text-lg">
              無料で使う
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </GlassButton>
          </LiquidGlassCard>
        </div>
        <p className="text-lagoon-200 text-sm mt-6 reveal">完全ローカル ・ 月額0 ・ トークン消費なし ・ 使うほど育つ</p>
      </section>

      {/* ===== Footer ===== */}
      <footer id="footer" className="bg-lagoon-900 text-lagoon-100 py-14">
        <div className="mx-auto w-[min(100%-2rem,1100px)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-display font-bold text-white text-lg">
            <img src="img/seal-logo.jpg" alt="" className="w-10 h-10 rounded-full object-cover border border-white/30" />Grow Voice
          </div>
          <p className="text-sm">建設×AI自動化を、ひとりで。海の向こうから。</p>
          <a href="/download" className="text-sm font-bold text-sun hover:text-white transition-colors inline-block py-2">作っている人を見る →</a>
          <span className="text-xs text-lagoon-200">© 2026 Yubokumin Lab</span>
        </div>
      </footer>

      {/* ===== スクショ拡大モーダル(×か背景クリックで閉じる) ===== */}
      {zoom && (
        <div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8 bg-[rgba(6,36,68,.78)] backdrop-blur-md"
          role="dialog" aria-modal="true" aria-label={zoom.cap} onClick={() => setZoom(null)}>
          <div className="relative max-w-[min(94vw,1000px)]" onClick={(e) => e.stopPropagation()}>
            <img src={zoom.src} alt={zoom.cap} className="block max-h-[82svh] w-auto max-w-full mx-auto rounded-xl shadow-[0_30px_80px_rgba(0,0,0,.45)] bg-white" />
            <div className="mt-3 text-center text-white font-bold">{zoom.cap}</div>
            <button type="button" onClick={() => setZoom(null)} aria-label="閉じる"
              className="absolute -top-3 -right-3 w-10 h-10 grid place-items-center rounded-full bg-white text-lagoon-900 text-xl font-bold shadow-lg hover:scale-110 transition-transform">×</button>
          </div>
        </div>
      )}
    </main>
  );
}
