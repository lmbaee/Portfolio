import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";

/**
 * Slow floating embers using tsparticles.
 * Disabled on small screens for perf (can be toggled via prop).
 */
export default function AnimatedBackground({ enabled = true }) {
  if (!enabled) return null;

  const init = async (engine) => {
    await loadFull(engine);
  };

  const options = {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: "transparent" },
    particles: {
      number: { value: 60, density: { enable: true, area: 800 } },
      color: { value: ["#ff6a00", "#ffa552", "#ffdca8"] },
      opacity: { value: 0.35, random: true, animation: { enable: true, speed: 0.4 } },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: 0.3,
        direction: "top",
        random: true,
        straight: false,
        outModes: { default: "out" }
      },
      shape: { type: "circle" },
      blur: { enable: true, value: 2 }
    },
    detectRetina: true
  };

  return <Particles id="embers" init={init} options={options} />;
}
