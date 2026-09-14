import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Editorial cinematic preloader:
 * - 0–1s: Black screen + tiny typography "INITIALIZING EXPERIENCE"
 * - 1–2s: Huge 00 -> 100 counter rapidly increments
 * - 2–3s: Enormous "SHREYA" appears with the percentage moving behind it
 * - 3s: Horizontal line sweeps across the screen
 * - 3–4s: Loading screen splits vertically like curtains
 * - 4s: Actual portfolio revealed underneath
 */
export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: init, 1: counter, 2: name, 3: line sweep, 4: curtain split
  const [counter, setCounter] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Phase 1: Counter starts at 1000ms and rapidly reaches 100 by 2000ms
    const t1 = setTimeout(() => {
      setPhase(1);
      const start = Date.now();
      const duration = 950;
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const progress = Math.min(1, elapsed / duration);
        const count = Math.floor(progress * 100);
        setCounter(count);
        if (progress >= 1) {
          clearInterval(interval);
          setCounter(100);
        }
      }, 16);
    }, 1000);

    // Phase 2: Giant SHREYA appears at 2000ms, counter moves behind
    const t2 = setTimeout(() => {
      setPhase(2);
    }, 2000);

    // Phase 3: Horizontal line sweeps at 3000ms
    const t3 = setTimeout(() => {
      setPhase(3);
    }, 3000);

    // Phase 4: Curtains split vertically at 3250ms
    const t4 = setTimeout(() => {
      setPhase(4);
    }, 3250);

    // Phase 5: Complete and unmount at 4100ms
    const t5 = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 4150);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  if (isFinished) return null;

  const curtainEase = [0.85, 0, 0.15, 1];

  // Shared visual scene rendered identically inside both curtain halves
  const renderStageContent = () => (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060606]">
      {/* PHASE 0: Tiny Typography (0s - 1s) */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink animate-ping" />
            <span>INITIALIZING EXPERIENCE</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 1 & 2: Numerical Counter */}
      {phase >= 1 && (
        <div
          className={`absolute flex items-baseline justify-center select-none font-mono font-black tabular-nums transition-all duration-700 ease-out ${
            phase >= 2
              ? "z-10 text-[20vw] sm:text-[18vw] text-ink/10 blur-[1.5px] scale-105"
              : "z-20 text-[24vw] sm:text-[22vw] text-ink"
          }`}
        >
          <span>{String(counter).padStart(2, "0")}</span>
          <span className="text-[10vw] sm:text-[8vw] text-muted/60 font-light ml-1">%</span>
        </div>
      )}

      {/* PHASE 2: Enormous SHREYA Name (2s - 3s) */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "-0.04em" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 font-sans font-black text-ink text-[16vw] sm:text-[14vw] leading-none text-center select-none"
          >
            SHREYA
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle bottom meta */}
      <div className="absolute bottom-10 inset-x-0 flex items-center justify-between px-10 font-mono text-[10px] tracking-widest uppercase text-muted/40 pointer-events-none">
        <span>PORTFOLIO EDITORIAL</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden">
      {/* LEFT HALF CURTAIN PANEL */}
      <motion.div
        initial={{ x: "0%" }}
        animate={phase >= 4 ? { x: "-100%" } : { x: "0%" }}
        transition={{ duration: 0.85, ease: curtainEase }}
        className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden border-r border-line/20 pointer-events-auto shadow-2xl"
      >
        {/* Full screen viewport inside left half (aligned left) */}
        <div className="absolute left-0 top-0 w-screen h-screen">
          {renderStageContent()}
        </div>
      </motion.div>

      {/* RIGHT HALF CURTAIN PANEL */}
      <motion.div
        initial={{ x: "0%" }}
        animate={phase >= 4 ? { x: "100%" } : { x: "0%" }}
        transition={{ duration: 0.85, ease: curtainEase }}
        className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden border-l border-line/20 pointer-events-auto shadow-2xl"
      >
        {/* Full screen viewport inside right half (offset -50vw so center matches 50vw) */}
        <div className="absolute right-0 top-0 w-screen h-screen">
          {renderStageContent()}
        </div>
      </motion.div>

      {/* PHASE 3: Horizontal line sweep across the screen (at 3s) */}
      <AnimatePresence>
        {phase >= 3 && phase < 4 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ink to-transparent shadow-[0_0_16px_rgba(245,245,242,1)] z-[110] origin-left pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* ESC Indicator */}
      <button
        type="button"
        onClick={() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }}
        className="absolute bottom-6 right-6 z-[120] font-mono text-[10px] uppercase tracking-widest text-muted/40 hover:text-ink transition-colors cursor-pointer pointer-events-auto"
      >
        [ESC TO SKIP]
      </button>
    </div>
  );
}
