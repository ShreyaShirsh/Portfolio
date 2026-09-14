/**
 * Stands in for real project/portrait imagery. Deliberately labeled so
 * it's obvious what to swap out — replace with a real <img> once you
 * have assets, the aspect ratio and border are already set up to match.
 */
export default function PlaceholderImage({ label = "IMAGE PLACEHOLDER", className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-line bg-[#111110] ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="none">
        <defs>
          <pattern id="diag" width="14" height="14" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(245,245,242,0.14)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>
      <span className="relative z-10 font-mono text-[10px] uppercase tracking-widest text-muted sm:text-xs">
        {label}
      </span>
    </div>
  );
}
