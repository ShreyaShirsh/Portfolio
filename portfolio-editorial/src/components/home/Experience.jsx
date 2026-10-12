import { motion } from "framer-motion";
import { experience } from "../../data/experience.js";
import TextReveal from "../ui/TextReveal.jsx";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion.js";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span>04</span>
          <span className="h-px w-10 bg-line" />
          <span>Experience</span>
        </div>

        <h2 className="mb-16">
          <TextReveal
            text="EXPERIENCE & EDUCATION"
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tightest"
          />
        </h2>

        <motion.div variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce}>
          {experience.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="grid grid-cols-1 gap-3 border-t border-line py-8 last:border-b sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-10"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted sm:col-span-2">
                {item.year}
              </span>
              <div className="sm:col-span-4">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{item.org}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">{item.role}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted sm:col-span-6">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
