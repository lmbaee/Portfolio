import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hero image
import Hero3D from "../components/Hero3D.jsx";
import BioSection from "../components/BioSection.jsx";
import WorkExperience from "../components/WorkExperience.jsx";
import Gallery from "../components/Gallery.jsx";

// Project thumbs & images & Ambience audio
import SceneItThumb from "/assets/SceneIT.png";
import SceneItSearch from "/assets/Scene It Search.png";
import SimpsonsThumb from "/assets/SimpsonsApi.png";

import CySA from "/assets/CySA+.png";
import SecurityPlus from "/assets/Sec+.png";
import CSAP from "/assets/comptia-security-analytics-professional-csap-stackable-certification.png";
import Splunk from "/assets/Splunk Certification.jpg";
import LinuxEss from "/assets/Linux_Essentials_Certificate.jpg";
import NetEss from "/assets/Networking_Essentials_Certificate.jpg";

import JasonToddAudio from "/assets/JasonToddAudio.mp3";

const projects = [
  {
    id: "scene-it",
    title: "Scene It",
    tag: "Website",
    thumb: SceneItThumb,
    images: [SceneItThumb, SceneItSearch],
    description: [
      "SceneIt is a web application that lets users browse TV shows using The Movie Database (TMDb) API. Users can explore trending content, curated playlists, and share reviews and ratings with each other, creating a social hub for TV Show lovers. The frontend is built with Vite + React for a fast and modern development experience. Technologies used were Vite, React, TailwindCSS, SupaBase, and an API. I implemented a search functionality that fetches TV show details and similar shows from TMDB API using show ID from URL params. Displays poster, title, rating, creators, seasons, episodes, and overview. Added interactive 5-star user rating system. Implements toggles for Watched and Listed status. Renders similar shows grid using ShowCard component. As well as creating the ShowCard component.",
      <div key="sceneit-link" className="flex items-center gap-4 text-neutral-400">
        <a
          href="https://portfolio-4ybe.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Scene It"
        >
          Scene It Link
        </a>
      </div>,
    ],
  },
  {
    id: "simpsons-api",
    title: "Simpson's API",
    tag: "API Practice",
    thumb: SimpsonsThumb,
    images: [SimpsonsThumb],
    description: [
      "This was a great starter for API integration and asynchronous JS. It teaches how to build modular front-end code while reinforcing principles of DOM manipulation, error handling, and CSS animations. The tech used was Vite, Vanilla JavaScript, HTML & CSS, and a Simpsons Quote API.",
      <div key="simpsons-link" className="flex items-center gap-4 text-neutral-400">
        <a
          href="https://github.com/lmbaee/JasonC_JavaScript-Web-Application-with-Random-API?tab=readme-ov-file"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="API Github"
        >
          API Github
        </a>
      </div>,
    ],
  },
  {
    id: "Certificates",
    title: "Certificates",
    tag: "Credentials",
    thumb: CySA,
    images: [CySA, SecurityPlus, CSAP, Splunk, LinuxEss, NetEss],
    description: [
      "These are my Certificates.",
      <div key="certs-link" className="flex items-center gap-4 text-neutral-400">
        <a
          href="https://www.credly.com/users/jason-cardenas.e55b000c"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Credly"
        >
          Certificate Link
        </a>
      </div>,
    ],
  },
];

// Helper hook: lock body scroll when modal open
function useLockBodyScroll(lock) {
  useEffect(() => {
    if (lock) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [lock]);
}

// Helper hook: simple focus trap
function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const focusable = ref.current.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKey(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === "Escape") {
        ref.current.dispatchEvent(new Event("closeModal", { bubbles: true }));
      }
    }
    document.addEventListener("keydown", handleKey);
    first?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [active, ref]);
}

export default function MyPortfolio() {
  const [active, setActive] = useState(null);
  const modalRef = useRef(null);

  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef(null);

  useLockBodyScroll(!!active);
  useFocusTrap(modalRef, !!active);

  // Sync ambience state with localStorage (set in GameScreen)
  useEffect(() => {
    const stored = localStorage.getItem("ambienceOn");
    if (stored === "true") {
      setAudioOn(true);
      if (audioRef.current) {
        // Unmute before trying to play; if autoplay is blocked the promise will reject and is safely caught.
        audioRef.current.muted = false;
        audioRef.current.play().catch((err) => {
          console.debug("Autoplay prevented:", err);
        });
      }
    }
  }, []);

  const toggleAmbience = () => {
    if (audioRef.current) {
      if (audioOn) {
        // Disabling: pause and mute to ensure no audio after toggling and persist state.
        audioRef.current.pause();
        audioRef.current.muted = true;
        localStorage.setItem("ambienceOn", "false");
      } else {
        // Enabling: unmute and try to play; catch errors if user gesture required.
        audioRef.current.muted = false;
        audioRef.current.play().catch((err) => {
          console.debug("Play blocked:", err);
        });
        localStorage.setItem("ambienceOn", "true");
      }
    } else {
      // If ref not ready, still persist the chosen state.
      localStorage.setItem("ambienceOn", audioOn ? "false" : "true");
    }
    setAudioOn((s) => !s);
  };

  return (
    <div className="relative bg-transparent text-neutral-200">
      {/* Hero (3D Red Hood model) */}
      <header>
        <Hero3D />
      </header>

      {/* Bio Section */}
      <BioSection />

      {/* Work Experience */}
      <WorkExperience />

      {/* Projects Grid */}
      <main id="work" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="mb-6 font-display text-2xl sm:text-3xl">Projects</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((p) => (
            <motion.article
              key={p.id}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl bg-neutral-900"
            >
              <picture>
                <img
                  src={p.thumb}
                  alt={`${p.title} preview`}
                  className="aspect-video w-full object-cover transition group-hover:scale-105 rounded-t-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className="rounded bg-blood/20 px-2 py-0.5 text-xs text-blood">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-300">
                  {typeof p.description[0] === "string"
                    ? p.description[0].slice(0, 100) + "..."
                    : ""}
                </p>
                <button
                  className="mt-4 inline-flex items-center gap-2 rounded bg-neutral-800 px-3 py-2 text-sm hover:bg-neutral-700"
                  onClick={() => setActive(p)}
                  aria-label={`Open case study: ${p.title}`}
                >
                  Open Case Study <span aria-hidden>↗</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Case study modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-transparent/70 p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={modalRef}
            onClose={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              aria-describedby="case-study-desc"
              className="relative w-full h-full sm:h-auto sm:max-w-4xl overflow-hidden rounded-none sm:rounded-3xl bg-neutral-950 ring-1 ring-white/10 flex flex-col"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <header className="flex items-center justify-between border-b border-white/10 p-4">
                <div>
                  <h4 className="text-xl font-semibold">{active.title}</h4>
                  <p className="text-xs uppercase tracking-widest text-neutral-400">{active.tag}</p>
                </div>
                <button
                  className="rounded bg-neutral-800 px-3 py-2 hover:bg-neutral-700"
                  onClick={() => setActive(null)}
                  aria-label="Close modal"
                >
                  Close
                </button>
              </header>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Mobile carousel */}
                <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-4 py-4">
                  {active.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${active.title} image ${i + 1}`}
                      className="min-w-full snap-center rounded-lg object-cover aspect-[16/9]"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                {/* Desktop grid */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-4">
                  {active.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${active.title} image ${i + 1}`}
                      className="w-full rounded-lg object-cover aspect-[16/9]"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                <div className="mt-4 text-neutral-300 space-y-4">
                  {active.description.map((d, i) =>
                    typeof d === "string" ? <p key={i}>{d}</p> : d
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery */}
      <Gallery />

      {/* Resume */}
      <section id="resume" className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-display text-white mb-4">Resume</h2>
        <a
          href="/assets/resume.pdf"
          download
          className="inline-block rounded bg-blood px-6 py-3 text-white font-semibold hover:bg-blood/90"
        >
          Download Resume
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-neutral-400">
            <a href="https://www.linkedin.com/in/jasonecardenas" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/lmbaee" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:cardenasjason2003@gmail.com">Email</a>
          </div>

          {/* Ambience toggle */}
          <div className="flex items-center">
            {/*
              Start muted by default (muted attribute). When user enables ambience (or stored state is true),
              we unmute and try to play. This helps desktop autoplay succeed while gracefully handling mobile/user-gesture policies.
            */}
            <audio ref={audioRef} src={JasonToddAudio} loop muted />
            <button
              className="rounded bg-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blood min-h-[44px]"
              onClick={toggleAmbience}
            >
              {audioOn ? "Mute ambience" : "Enable ambience"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
