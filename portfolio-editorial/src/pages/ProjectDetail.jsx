import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getAdjacentProjects, getProjectBySlug } from "../data/projects.js";
import TextReveal from "../components/ui/TextReveal.jsx";
import ImageReveal from "../components/ui/ImageReveal.jsx";
import PlaceholderImage from "../components/ui/PlaceholderImage.jsx";
import { fadeUp, pageTransition, staggerContainer, viewportOnce } from "../lib/motion.js";

const META_FIELDS = (project) => [
  { label: "Role", value: project.role },
  { label: "Tools", value: project.tools.join(", ") },
  { label: "Year", value: project.year },
  { label: "Category", value: project.category },
];

const STORY_SECTIONS = (project) => [
  { label: "Problem", body: project.problem },
  { label: "Process", body: project.process },
  { label: "Solution", body: project.solution },
  { label: "Result", body: project.result },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      <article className="px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-[1600px]">
          <Link
            to="/#work"
            data-cursor="BACK"
            className="link-underline mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
          >
            <ArrowLeft size={13} />
            Back to work
          </Link>

          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            {project.number} — {project.category} · {project.year}
          </div>

          <h1>
            <TextReveal
              text={project.name}
              className="text-clamp-h1 font-extrabold leading-[0.95] tracking-tightest"
            />
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{project.oneLiner}</p>

          <ImageReveal className="mt-16 aspect-[16/9] w-full">
            <PlaceholderImage label={`${project.name} — HERO IMAGE`} className="h-full w-full" />
          </ImageReveal>

          <div className="mt-16 grid grid-cols-2 gap-8 border-y border-line py-10 sm:grid-cols-4">
            {META_FIELDS(project).map((field) => (
              <div key={field.label}>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">{field.label}</p>
                <p className="text-sm sm:text-base">{field.value}</p>
              </div>
            ))}
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16"
          >
            {STORY_SECTIONS(project).map((section) => (
              <motion.div key={section.label} variants={fadeUp}>
                <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">{section.label}</h2>
                <p className="text-lg leading-relaxed">{section.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: project.imageCount }).map((_, i) => (
              <ImageReveal
                key={i}
                delay={i * 0.08}
                className={`aspect-[4/3] w-full ${i === 0 ? "sm:col-span-2 sm:aspect-[16/9]" : ""}`}
              >
                <PlaceholderImage label={`${project.name} — IMAGE ${i + 1}`} className="h-full w-full" />
              </ImageReveal>
            ))}
          </div>
        </div>
      </article>

      <nav className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
        <Link
          to={`/work/${prev.slug}`}
          data-cursor="PREV"
          className="group flex flex-col gap-2 border-b border-line px-6 py-12 sm:border-b-0 sm:border-r sm:px-10 sm:py-16"
        >
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <ArrowLeft size={13} /> Previous
          </span>
          <span className="text-2xl font-bold tracking-tightest transition-transform duration-500 ease-editorial group-hover:-translate-x-2 sm:text-4xl">
            {prev.name}
          </span>
        </Link>

        <Link
          to={`/work/${next.slug}`}
          data-cursor="NEXT"
          className="group flex flex-col items-start gap-2 px-6 py-12 sm:items-end sm:px-10 sm:py-16 sm:text-right"
        >
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            Next <ArrowRight size={13} />
          </span>
          <span className="flex items-center gap-2 text-2xl font-bold tracking-tightest transition-transform duration-500 ease-editorial group-hover:translate-x-2 sm:text-4xl">
            {next.name}
            <ArrowUpRight size={22} className="hidden sm:block" />
          </span>
        </Link>
      </nav>
    </motion.div>
  );
}
