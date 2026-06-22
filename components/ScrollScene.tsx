"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Orb3D from "./Orb3D";

/** ピン留めした1つの3Dオーブが、各セクションをスクロールで移動する（動画と同じ手法） */
export default function ScrollScene() {
  const groupRef = useRef<THREE.Group>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const narrow = window.matchMedia("(max-width:880px)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis: any = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t: number) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const wrap = wrapRef.current;
    const triggers: ScrollTrigger[] = [];

    const buildChoreo = (g: THREE.Group) => {
      if (!wrap) return;
      // 世界座標でのポーズ（カメラ z=4.6, fov=42）
      const POSE = {
        hero:     { x: 2.2,  y: -0.15, s: 0.82, ry: -Math.PI * 0.08,  rx: 0 },
        benefits: { x: -2.0, y: 0.2,   s: 0.72, ry: Math.PI * 0.5,   rx: 0 },
        how:      { x: 2.15, y: 0.5,   s: 0.6,  ry: -Math.PI * 0.42, rx: 0.28 },
        cta:      { x: 2.55, y: 0.1,   s: 0.62, ry: -Math.PI * 0.5,  rx: 0 },
      };
      gsap.set(g.position, { x: POSE.hero.x, y: POSE.hero.y });
      gsap.set(g.scale, { x: POSE.hero.s, y: POSE.hero.s, z: POSE.hero.s });
      gsap.set(g.rotation, { y: POSE.hero.ry, x: POSE.hero.rx });

      const animateTo = (p: { x: number; y: number; s: number; ry: number; rx: number }) => {
        gsap.to(g.position, { x: p.x, y: p.y, duration: 0.8, ease: "power3.inOut", overwrite: true });
        gsap.to(g.scale, { x: p.s, y: p.s, z: p.s, duration: 0.8, ease: "power3.inOut", overwrite: true });
        gsap.to(g.rotation, { y: p.ry, x: p.rx, duration: 0.8, ease: "power3.inOut", overwrite: true });
      };
      const fade = (to: number) => gsap.to(wrap, { autoAlpha: to, duration: 0.5, overwrite: true });

      if (reduce || narrow) { if (narrow) wrap.style.display = "none"; return; }

      const mk = (sel: string, pose?: typeof POSE.hero, opts: any = {}) => {
        const el = document.querySelector(sel);
        if (!el) return;
        triggers.push(ScrollTrigger.create({
          trigger: el, start: "top 55%", end: "bottom 45%",
          onEnter: () => { pose && animateTo(pose); opts.onEnter?.(); },
          onEnterBack: () => { pose && animateTo(pose); opts.onEnterBack?.(); },
        }));
      };
      triggers.push(ScrollTrigger.create({ trigger: "#hero", start: "top top", end: "bottom 60%",
        onEnterBack: () => { animateTo(POSE.hero); fade(1); } }));
      mk("#benefits", POSE.benefits, { onEnter: () => fade(1) });
      mk("#how", POSE.how);
      mk("#testi", undefined, { onEnter: () => fade(0), onEnterBack: () => fade(1) });
      mk("#cta", POSE.cta, { onEnter: () => { fade(1); setSpinning(false); }, onEnterBack: () => setSpinning(true) });
      mk("#footer", undefined, { onEnter: () => fade(0), onEnterBack: () => fade(1) });

      const updateInteractive = () => {
        const inZone = ["#hero", "#cta"].some((s) => {
          const el = document.querySelector(s); if (!el) return false;
          const r = el.getBoundingClientRect();
          return r.top < innerHeight / 2 && r.bottom > innerHeight / 2;
        });
        wrap.classList.toggle("interactive", inZone);
      };
      updateInteractive();
      if (lenis) lenis.on("scroll", updateInteractive);
      ScrollTrigger.refresh();
    };

    // R3Fの<group>はCanvas内で遅れてマウントされるので、refが付くまで待つ
    let iv: any = setInterval(() => {
      if (groupRef.current) { clearInterval(iv); iv = null; buildChoreo(groupRef.current); }
    }, 60);
    const to = setTimeout(() => iv && clearInterval(iv), 5000);

    return () => {
      if (iv) clearInterval(iv); clearTimeout(to);
      triggers.forEach((t) => t.kill());
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapRef} className="orb-canvas" id="orbCanvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <pointLight position={[-3, 2, 3]} intensity={0.9} color="#ffd98a" />
        <pointLight position={[2, -2, 2]} intensity={0.5} color="#4fd3cc" />
        <Suspense fallback={null}>
          <group ref={groupRef}>
            <Orb3D spinning={spinning} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
