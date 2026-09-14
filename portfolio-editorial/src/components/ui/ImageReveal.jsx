import { motion } from "framer-motion";
import { viewportOnce } from "../../lib/motion.js";

/**
 * Classic agency-site image reveal: a solid curtain covers the image,
 * then wipes upward while the image itself eases down from a slight
 * over-scale — sells depth without needing real photography yet.
 */
export default function ImageReveal({ children, className = "", delay = 0 }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.div
        className="curtain"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: delay + 0.05 }}
      />
    </div>
  );
}
