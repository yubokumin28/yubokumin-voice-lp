"use client";
import { forwardRef, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Vercel ではルート配信なので接頭辞は不要（public 直下がそのまま / に配信される）
const SEAL_URL = "/models/seal.glb";

// アザラシの基本の向き（正面 = カメラ側）。モデルは元々+X(右)向きなので -π/2 で正面に向ける
const FACE_Y = -Math.PI * 0.5;

/** 白いゴマフアザラシ。外側groupはScrollSceneがGSAPで動かす。 */
const Orb3D = forwardRef<THREE.Group, { spinning?: boolean }>(({ spinning = true }, ref) => {
  const mid = useRef<THREE.Group>(null);
  const { scene } = useGLTF(SEAL_URL);

  // 単一インスタンスとして複製（再レンダリングで壊さない）
  const seal = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.frustumCulled = false;
        if (o.material) {
          o.material.envMapIntensity = 0.7;
          o.material.needsUpdate = true;
        }
      }
    });
    return s;
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const m = mid.current;
    if (!m) return;
    m.position.y = Math.sin(t * 1.2) * 0.06;          // ぷかぷか浮遊
    m.rotation.x = Math.sin(t * 0.4) * 0.04;          // 微かに上下を向く
    m.rotation.y = Math.sin(t * 0.5) * 0.16;          // 正面付近で左右にゆっくり首振り（回転しない）
  });

  return (
    <group ref={ref as any}>
      <group ref={mid}>
        {/* 約1単位幅のモデルをオーブ相当の見た目サイズに拡大。常に正面固定 */}
        <group scale={2.6} rotation={[0, FACE_Y, 0]} position={[0, -0.12, 0]}>
          <primitive object={seal} />
        </group>
      </group>
      <ContactShadows position={[0, -0.95, 0]} opacity={0.3} blur={2.6} far={3.2} color="#073b4c" />
    </group>
  );
});
Orb3D.displayName = "Orb3D";
export default Orb3D;

useGLTF.preload(SEAL_URL);
