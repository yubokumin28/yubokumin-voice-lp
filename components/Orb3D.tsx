"use client";
import { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/** 音声を象徴するグラス球。外側groupはScrollSceneがGSAPで動かす。 */
const Orb3D = forwardRef<THREE.Group, { spinning?: boolean }>(({ spinning = true }, ref) => {
  const mid = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const m = mid.current;
    if (!m) return;
    m.position.y = Math.sin(t * 1.2) * 0.08;
    m.rotation.x = Math.sin(t * 0.4) * 0.06;
    if (spinning) m.rotation.y += 0.004;
  });
  return (
    <group ref={ref as any}>
      <group ref={mid}>
        <PresentationControls global snap rotation={[0, 0.2, 0]} polar={[-0.35, 0.35]} azimuth={[-0.7, 0.7]}>
          <mesh castShadow>
            <sphereGeometry args={[1, 96, 96]} />
            <MeshDistortMaterial
              color="#28bdb8" emissive="#0b626e" emissiveIntensity={0.35}
              roughness={0.12} metalness={0.25} distort={0.3} speed={1.7}
            />
          </mesh>
          <mesh scale={0.62}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#ffd98a" transparent opacity={0.22} />
          </mesh>
        </PresentationControls>
      </group>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.32} blur={2.6} far={3.2} color="#073b4c" />
    </group>
  );
});
Orb3D.displayName = "Orb3D";
export default Orb3D;
