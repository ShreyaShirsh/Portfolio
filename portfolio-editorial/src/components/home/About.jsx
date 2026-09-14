import { motion } from "framer-motion";
import { site } from "../../data/site.js";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion.js";
import TextReveal from "../ui/TextReveal.jsx";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span>01</span>
          <span className="h-px w-10 bg-line" />
          <span>About</span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <h2 className="lg:col-span-5">
            <TextReveal text="ABOUT ME" className="text-clamp-h1 font-extrabold leading-[0.95] tracking-tightest" />
          </h2>

          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7"
          >
            {site.bio.map((paragraph, i) => (
              <motion.p key={i} variants={fadeUp} className="text-lg leading-relaxed text-ink sm:text-xl">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
