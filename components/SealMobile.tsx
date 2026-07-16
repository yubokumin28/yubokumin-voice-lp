"use client";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Orb3D from "./Orb3D";

/** スマホ用の小さなアザラシ。ヒーロー本文の下に「流し込み」で置くので文字と重ならない。
 *  デスクトップ(881px以上)ではScrollSceneの固定キャンバスが担当するため、WebGLごと作らない。 */
export default function SealMobile() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(window.matchMedia("(max-width:880px)").matches);
  }, []);
  if (!show) return null;

  return (
    <div className="min-[881px]:hidden mt-8 h-48 pointer-events-none select-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 42 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <pointLight position={[-3, 2, 3]} intensity={0.9} color="#ffd98a" />
        <pointLight position={[2, -2, 2]} intensity={0.5} color="#4fd3cc" />
        <Suspense fallback={null}>
          <group scale={0.8} position={[0, 0.05, 0]}>
            <Orb3D />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
