import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between
                 bg-neutral-800/65 backdrop-blur-md px-4 py-3
                 border-b border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
      aria-label="Primary"
    >
      <Link
        to="/portfolio"
        className="font-display text-xl text-neutral-100 hover:text-white"
      >
        <span className="text-blood">🩸</span> Jason Cardenas 
      </Link>

      <ul className="flex items-center gap-6">
        <li>
          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              "text-sm uppercase tracking-widest transition " +
              (isActive ? "text-white" : "text-neutral-200 hover:text-white")
            }
          >
            Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              "text-sm uppercase tracking-widest transition " +
              (isActive ? "text-white" : "text-neutral-200 hover:text-white")
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <motion.button
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-blood px-3 py-1 text-sm font-semibold
                       text-white shadow-inner shadow-black/40 hover:bg-blood/90"
            onClick={() => (window.location.href = "/")}
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
