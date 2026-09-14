import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PlaceholderImage from "../ui/PlaceholderImage.jsx";
import { fadeUp } from "../../lib/motion.js";

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={fadeUp}>
      <Link
        to={`/work/${project.slug}`}
        data-cursor="VIEW"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group block border-t border-line py-10 first:border-t-0 sm:py-14"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 sm:items-center sm:gap-8">
          <div className="overflow-hidden sm:col-span-5">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <motion.div
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
              >
                <PlaceholderImage label={`${project.name} — IMAGE`} className="h-full w-full" />
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:col-span-7">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                {project.number} —
              </span>
              <h3 className="mt-1 font-sans text-3xl font-bold tracking-tightest transition-transform duration-500 ease-editorial group-hover:translate-x-2 sm:text-5xl">
                {project.name}
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
                {project.category} · {project.year}
              </p>
              <p className="mt-3 hidden max-w-sm text-sm text-muted sm:block">{project.oneLiner}</p>
            </div>

            <motion.span
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line"
            >
              <ArrowUpRight size={18} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
