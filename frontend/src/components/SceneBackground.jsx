import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function SceneContent({ animate }) {
  const gltf = useLoader(GLTFLoader, "/assets/scene.glb");
  const { camera, scene } = useThree();

  const startPos = useRef(new THREE.Vector3(0, 2, 5));
  const startFov = useRef(50);

  // We no longer need axis rotation for panning
  const sceneCenter = useRef(new THREE.Vector3(0, 0, 0));

  const scrollTarget = useRef(0);   // target yaw angle
  const scrollCurrent = useRef(0);  // smoothed yaw angle

  useEffect(() => {
    if (gltf?.cameras && gltf.cameras[0]) {
      const c = gltf.cameras[0];
      startPos.current.copy(c.position);
      if (c.isPerspectiveCamera && typeof c.fov === "number") {
        startFov.current = c.fov;
        camera.fov = c.fov;
        camera.updateProjectionMatrix();
      }
      camera.position.copy(startPos.current);
    }

    if (gltf?.scene) {
      scene.add(gltf.scene);
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      sceneCenter.current.copy(center);
    }

    return () => {
      if (gltf?.scene) scene.remove(gltf.scene);
    };
  }, [gltf, camera, scene]);

  useFrame((_, delta) => {
    if (!animate) return;

    const denom = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / denom));

    // Map scroll to yaw angle (right-left pan)
    scrollTarget.current = -progress * Math.PI * 2;

    const smoothing = 5;
    scrollCurrent.current +=
      (scrollTarget.current - scrollCurrent.current) *
      Math.min(1, delta * smoothing);

    // Instead of orbiting, lock position and rotate yaw
    camera.position.lerp(startPos.current, 0.1);
    camera.rotation.set(0, scrollCurrent.current, 0);

    if (camera.fov !== startFov.current) {
      camera.fov = startFov.current;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <hemisphereLight intensity={0.7} groundColor="black" />
      <primitive object={camera}>
        <directionalLight position={[0, 0, 2]} intensity={15} />
      </primitive>
    </>
  );
}

export default function SceneBackground() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    setAnimate(!reduced && !small);

    const onResize = () => {
      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setAnimate(!rm && !(window.innerWidth < 768));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1]" aria-hidden>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ position: "fixed", inset: 0 }}
      >
        <color attach="background" args={["#111111"]} />
        <Suspense fallback={null}>
          <SceneContent animate={animate} />
        </Suspense>
      </Canvas>
    </div>
  );
}
