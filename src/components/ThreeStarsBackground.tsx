import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions, speeds] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
      s[i] = Math.random() * 0.1 + 0.05; // speed
    }
    return [p, s];
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const positionsAttr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      positionsAttr.array[i * 3] -= speeds[i] * delta * 20; // move left
      if (positionsAttr.array[i * 3] < -15) {
        positionsAttr.array[i * 3] = 15; // reset to right
        positionsAttr.array[i * 3 + 1] = (Math.random() - 0.5) * 15; // random y
        positionsAttr.array[i * 3 + 2] = (Math.random() - 0.5) * 15; // random z
      }
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export function ThreeStarsBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#050505"]} />
        <Starfield />
      </Canvas>
    </div>
  );
}
