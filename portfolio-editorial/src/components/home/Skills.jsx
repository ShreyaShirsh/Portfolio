import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../../data/skills.js";
import TextReveal from "../ui/TextReveal.jsx";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/motion.js";

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="skills" className="border-t border-line px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span>03</span>
          <span className="h-px w-10 bg-line" />
          <span>Skills</span>
        </div>

        <h2 className="mb-16">
          <TextReveal text="WHAT I DO" className="text-clamp-h1 font-extrabold leading-[0.95] tracking-tightest" />
        </h2>

        <motion.ul
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {skills.map((skill, i) => (
            <motion.li
              key={skill}
              variants={fadeUp}
              onMouseEnter={() => setHoveredIndex(i)}
              className="group relative border-t border-line py-5 last:border-b sm:py-7"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-sans text-3xl font-bold tracking-tightest transition-all duration-500 ease-editorial sm:text-5xl lg:text-6xl"
                  style={{
                    opacity: hoveredIndex === null || hoveredIndex === i ? 1 : 0.28,
                    transform: hoveredIndex === i ? "translateX(0.5rem)" : "translateX(0)",
                  }}
                >
                  {skill}
                </span>
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
