import { useState, useRef, useEffect } from "react";

// Hero image
import Hero3D from "../components/Hero3D.jsx";
import BioSection from "../components/BioSection.jsx";
import WorkExperience from "../components/WorkExperience.jsx";
import Projects from "../components/Projects.jsx";
import Gallery from "../components/Gallery.jsx";

// Ambience audio
import JasonToddAudio from "/assets/JasonToddAudio.mp3";

export default function MyPortfolio() {
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef(null);

  // Sync ambience state with localStorage (set in GameScreen)
  useEffect(() => {
    const stored = localStorage.getItem("ambienceOn");
    if (stored === "true") {
      setAudioOn(true);
      audioRef.current?.play().catch(() => {});
    }
  }, []);

  const toggleAmbience = () => {
    if (audioRef.current) {
      if (audioOn) {
        audioRef.current.pause();
        localStorage.setItem("ambienceOn", "false");
      } else {
        audioRef.current.play().catch(() => {});
        localStorage.setItem("ambienceOn", "true");
      }
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
      <Projects />

      {/* Gallery */}
      <Gallery />

      {/* Resume */}
      <section id="resume" className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-display text-white mb-4">Resume</h2>
        <a
          href="/assets/IT_Support_Specialist-Jason Cardenas.pdf"
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
            <audio ref={audioRef} src={JasonToddAudio} loop />
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
