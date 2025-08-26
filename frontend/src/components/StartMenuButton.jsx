import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

/**
 * Reusable game-style start menu item.
 * It supports keyboard focus, hover flicker/glitch, and click drip.
 */
const StartMenuButton = forwardRef(
  ({ label, onClick, isActive, className, as = "button", href, ariaLabel }, ref) => {
    const Comp = as === "a" ? "a" : "button";
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        <Comp
          ref={ref}
          href={href}
          onClick={onClick}
          className={clsx(
            "btn-ghost group relative select-none",
            isActive && "text-white",
            className
          )}
          aria-label={ariaLabel || label}
          aria-current={isActive ? "true" : undefined}
        >
          <span
            className="absolute -left-2 top-1/2 -translate-y-1/2 text-blood opacity-0 transition group-hover:opacity-100"
            aria-hidden
          >
            🔪
          </span>
          <span className="glitch" data-text={label}>
            {label}
          </span>
          <span
            aria-hidden
            className={clsx(
              "absolute -right-3 top-1/2 block h-1 w-16 -translate-y-1/2 bg-blood/60 blur-[1px] opacity-0 transition group-hover:opacity-100"
            )}
          />
        </Comp>
      </motion.div>
    );
  }
);

export default StartMenuButton;
