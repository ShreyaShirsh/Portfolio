import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import TextReveal from "../ui/TextReveal.jsx";
import DeveloperCaricature from "./DeveloperCaricature.jsx";
import AbstractGraphic from "./AbstractGraphic.jsx";
import { site } from "../../data/site.js";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-36 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {site.status}
        </motion.div>

        <h1 className="font-sans font-bold leading-[1] tracking-tightest">
          <TextReveal
            text={site.name}
            className="block text-clamp-hero"
            delay={0.15}
          />
          <div className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4 font-mono text-clamp-h2 font-normal tracking-tight text-muted uppercase">
            <TextReveal text="Information Technology Student" delay={0.35} />
            <span className="hidden sm:inline text-line/80">•</span>
            <TextReveal text="Developer" delay={0.5} />
          </div>
        </h1>

        <div className="mt-16 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="max-w-md text-base leading-relaxed text-muted lg:col-span-5"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted lg:col-span-3"
          >
            <ArrowDown size={13} className="animate-bounce" />
            Scroll to explore
          </motion.div>

          <div className="relative lg:col-span-4">
            <AbstractGraphic className="pointer-events-none absolute -right-10 -top-24 hidden w-64 opacity-70 lg:block" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm lg:ml-auto"
            >
              <DeveloperCaricature />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
