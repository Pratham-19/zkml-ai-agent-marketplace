"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { Sphere } from "./sphere";

interface SceneProps {
  data: Array<{
    image?: string;
    scale?: number;
    text?: string;
    color?: string;
  }>;
}

const Scene = ({ data }: SceneProps) => {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 30 }}>
      <Physics interpolate timeStep={1 / 60} gravity={[0, 0, 0]}>
        <Suspense fallback={null}>
          {data.map((props, i) => (
            <Sphere key={i} {...props} />
          ))}
        </Suspense>
      </Physics>
    </Canvas>
  );
};

export default Scene;
