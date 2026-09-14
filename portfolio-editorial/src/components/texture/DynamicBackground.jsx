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

  // Base background color interpolation across portfolio sections:
  // 0.00 -> Hero: Deep Midnight Obsidian / Indigo
  // 0.25 -> About: Deep Dusk / Twilight Plum
  // 0.50 -> Work: Forest Noir / Deep Slate Emerald
  // 0.75 -> Skills & Experience: Warm Espresso / Amber Bronze
  // 1.00 -> Contact & Footer: Crimson Noir / Velvet Wine
  const baseBg = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#08090e", "#0d0812", "#050d0a", "#0e0906", "#0f050b"]
  );

  // Orb 1 color transitions (Upper / Primary light)
  const orb1Color = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(49, 46, 129, 0.36)",  // Twilight Indigo
      "rgba(88, 28, 135, 0.34)",  // Amethyst Plum
      "rgba(6, 78, 59, 0.32)",    // Emerald Noir
      "rgba(146, 64, 14, 0.28)",  // Warm Amber Bronze
      "rgba(159, 18, 57, 0.34)",  // Deep Velvet Rose
    ]
  );

  // Orb 2 color transitions (Lower / Secondary counter-light)
  const orb2Color = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(30, 41, 59, 0.45)",   // Slate Midnight
      "rgba(76, 29, 149, 0.32)",  // Deep Violet
      "rgba(15, 118, 110, 0.28)", // Dark Pine / Teal
      "rgba(68, 40, 24, 0.32)",   // Dark Cognac
      "rgba(76, 5, 25, 0.34)",    // Crimson Noir
    ]
  );

  // Orb 3 color transitions (Delicate center luminescence)
  const orb3Color = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      "rgba(56, 189, 248, 0.12)", // Ice highlight
      "rgba(168, 85, 247, 0.11)", // Purple highlight
      "rgba(52, 211, 153, 0.10)", // Jade highlight
      "rgba(251, 146, 60, 0.11)", // Warm amber highlight
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

      {/* Vignette overlay: softly darkens perimeter to maintain high contrast and focus */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(6, 6, 6, 0.65) 100%)",
        }}
      />
    </motion.div>
  );
}
