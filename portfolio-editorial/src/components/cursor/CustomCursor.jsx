import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsFinePointer } from "../../hooks/useIsFinePointer.js";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A small ring that follows the pointer with a light spring lag, growing
 * and labeling itself ("VIEW", "DRAG", ...) over elements that carry a
 * data-cursor attribute. Only mounts on fine-pointer, motion-OK devices —
 * the system cursor is left alone everywhere else.
 */
export default function CustomCursor() {
  const isFinePointer = useIsFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const enabled = isFinePointer && !reducedMotion;
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest("[data-cursor]");
      if (target) {
        setActive(true);
        setLabel(target.getAttribute("data-cursor") || "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-ink mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: active ? 84 : 14,
        height: active ? 84 : 14,
        backgroundColor: active ? "rgba(245,245,242,1)" : "rgba(245,245,242,0)",
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {active && label && (
        <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-paper">
          {label}
        </span>
      )}
    </motion.div>
  );
}
