"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

const ScrollScene = dynamic(() => import("@/components/ScrollScene"), { ssr: false });

export default function Home() {
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
            <span>遊牧民ラボ<span className="block text-[10px] font-latin tracking-[.18em] text-lagoon-600">VOICE INPUT</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink">
            <a href="#benefits" className="hover:text-lagoon-600">特長</a>
            <a href="#how" className="hover:text-lagoon-600">使い方</a>
            <a href="#testi" className="hover:text-lagoon-600">声</a>
          </nav>
          <GlassButton href="#cta" primary className="!px-5 !py-2 text-sm">無料で使う</GlassButton>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="hero" className="relative min-h-[100svh] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: "url(img/hero-bg.png)" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(95deg, rgba(7,59,76,.72) 0%, rgba(7,59,76,.42) 38%, rgba(7,59,76,.05) 62%, transparent 78%), linear-gradient(0deg, rgba(7,59,76,.5), transparent 35%)" }} />
        <div className="mx-auto w-[min(100%-2rem,1200px)] pt-[68px]">
          <span className="eyebrow text-lagoon-100">Voice Input Tool</span>
          <h1 className="display-1 text-white mt-3 mb-5 text-[clamp(2.6rem,1.6rem+5vw,5.6rem)] max-w-[15ch]">
            声で、整って、<span className="bg-gradient-to-br from-sun via-[#ff9b76] to-coral bg-clip-text text-transparent">そのまま</span>入る。
          </h1>
          <p className="text-lagoon-100 text-[clamp(1rem,.9rem+.5vw,1.35rem)] leading-relaxed max-w-[46ch]">
            ローカルLLM搭載。ボタンを押して話すだけで、整った文章がカーソル位置へ流れ込む。<br />使うほどあなたの言葉づかいを学習して、変換がどんどん正確に育つ。<strong className="text-white">完全ローカルだから月額もトークン消費もゼロ。</strong>
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <GlassButton href="#cta" primary className="text-lg !px-8 !py-4">
              無料で使う
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </GlassButton>
            <GlassButton href="#how" className="text-lg !px-8 !py-4 !text-white !bg-white/15 !border-white/35">仕組みを見る</GlassButton>
          </div>
          <div className="flex gap-x-10 gap-y-6 mt-12 flex-wrap items-end">
            {[["¥0", "月額・トークン0"], ["100%", "ローカル動作"], ["∞", "使うほど成長"]].map(([n, l]) => (
              <div key={l}><div className="font-latin font-extrabold text-sun leading-none text-[clamp(3.2rem,2rem+5vw,6.5rem)]">{n}</div><div className="text-sm text-lagoon-200 tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Benefits ===== */}
      <section id="benefits" className="relative py-[clamp(5rem,3rem+8vw,10rem)]">
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
      <section id="how" className="relative py-[clamp(5rem,3rem+8vw,10rem)] bg-gradient-to-b from-sand-50 to-lagoon-50">
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

      {/* ===== Screenshot ===== */}
      <section className="relative py-[clamp(5rem,3rem+8vw,10rem)]">
        <div className="mx-auto w-[min(100%-2rem,1000px)] text-center">
          <span className="eyebrow text-lagoon-600 reveal">Screenshot</span>
          <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2 mb-8 reveal">これが、実際の画面。</h2>
          <LiquidGlassCard className="reveal max-w-[920px] mx-auto !bg-white/70">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#eef4f3] border-b border-sand-200">
              <span className="w-3 h-3 rounded-full bg-coral" /><span className="w-3 h-3 rounded-full bg-sun" /><span className="w-3 h-3 rounded-full bg-[#2f9e7d]" />
              <em className="ml-3 not-italic text-xs text-ink-mute font-latin">voice-input — manual</em>
            </div>
            <img src="img/voice-shot.png" alt="音声入力ツールの画面" className="w-full block" />
          </LiquidGlassCard>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section id="testi" className="relative py-[clamp(5rem,3rem+8vw,10rem)] bg-gradient-to-b from-lagoon-50 to-sand-50">
        <div className="mx-auto w-[min(100%-2rem,1100px)]">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow text-lagoon-600">Voices</span>
            <h2 className="display-1 text-[clamp(1.9rem,1.4rem+2.4vw,3.2rem)] mt-2">使った人の、静かな実感。</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["長文の下書きが、しゃべるだけで終わる。タイピングに戻れなくなった。", "現場監督 / 建設", "K.T"],
              ["固有名詞の誤変換が自分仕様に直っていく。使うほど賢くなる感じ。", "個人事業主 / 士業", "M.N"],
              ["音声が外に出ないのが一番の安心。社内資料の下書きにも使える。", "総務 / 中小企業", "H.A"],
            ].map(([q, role, name]) => (
              <LiquidGlassCard key={name} className="reveal p-7 flex flex-col">
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
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className="relative min-h-[92svh] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-lagoon-800 to-lagoon-900 text-white">
        <span className="eyebrow text-lagoon-200 reveal">Get it</span>
        <h2 className="display-1 text-white text-[clamp(2.2rem,1.4rem+4vw,4.6rem)] mt-3 mb-8 reveal max-w-[16ch]">今日から、<br />タイピングを減らす。</h2>
        <div className="reveal mt-2">
          <LiquidGlassCard className="!bg-white/10 !border-white/25 px-8 py-5 inline-flex items-center gap-6">
            <span className="font-latin font-extrabold text-4xl text-sun">¥0</span>
            <GlassButton primary href="#" className="text-lg">
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
            <img src="img/seal-logo.jpg" alt="" className="w-10 h-10 rounded-full object-cover border border-white/30" />遊牧民ラボ
          </div>
          <p className="text-sm">建設×AI自動化を、ひとりで。海の向こうから。</p>
          <span className="text-xs text-lagoon-200">© 2026 Yubokumin Lab</span>
        </div>
      </footer>
    </main>
  );
}
