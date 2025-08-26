import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: "scene-it",
    title: "Scene It",
    tag: "Website",
    thumb: "/assets/SceneIT.png",
    images: ["/assets/SceneIT.png", "/assets/Scene It Search.png"],
    description:
      ["SceneIt is a web application that lets users browse TV shows using The Movie Database (TMDb) API. ",
      "Users can explore trending content, curated playlists, and share reviews and ratings with each other, creating a social hub for TV Show lovers. ",
      "The frontend is built with Vite + React for a fast and modern development experience. Technologies used were Vite, React, TailwindCSS, SupaBase, and an API. ",
      "I implemennted a search functionality that fetches TV show details and similar shows from TMDB API using show ID from URL params. ",
      "Displays poster, title, rating, creators, seasons, episodes, and overview. Added interactive 5-star user rating system. ",
      "Implements toggles for Watched and Listed status Renders similar shows grid using ShowCard component. As well as Creating the ShowCard component. ",
    <div className="flex items-center gap-4 text-neutral-400">
    <a href="https://portfolio-4ybe.vercel.app" target="_blank" rel="noreferrer" aria-label="Scene It">Scene It Link</a>  
    </div>
    ]
    },
  {
    id: "simpsons-api",
    title: "Simpson's API",
    tag: "API Practice",
    thumb: "/assets/SimpsonsApi.png",
    images: ["/assets/SimpsonsApi.png"],
    description:
    [
    "This was a great starter for API integration and asynchronous JS. ",
    "It teaches how to build modular front-end code. While reinforcing principles of DOM manipulation, error handling, and CSS animations. ",
    "The Tech used was Vite, Vanilla JavaScript, HTML & CSS, and a Simpsons Quote API. ",
    <div className="flex items-center gap-4 text-neutral-400">
    <a href="https://github.com/lmbaee/JasonC_JavaScript-Web-Application-with-Random-API?tab=readme-ov-file" target="_blank" rel="noreferrer" aria-label="API Github">API Github</a>  
    </div>
    ]
  },

  {
    id: "Certificates",
    title: "Certificates",
    tag: "Credentials",
    thumb: "/assets/CompTIA CySA+ certificate.jpg", 
    images: [
      "/assets/CompTIA CySA+ certificate.jpg",
      "/assets/CompTIA Security+ certificate.jpg",
      "/assets/comptia-security-analytics-professional-csap-stackable-certification.png",
      "/assets/Splunk Certification.jpg",
      "/assets/Linux_Essentials_Certificate.jpg",
      "/assets/Networking_Essentials_Certificate.jpg"
    ], 
    description:
    [
      "These are my Certificates",
    <div className="flex items-center gap-4 text-neutral-400">
    <a href="https://www.credly.com/users/jason-cardenas.e55b000c" target="_blank" rel="noreferrer" aria-label="Credly">Certificate Link</a>  
    </div>
  ]
  }
];

export default function MyPortfolio() {
  const [active, setActive] = useState(null);

  return (
    <div className="relative min-h-screen bg-black text-neutral-200">
      {/* Hero */}
      <section
        className="relative grid min-h-[70vh] place-items-center overflow-hidden"
        aria-label="Hero"
      >
        <img
          src="/assets/GhostFace.jpg"
          srcSet="/assets/GhostFace.jpg 1280w, /assets/GhostFace.jpg 1920w"
          sizes="(max-width: 768px) 100vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          alt="Foggy forest with eerie cabin — portfolio hero"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-display text-5xl md:text-7xl text-white drop-shadow-lg">
            Hello, I’m <span className="text-blood">Jason Cardenas</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            I am a Web Developer with a passion for Horror interfaces and Cybersecurity.
          </p>
          <a
            href="#work"
            className="mt-8 inline-block rounded bg-blood px-6 py-3 font-semibold uppercase tracking-wider text-white shadow hover:bg-blood/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blood"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* Projects grid */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="mb-6 font-display text-3xl">Selected Work</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <motion.article
              key={p.id}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl bg-neutral-900"
            >
              <img
                src={p.thumb}
                alt={`${p.title} preview`}
                className="h-48 w-full object-cover transition group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{p.title}</h4>
                  <span className="rounded bg-blood/20 px-2 py-0.5 text-xs text-blood">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-300">
                  {p.description}
                </p>
                <button
                  className="mt-4 inline-flex items-center gap-2 rounded bg-neutral-800 px-3 py-1.5 text-sm hover:bg-neutral-700"
                  onClick={() => setActive(p)}
                  aria-label={`Open case study: ${p.title}`}
                >
                  Open Case Study <span aria-hidden>↗</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Case study modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-neutral-950 ring-1 ring-white/10"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <header className="flex items-center justify-between border-b border-white/10 p-4">
                <div>
                  <h4 className="text-xl font-semibold">{active.title}</h4>
                  <p className="text-xs uppercase tracking-widest text-neutral-400">
                    {active.tag}
                  </p>
                </div>
                <button
                  className="rounded bg-neutral-800 px-3 py-1 hover:bg-neutral-700"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </header>
              <div className="grid gap-2 p-4 sm:grid-cols-2">
                {active.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${active.title} image ${i + 1}`}
                    className="h-48 w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
              <div className="p-4 text-neutral-300">{active.description}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4 text-neutral-400">
            <a href="https://www.linkedin.com/in/jasonecardenas" target="_blank" rel="noreferrer" aria-label="Linkedin">LinkedIn</a>
            <a href="https://github.com/lmbaee" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
