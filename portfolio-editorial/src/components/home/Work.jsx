import { motion } from "framer-motion";
import { projects } from "../../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";
import TextReveal from "../ui/TextReveal.jsx";
import { staggerContainer, viewportOnce } from "../../lib/motion.js";

export default function Work() {
  return (
    <section id="work" className="border-t border-line px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span>02</span>
          <span className="h-px w-10 bg-line" />
          <span>Work</span>
        </div>

        <h2 className="mb-16">
          <TextReveal text="SELECTED WORK" className="text-clamp-h1 font-semibold leading-[1.05] tracking-tightest" />
        </h2>

        <motion.div variants={staggerContainer(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
