import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * Monochrome generative line-art accent — the "abstract animated graphic"
 * called for beside the hero portrait. Three concentric, slightly
 * eccentric rings drawn with stroke-dasharray and rotated at different
 * slow speeds, plus a crosshair. Pure SVG/CSS, no canvas or WebGL.
 */
export default function AbstractGraphic({ className = "" }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill="none"
        stroke="rgba(245,245,242,0.5)"
        strokeWidth="0.75"
        strokeDasharray="4 10"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      />
      <motion.circle
        cx="200"
        cy="200"
        r="118"
        fill="none"
        stroke="rgba(245,245,242,0.3)"
        strokeWidth="0.5"
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      />
      <motion.g
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <line x1="200" y1="30" x2="200" y2="60" stroke="#f5f5f2" strokeWidth="1" />
        <line x1="200" y1="340" x2="200" y2="370" stroke="#f5f5f2" strokeWidth="1" />
        <line x1="30" y1="200" x2="60" y2="200" stroke="#f5f5f2" strokeWidth="1" />
        <line x1="340" y1="200" x2="370" y2="200" stroke="#f5f5f2" strokeWidth="1" />
      </motion.g>
      <circle cx="200" cy="200" r="3" fill="#f5f5f2" />
    </svg>
  );
}
