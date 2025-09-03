import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

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
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between
                 bg-neutral-800/65 backdrop-blur-md px-4 py-3
                 border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      aria-label="Primary"
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-sm uppercase tracking-widest transition text-neutral-200 hover:text-white"
      >
        🩸 Jason Cardenas
      </button>

      <ul className="flex items-center gap-6">
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
    </nav>
  );
}
