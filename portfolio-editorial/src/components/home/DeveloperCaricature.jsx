import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Code2, Cpu, Coffee } from "lucide-react";

/**
 * DeveloperCaricature
 * A dynamic, interactive vector caricature representing Shreya Shirsh:
 * - Expressive female developer with modern glasses, over-ear studio headphones, and tech hoodie.
 * - Interactive 3D card tilt & smooth cursor-following pupil tracking.
 * - Natural autonomous eye-blink cycle & ambient breathing hover.
 * - Interactive click reaction: winks, triggers code sparks, and cycles live dev status.
 */
export default function DeveloperCaricature() {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const [sparks, setSparks] = useState([]);

  const STATUSES = [
    { icon: Terminal, text: "Compiling ideas..." },
    { icon: Cpu, text: "Computer Science @ work" },
    { icon: Code2, text: "Building scalable apps" },
    { icon: Coffee, text: "Fueling on curiosity" },
  ];

  // Mouse tracking values for 3D tilt & pupil tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth, physics-based movement
  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D perspective card rotation
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  // Pupil movement (limited to natural eye bounds)
  const pupilX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const pupilY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);

  // Subtle head tilt
  const headRotate = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  // Automatic natural eye-blink loop
  useEffect(() => {
    let timeout;
    const scheduleBlink = () => {
      const nextBlink = Math.random() * 3200 + 2500; // blink every 2.5–5.7s
      timeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 160);
      }, nextBlink);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Global mouse move listener for gaze tracking even outside the card
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Normalized coordinates between -0.5 and 0.5 relative to card center
      const rawX = (e.clientX - cardCenterX) / window.innerWidth;
      const rawY = (e.clientY - cardCenterY) / window.innerHeight;

      // Clamp between -0.5 and 0.5
      mouseX.set(Math.max(-0.5, Math.min(0.5, rawX)));
      mouseY.set(Math.max(-0.5, Math.min(0.5, rawY)));
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  // Click interaction: wink, emit floating code sparks, and cycle status
  const handleClick = (e) => {
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 600);

    // Cycle status
    setStatusIndex((prev) => (prev + 1) % STATUSES.length);

    // Spawn sparks
    const rect = cardRef.current?.getBoundingClientRect();
    const clickX = rect ? e.clientX - rect.left : 150;
    const clickY = rect ? e.clientY - rect.top : 200;

    const symbols = ["{ }", "</>", "01", "λ", "✨", "const", "git", "npm"];
    const newSpark = {
      id: Date.now() + Math.random(),
      x: clickX,
      y: clickY,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    };

    setSparks((prev) => [...prev.slice(-8), newSpark]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1400);
  };

  const CurrentStatusIcon = STATUSES[statusIndex].icon;

  return (
    <div className="relative w-full select-none" style={{ perspective: 1200 }}>
      {/* Interactive 3D container */}
      <motion.div
        ref={cardRef}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        data-cursor="CLICK ME"
        className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line bg-gradient-to-b from-[#131317] via-[#0d0d10] to-[#08080a] shadow-2xl transition-shadow duration-500 hover:border-line/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer"
      >
        {/* Subtle background ambient mesh glow behind caricature */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(99,102,241,0.18)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(244,63,94,0.12)_0%,transparent_50%)]" />

        {/* Top-left corner editorial badge */}
        <div className="absolute left-4 top-4 z-30 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SHREYA.DEV</span>
        </div>

        {/* Top-right tech badge */}
        <div className="absolute right-4 top-4 z-30 font-mono text-[9px] uppercase tracking-widest text-muted/50">
          CS_2026
        </div>

        {/* Floating Code Sparks (Spawned on Click) */}
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              initial={{ opacity: 1, y: 0, scale: 0.6 }}
              animate={{ opacity: 0, y: -90, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ left: spark.x, top: spark.y }}
              className="pointer-events-none absolute z-40 font-mono text-xs font-bold text-ink shadow-sm -translate-x-1/2 -translate-y-1/2"
            >
              <span className="rounded bg-ink/20 px-1.5 py-0.5 backdrop-blur-sm border border-line/40 text-[11px] text-ink">
                {spark.symbol}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* SVG CARICATURE ILLUSTRATION */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 flex h-full w-full items-end justify-center pb-2 pt-8"
        >
          <svg
            viewBox="0 0 400 480"
            className="h-full w-full max-h-[440px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Hair Gradient */}
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#242229" />
                <stop offset="50%" stopColor="#141318" />
                <stop offset="100%" stopColor="#0a090d" />
              </linearGradient>

              {/* Skin Gradient */}
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f3cfb3" />
                <stop offset="100%" stopColor="#dfb295" />
              </linearGradient>

              {/* Laptop Screen Reflection Gradient */}
              <linearGradient id="laptopGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(147, 197, 253, 0.45)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Glasses Rim Gradient */}
              <linearGradient id="glassesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>

              {/* Hoodie Gradient */}
              <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1f2129" />
                <stop offset="100%" stopColor="#121318" />
              </linearGradient>
            </defs>

            {/* Back Hair Volume */}
            <path
              d="M120 180 C110 90, 290 90, 280 180 C295 240, 290 320, 260 350 C240 370, 160 370, 140 350 C110 320, 105 240, 120 180 Z"
              fill="url(#hairGrad)"
            />

            {/* Headphone Band (Behind Head) */}
            <path
              d="M125 185 C120 95, 280 95, 275 185"
              stroke="#2e303b"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M125 185 C120 95, 280 95, 275 185"
              stroke="#64748b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />

            {/* Shoulders / Tech Hoodie */}
            <path
              d="M90 460 C90 370, 140 340, 200 340 C260 340, 310 370, 310 460 Z"
              fill="url(#hoodieGrad)"
              stroke="#2a2c35"
              strokeWidth="2"
            />

            {/* Hoodie Collar / Drawstrings */}
            <path
              d="M165 340 C175 375, 225 375, 235 340"
              fill="#181920"
              stroke="#333642"
              strokeWidth="2"
            />
            {/* Drawstring lines */}
            <path d="M185 365 L185 410" stroke="#f5f5f2" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M215 365 L215 418" stroke="#f5f5f2" strokeWidth="2.5" strokeLinecap="round" />

            {/* Neck */}
            <path
              d="M175 300 C175 330, 225 330, 225 300 L225 270 L175 270 Z"
              fill="#dfb295"
            />

            {/* HEAD GROUP (Tilts slightly with mouse) */}
            <motion.g style={{ rotate: headRotate, originX: "200px", originY: "240px" }}>
              {/* Face Base */}
              <path
                d="M145 180 C145 140, 255 140, 255 180 C255 245, 240 285, 200 295 C160 285, 145 245, 145 180 Z"
                fill="url(#skinGrad)"
              />

              {/* Ears */}
              <circle cx="145" cy="205" r="14" fill="#dfb295" />
              <circle cx="255" cy="205" r="14" fill="#dfb295" />

              {/* Headphone Ear Cushions */}
              <rect
                x="122"
                y="175"
                width="20"
                height="55"
                rx="10"
                fill="#181922"
                stroke="#333644"
                strokeWidth="2"
              />
              <rect
                x="258"
                y="175"
                width="20"
                height="55"
                rx="10"
                fill="#181922"
                stroke="#333644"
                strokeWidth="2"
              />
              {/* Headphone status light */}
              <circle cx="268" cy="202" r="3" fill="#10b981">
                <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Cheek Blush */}
              <ellipse cx="165" cy="225" rx="12" ry="6" fill="#f43f5e" opacity="0.22" />
              <ellipse cx="235" cy="225" rx="12" ry="6" fill="#f43f5e" opacity="0.22" />

              {/* Eyebrows */}
              <path
                d="M160 178 C168 174, 182 175, 188 180"
                stroke="#1c1a20"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M240 178 C232 174, 218 175, 212 180"
                stroke="#1c1a20"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* EYES CONTAINER */}
              <g id="eyes">
                {/* LEFT EYE */}
                {isBlinking ? (
                  // Blinking Left Eye
                  <path d="M165 200 Q175 204 185 200" stroke="#1c1a20" strokeWidth="3" strokeLinecap="round" />
                ) : (
                  <g>
                    {/* Sclera (White of eye) */}
                    <ellipse cx="175" cy="198" rx="11" ry="8" fill="#ffffff" />
                    {/* Pupil + Iris (Tracks mouse) */}
                    <motion.g style={{ x: pupilX, y: pupilY }}>
                      <circle cx="175" cy="198" r="5.5" fill="#3b2d24" />
                      <circle cx="175" cy="198" r="3.2" fill="#0f0c0a" />
                      <circle cx="173" cy="196" r="1.8" fill="#ffffff" />
                    </motion.g>
                    {/* Eyelash line */}
                    <path d="M164 196 C168 190, 182 190, 186 196" stroke="#1c1a20" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </g>
                )}

                {/* RIGHT EYE */}
                {isBlinking || isWinking ? (
                  // Winking or Blinking Right Eye (Playful curve)
                  <path d="M215 199 Q225 207 235 199" stroke="#1c1a20" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                ) : (
                  <g>
                    {/* Sclera */}
                    <ellipse cx="225" cy="198" rx="11" ry="8" fill="#ffffff" />
                    {/* Pupil + Iris (Tracks mouse) */}
                    <motion.g style={{ x: pupilX, y: pupilY }}>
                      <circle cx="225" cy="198" r="5.5" fill="#3b2d24" />
                      <circle cx="225" cy="198" r="3.2" fill="#0f0c0a" />
                      <circle cx="223" cy="196" r="1.8" fill="#ffffff" />
                    </motion.g>
                    {/* Eyelash line */}
                    <path d="M214 196 C218 190, 232 190, 236 196" stroke="#1c1a20" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </g>
                )}
              </g>

              {/* MODERN ROUND CHIC GLASSES */}
              <g id="glasses">
                {/* Left Frame */}
                <circle
                  cx="175"
                  cy="198"
                  r="21"
                  fill="rgba(240, 249, 255, 0.08)"
                  stroke="url(#glassesGrad)"
                  strokeWidth="3.5"
                />
                {/* Right Frame */}
                <circle
                  cx="225"
                  cy="198"
                  r="21"
                  fill="rgba(240, 249, 255, 0.08)"
                  stroke="url(#glassesGrad)"
                  strokeWidth="3.5"
                />
                {/* Bridge */}
                <path d="M196 198 Q200 195 204 198" stroke="url(#glassesGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Glass Glint / Corner Reflection */}
                <path d="M163 186 A18 18 0 0 1 180 182" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                <path d="M213 186 A18 18 0 0 1 230 182" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </g>

              {/* Nose */}
              <path d="M198 215 C200 222, 203 222, 205 220" stroke="#ca9b7e" strokeWidth="2" strokeLinecap="round" fill="none" />

              {/* Mouth / Smile */}
              {isWinking ? (
                // Happy open smile when winking on click
                <path
                  d="M188 244 Q200 258 212 244"
                  fill="#991b1b"
                  stroke="#1c1a20"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ) : (
                // Subtle confident smirk
                <path
                  d="M190 245 Q200 252 211 246"
                  stroke="#991b1b"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />
              )}

              {/* Front Bangs / Hair Strands */}
              <path
                d="M138 170 C150 120, 250 120, 262 170 C240 145, 210 148, 195 165 C185 145, 155 145, 138 170 Z"
                fill="url(#hairGrad)"
              />
              {/* Stylish loose strand sway */}
              <motion.path
                animate={{ rotate: [-2, 3, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ originX: "150px", originY: "160px" }}
                d="M148 165 Q135 210 140 250"
                stroke="url(#hairGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </motion.g>

            {/* Laptop Display Edge & Upward Glow */}
            <path
              d="M120 460 L280 460 L310 480 L90 480 Z"
              fill="#20222a"
              stroke="#3a3d4a"
              strokeWidth="2"
            />
            {/* Soft upward screen light cast on face */}
            <rect x="130" y="240" width="140" height="220" fill="url(#laptopGlow)" pointerEvents="none" />
          </svg>
        </motion.div>

        {/* Bottom Interactive Status Bar */}
        <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between rounded-full border border-line/40 bg-black/60 px-3 py-1.5 backdrop-blur-md transition-colors hover:border-line hover:bg-black/80">
          <div className="flex items-center gap-2 font-mono text-[11px] text-ink">
            <CurrentStatusIcon size={12} className="text-emerald-400" />
            <span className="truncate max-w-[190px]">{STATUSES[statusIndex].text}</span>
          </div>
          <Sparkles size={11} className="text-muted/60 group-hover:text-ink transition-colors" />
        </div>
      </motion.div>

      {/* Editorial caption below the card */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
        <span>INTERACTIVE AVATAR</span>
        <span className="text-ink/60">[CLICK TO INTERACT]</span>
      </div>
    </div>
  );
}
