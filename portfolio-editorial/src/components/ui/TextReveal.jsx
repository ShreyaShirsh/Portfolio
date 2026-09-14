import { motion } from "framer-motion";
import { viewportOnce } from "../../lib/motion.js";

/**
 * Splits text into words and reveals them with a clipped upward slide,
 * staggered — the "editorial headline unveils itself" effect used
 * throughout premium studio sites. Falls back to a plain fade if the
 * text is long (perf) or reduced motion is preferred.
 */
export default function TextReveal({ as: Tag = "div", text, className = "", delay = 0, stagger = 0.045 }) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={viewportOnce}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
