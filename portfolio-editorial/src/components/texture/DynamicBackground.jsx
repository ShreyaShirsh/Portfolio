import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * DynamicBackground renders a fixed ambient canvas that subtly shifts its
 * base palette and luminous mesh orbs as the user scrolls through the portfolio.
 *
 * It uses GPU-accelerated transforms, Framer Motion spring physics for liquid
 * responsiveness, and blends underneath the film-grain overlay and editorial type.
 */
export default function DynamicBackground() {
  const prefersReduced = usePrefersReducedMotion();

  // Track global scroll progress (0 at top of document, 1 at bottom)
  const { scrollYProgress } = useScroll();

  // Gentle spring physics so rapid scrolling or flicking glides smoothly
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });

  // Base background color interpolation across portfolio sections. A soft,
  // lifted slate (not pure black) with only gentle hue drift, so the page
  // stays calm on the eyes as it scrolls:
  // 0.00 -> Hero: Dusk Slate
  // 0.25 -> About: Lavender Slate
  // 0.50 -> Work: Sage Slate
  // 0.75 -> Skills & Experience: Sand Slate
  // 1.00 -> Contact & Footer: Mauve Slate
  const baseBg = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#12151c", "#14141d", "#11171a", "#16161a", "#15141a"]
  );

  // Orb 1 color transitions (Upper / Primary light)
  const orb1Color = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(96, 118, 168, 0.22)",  // Dusk Blue
      "rgba(124, 114, 176, 0.20)", // Soft Lavender
      "rgba(96, 146, 134, 0.18)",  // Sage
      "rgba(166, 146, 120, 0.14)", // Warm Sand
      "rgba(150, 116, 142, 0.16)", // Dusty Mauve
    ]
  );

  // Orb 2 color transitions (Lower / Secondary counter-light)
  const orb2Color = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(74, 94, 126, 0.22)",   // Mist Blue
      "rgba(98, 94, 144, 0.18)",   // Periwinkle
      "rgba(72, 124, 124, 0.18)",  // Soft Teal
      "rgba(112, 102, 96, 0.16)",  // Warm Stone
      "rgba(112, 92, 124, 0.18)",  // Heather
    ]
  );

  // Orb 3 color transitions (Delicate center luminescence)
  const orb3Color = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      "rgba(156, 186, 214, 0.08)", // Pale sky highlight
      "rgba(176, 166, 214, 0.08)", // Pale lilac highlight
      "rgba(156, 204, 188, 0.07)", // Pale mint highlight
      "rgba(214, 194, 164, 0.07)", // Pale sand highlight
    ]
  );

  // Scroll-reactive orb movements
  const orb1Y = useTransform(smoothProgress, [0, 1], ["-12%", "52%"]);
  const orb1X = useTransform(smoothProgress, [0, 0.5, 1], ["-8%", "18%", "-4%"]);
  const orb1Scale = useTransform(smoothProgress, [0, 0.5, 1], [1.05, 1.25, 0.95]);

  const orb2Y = useTransform(smoothProgress, [0, 1], ["65%", "8%"]);
  const orb2X = useTransform(smoothProgress, [0, 0.5, 1], ["58%", "38%", "66%"]);
  const orb2Scale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 0.95, 1.2]);

  const orb3Y = useTransform(smoothProgress, [0, 1], ["25%", "65%"]);
  const orb3X = useTransform(smoothProgress, [0, 1], ["35%", "25%"]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ backgroundColor: baseBg }}
    >
      {/* Orb 1: Primary glowing aura */}
      <motion.div
        className="absolute w-[65vw] h-[65vw] min-w-[520px] min-h-[520px] rounded-full filter blur-[100px] md:blur-[150px] will-change-transform"
        style={{
          top: orb1Y,
          left: orb1X,
          scale: orb1Scale,
          backgroundColor: orb1Color,
        }}
        animate={
          prefersReduced
            ? undefined
            : {
                x: [0, 32, -24, 0],
                y: [0, -28, 22, 0],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2: Secondary counter-balancing aura */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] min-w-[460px] min-h-[460px] rounded-full filter blur-[110px] md:blur-[160px] will-change-transform"
        style={{
          top: orb2Y,
          left: orb2X,
          scale: orb2Scale,
          backgroundColor: orb2Color,
        }}
        animate={
          prefersReduced
            ? undefined
            : {
                x: [0, -36, 26, 0],
                y: [0, 32, -26, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 3: Soft ambient center luminescence */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] min-w-[340px] min-h-[340px] rounded-full filter blur-[90px] md:blur-[120px] will-change-transform"
        style={{
          top: orb3Y,
          left: orb3X,
          backgroundColor: orb3Color,
        }}
        animate={
          prefersReduced
            ? undefined
            : {
                scale: [1, 1.18, 0.95, 1],
                opacity: [0.6, 0.85, 0.6],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vignette overlay: a light edge falloff for focus, kept gentle so the page doesn't feel heavy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(10, 11, 15, 0.3) 100%)",
        }}
      />
    </motion.div>
  );
}
