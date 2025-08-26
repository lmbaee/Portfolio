/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blood: "#B31B1B",
        eerie: "#0b1a12",
        mold: "#193b2d"
      },
      fontFamily: {
        display: ['"Nosifer"', '"Creepster"', "Impact", "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: "0.99" },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: "0.4" }
        },
        glitchShift: {
          "0%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-1px,1px)" },
          "40%": { transform: "translate(1px,-1px)" },
          "60%": { transform: "translate(-2px,2px)" },
          "80%": { transform: "translate(2px,-2px)" },
          "100%": { transform: "translate(0,0)" }
        },
        drip: {
          "0%": { opacity: 0, transform: "translateY(-10px) scaleY(0.5)" },
          "40%": { opacity: 1 },
          "100%": { opacity: 0, transform: "translateY(24px) scaleY(1.4)" }
        },
        letterboxIn: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" }
        },
        letterboxOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" }
        }
      },
      animation: {
        flicker: "flicker 2s infinite",
        glitch: "glitchShift 250ms steps(2, end)",
        drip: "drip 600ms ease-in",
        letterboxIn: "letterboxIn 500ms ease-out forwards",
        letterboxOut: "letterboxOut 500ms ease-in forwards"
      },
      backgroundImage: {
        grain:
          "radial-gradient(rgba(255,255,255,0.02), rgba(0,0,0,0.04)), repeating-linear-gradient(0deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 2px)"
      }
    }
  },
  plugins: []
};
