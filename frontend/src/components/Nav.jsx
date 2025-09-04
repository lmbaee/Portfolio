import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const firstItemRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // focus first item when opening
    firstItemRef.current?.focus?.();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleScrollOrNav = (id) => {
    const scrollToId = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname === "/portfolio") {
      scrollToId();
    } else {
      navigate("/portfolio");
      // use window.onload fallback if needed
      setTimeout(scrollToId, 500);
    }
    setOpen(false);
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between
                 bg-neutral-800/65 backdrop-blur-md px-4 py-3
                 border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      aria-label="Primary"
    >
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setOpen(false);
        }}
        className="text-sm uppercase tracking-widest transition text-neutral-200 hover:text-white"
      >
        🩸 Jason Cardenas
      </button>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-6">
        <li>
          <button
            onClick={() => handleScrollOrNav("experience")}
            className="text-sm uppercase tracking-widest transition text-neutral-200 hover:text-white"
          >
            Work Experience
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollOrNav("work")}
            className="text-sm uppercase tracking-widest transition text-neutral-200 hover:text-white"
          >
            Projects
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScrollOrNav("gallery")}
            className="text-sm uppercase tracking-widest transition text-neutral-200 hover:text-white"
          >
            Gallery
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/contact")}
            className="text-sm uppercase tracking-widest transition text-neutral-200 hover:text-white"
          >
            Contact
          </button>
        </li>
        <li>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-blood px-3 py-1 text-sm font-semibold text-white shadow-inner shadow-black/40 hover:bg-blood/90"
            onClick={() => navigate("/")}
            aria-label="Back to Start"
            title="Back to Start"
          >
            Ⓑ Start
          </motion.button>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-neutral-200 hover:text-white ring-1 ring-white/10 hover:ring-white/30"
        aria-label="Toggle navigation menu"
        aria-controls="mobile-menu"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">Open menu</span>
        <motion.span
          initial={false}
          animate={{ rotate: open ? 90 : 0 }}
          className="i-hamburger"
        >
          {/* minimalist hamburger icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <motion.rect
              x="3"
              y="6"
              width="18"
              height="2"
              rx="1"
              initial={false}
              animate={{ x: open ? 2 : 0, opacity: open ? 0.6 : 1 }}
              transition={{ duration: 0.2 }}
              fill="currentColor"
            />
            <motion.rect
              x="3"
              y="11"
              width="18"
              height="2"
              rx="1"
              initial={false}
              animate={{ width: open ? 12 : 18 }}
              transition={{ duration: 0.2 }}
              fill="currentColor"
            />
            <motion.rect
              x="3"
              y="16"
              width="18"
              height="2"
              rx="1"
              initial={false}
              animate={{ x: open ? 6 : 0, width: open ? 12 : 18 }}
              transition={{ duration: 0.2 }}
              fill="currentColor"
            />
          </svg>
        </motion.span>
      </button>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 md:hidden"
          >
            <div className="mx-3 rounded-2xl bg-neutral-900/95 ring-1 ring-white/10 backdrop-blur p-2">
              <ul className="flex flex-col">
                <li>
                  <button
                    ref={firstItemRef}
                    className="w-full text-left px-4 py-3 text-sm uppercase tracking-widest text-neutral-200 hover:text-white focus-visible:outline-none"
                    onClick={() => handleScrollOrNav("experience")}
                  >
                    Work Experience
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 text-sm uppercase tracking-widest text-neutral-200 hover:text-white"
                    onClick={() => handleScrollOrNav("work")}
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 text-sm uppercase tracking-widest text-neutral-200 hover:text-white"
                    onClick={() => handleScrollOrNav("gallery")}
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-3 text-sm uppercase tracking-widest text-neutral-200 hover:text-white"
                    onClick={() => {
                      navigate("/contact");
                      setOpen(false);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="pt-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="w-full rounded-lg bg-blood px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-black/40 hover:bg-blood/90"
                    onClick={() => {
                      navigate("/");
                      setOpen(false);
                    }}
                    aria-label="Back to Start"
                    title="Back to Start"
                  >
                    Ⓑ Start
                  </motion.button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
