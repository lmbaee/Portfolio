import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from "framer-motion";

function RedHoodModel() {
  const gltf = useLoader(GLTFLoader, "/assets/redhood.glb");
  const modelRef = useRef();

  // continuous rotation using useFrame
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      scale={1.2}
      rotation={[Math.PI / 2, Math.PI, 9.25]} // face forward, no upside-down tilt

    />
  );
}

export default function Hero3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="h-[70vh] w-full bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        <Canvas camera={{ position: [0, 1.6, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <RedHoodModel />
            </Stage>
          </Suspense>
          <OrbitControls
            enableZoom={false}
            autoRotate={!isMobile}
            autoRotateSpeed={1}
            enablePan={false}
            minPolarAngle={Math.PI / 2.5} // restrict downward tilt
            maxPolarAngle={Math.PI / 2}   // restrict upward tilt
          />
        </Canvas>
      </motion.div>
    </section>
  );
}
