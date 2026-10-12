import { motion } from "framer-motion";
import { skillGroups } from "../../data/skills.js";
import TextReveal from "../ui/TextReveal.jsx";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion.js";

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span>03</span>
          <span className="h-px w-10 bg-line" />
          <span>Skills</span>
        </div>

        <h2 className="mb-16 max-w-3xl">
          <TextReveal text="What I do" className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tightest" />
        </h2>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-4"
        >
          {skillGroups.map((group, g) => (
            <motion.div key={group.title} variants={fadeUp} className="border-t border-line pt-6">
              <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
                <span>{group.title}</span>
                <span>{String(g + 1).padStart(2, "0")}</span>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-lg text-ink/70 transition-colors duration-300 ease-editorial hover:text-ink sm:text-xl"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
