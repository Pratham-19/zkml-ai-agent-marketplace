"use client";

import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Image } from "@react-three/drei";
import { RigidBody, BallCollider } from "@react-three/rapier";
import { easing } from "maath";

interface SphereProps {
  image?: string;
  scale?: number;
  text?: string;
  color?: string;
}

export function Sphere({
  image,
  scale = 1,
  text,
  vec = new THREE.Vector3(),
  ...props
}: SphereProps) {
  const api = useRef<any>();
  const [initialPos] = useState([
    THREE.MathUtils.randFloatSpread(10),
    THREE.MathUtils.randFloatSpread(10),
    0,
  ]);
  const [position] = useState(new THREE.Vector3());
  const [dragging, drag] = useState(false);

  useFrame((state, delta) => {
    if (!api.current) return;

    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .negate()
        .multiplyScalar(scale * scale),
    );

    easing.damp3(
      position,
      [
        (state.pointer.x * state.viewport.width) / 2 -
          (dragging ? dragging.x : 0),
        (state.pointer.y * state.viewport.height) / 2 -
          (dragging ? dragging.y : 0),
        0,
      ],
      0.2,
      delta,
    );

    api.current.setNextKinematicTranslation(position);
  });

  const handlePointerDown = (e: THREE.Event) => {
    e.target.setPointerCapture(e.pointerId);
    drag(new THREE.Vector3().copy(e.point).sub(api.current.translation()));
  };

  const handlePointerUp = (e: THREE.Event) => {
    e.target.releasePointerCapture(e.pointerId);
    drag(false);
  };

  return (
    <RigidBody
      ref={api}
      type={dragging ? "kinematicPosition" : "dynamic"}
      enabledRotations={[false, false, true]}
      enabledTranslations={[true, true, false]}
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={initialPos}
      scale={scale}
      colliders={false}
    >
      <BallCollider args={[1.1]} />
      <Float speed={2}>
        <mesh onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial {...props} />
          {text && (
            <Text
              font="/Inter-Regular.woff"
              letterSpacing={-0.05}
              position={[0, 0, 0.01]}
              fontSize={0.425}
              material-toneMapped={false}
            >
              {text}
            </Text>
          )}
        </mesh>
        <mesh scale={0.95} position={[0, 0, 0.01]}>
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial color={dragging ? "orange" : "black"} />
        </mesh>
        {image && (
          <Image
            position={[0, 0.45, 0.01]}
            scale={0.5}
            transparent
            toneMapped={false}
            url={image}
          />
        )}
      </Float>
    </RigidBody>
  );
}
