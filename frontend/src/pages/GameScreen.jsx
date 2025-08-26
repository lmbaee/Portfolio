import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import StartMenuButton from "../components/StartMenuButton.jsx";

const LINKS = {
  LINKEDIN_URL: "https://www.linkedin.com/in/jasonecardenas",
  GITHUB_URL: "https://github.com/lmbaee"
};

export default function GameScreen() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [isTransitioning, setTransitioning] = useState(false);
  const items = ["Continue", "LinkedIn", "GitHub", "Contact"];
  const refs = useRef(items.map(() => React.createRef()));

  // Start muted so autoplay always works
  const [audioOn, setAudioOn] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handle = (e) => {
      if (isTransitioning) return;
      if (e.key === "ArrowDown") {
        setIndex((i) => (i + 1) % items.length);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setIndex((i) => (i - 1 + items.length) % items.length);
        e.preventDefault();
      } else if (e.key === "Enter") {
        activate(items[index]);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [index, isTransitioning]);

  useEffect(() => {
    refs.current[index]?.current?.focus();
  }, [index]);

  const activate = (label) => {
    if (label === "Continue") {
      setTransitioning(true);
      setTimeout(() => navigate("/portfolio"), 900);
    } else if (label === "LinkedIn") {
      window.open(LINKS.LINKEDIN_URL, "_blank", "noopener,noreferrer");
    } else if (label === "GitHub") {
      window.open(LINKS.GITHUB_URL, "_blank", "noopener,noreferrer");
    } else if (label === "Contact") {
      navigate("/contact");
    }
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const particlesEnabled = !reduced && window.innerWidth >= 768;

  return (
    <div
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black text-neutral-100 grain-overlay vignette"
      aria-label="Start screen"
    >
      {/* Background video with fallback: starts muted */}
      <video
        ref={videoRef}
        className="pointer-events-none fixed inset-0 z-0 w-full h-full object-cover"
        autoPlay
        loop
        muted // ensures autoplay works everywhere
        playsInline
      >
        <source src="/assets/JasonToddVideo.mp4" type="video/mp4" />
      </video>

      <AnimatedBackground enabled={particlesEnabled} />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center w-full h-full px-4 text-center">
        {/* Title on the screen */}
        <div className="mt-16">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] text-white drop-shadow-[0_8px_24px_rgba(179,27,27,0.35)]"
          >
            J A S O N
          </motion.h1>
          <p className="mt-3 text-sm uppercase tracking-[0.35em] text-neutral-300">
            Press <span className="text-white">Enter</span> to start
          </p>
        </div>

        {/* Menu on the screen */}
        <div className="mt-auto mb-32">
          <ul
            className="flex w-full max-w-sm flex-col gap-2"
            role="menu"
            aria-label="Game menu"
          >
            {items.map((label, i) => (
              <li key={label} role="none">
                <StartMenuButton
                  ref={refs.current[i]}
                  label={label}
                  isActive={index === i}
                  ariaLabel={label}
                  onClick={() => activate(label)}
                />
              </li>
            ))}
          </ul>

          {/* Ambient toggle below menu */}
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-neutral-300">
            <button
              className="rounded bg-black/40 px-3 py-1 ring-1 ring-white/10 hover:ring-white/30"
              onClick={() => {
                if (videoRef.current) {
                  // toggle muted property
                  videoRef.current.muted = audioOn; 
                }
                setAudioOn((s) => !s);
              }}
            >
              {audioOn ? "Mute ambience" : "Enable ambience"}
            </button>
          </div>
        </div>
      </div>

      {/* Transition */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="fixed inset-0 z-[55] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),rgba(0,0,0,0.95)_70%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.15 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}