import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "../../data/site.js";

const NAV_ITEMS = [
  { href: "/#work", label: "WORK" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#skills", label: "SKILLS" },
  { href: "/#contact", label: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and lock body scroll while open.
  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled || menuOpen ? "border-line bg-paper/80 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
          <Link
            to={location.pathname === "/" ? "/#top" : "/"}
            data-cursor="HOME"
            className="relative z-10 font-mono text-sm font-medium uppercase tracking-widest text-ink"
          >
            {site.initials}
            <span className="hidden sm:inline"> / {site.name}</span>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline font-mono text-xs uppercase tracking-widest text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            {site.status}
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-10 flex items-center justify-center md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-6 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-4xl font-extrabold tracking-tightest"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              {site.status}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
