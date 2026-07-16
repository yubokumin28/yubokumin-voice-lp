"use client";
import { motion } from "framer-motion";

/**
 * 声の波形ビジュアライザ（21st.dev ElevenLabs/waveform 系を参考に framer-motion で実装）。
 * 起動キーを押して「聞いている」状態を、リアルタイム波形で表現する。
 */
const BARS = 56;

// SSR とクライアントで一致する決定的な基準高さ（中央が高い波形 + 疑似ゆらぎ）
const base = Array.from({ length: BARS }, (_, i) => {
  const center = 1 - Math.abs(i - (BARS - 1) / 2) / ((BARS - 1) / 2); // 0..1（中央で1）
  const wobble = (Math.sin(i * 1.7) + Math.sin(i * 0.6) + 2) / 4; // 0..1
  // Math.sinはサーバーとブラウザで最下位桁がズレることがあるため丸めて一致させる(hydration警告対策)
  return Math.round((0.22 + center * 0.5 + wobble * 0.28) * 1000) / 1000; // 0.22..1.0
});

export function VoiceWave() {
  return (
    <div className="w-full">
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-coral/10 border border-coral/30">
        <motion.span
          className="w-2 h-2 rounded-full bg-coral"
          animate={{ opacity: [1, 0.25, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-sm font-bold text-coral-dark">聞いています</span>
      </div>

      <div
        className="flex items-center justify-center gap-[3px] md:gap-[4px] h-[140px] md:h-[180px]"
        aria-hidden="true"
      >
        {base.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] md:w-[5px] rounded-full"
            style={{ background: "linear-gradient(to top, #0d7e87 0%, #28bdb8 45%, #ffc857 100%)" }}
            initial={{ height: `${h * 38}%` }}
            animate={{
              height: [
                `${h * 38}%`,
                `${Math.min(h * 100, 100)}%`,
                `${h * 28}%`,
                `${Math.min(h * 78, 96)}%`,
                `${h * 38}%`,
              ],
            }}
            transition={{
              duration: 1.3 + (i % 6) * 0.14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 9) * 0.07,
            }}
          />
        ))}
      </div>
    </div>
  );
}
