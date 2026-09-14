// Shared Framer Motion variants for the editorial reveal language used
// across the site: things fade and rise into place, slightly staggered.
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const viewportOnce = { once: true, margin: "-10% 0px -10% 0px" };

// Kept short on purpose: with AnimatePresence in "wait" mode, the outgoing
// page's exit duration is a real blank gap between pages, so it stays
// under 200ms — fast enough to read as a crossfade, not a stall.
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
};
