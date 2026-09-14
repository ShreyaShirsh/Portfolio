import { Download, Github, Linkedin, Instagram } from "lucide-react";
import TextReveal from "../ui/TextReveal.jsx";
import { site } from "../../data/site.js";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span>05</span>
          <span className="h-px w-10 bg-line" />
          <span>Contact</span>
        </div>

        <a href={`mailto:${site.email}`} data-cursor="EMAIL" className="group block">
          <TextReveal
            text="LET'S WORK"
            className="text-clamp-hero font-extrabold leading-[0.9] tracking-tightest"
          />
          <TextReveal
            text="TOGETHER."
            delay={0.15}
            className="text-clamp-hero font-extrabold leading-[0.9] tracking-tightest text-muted transition-colors duration-500 group-hover:text-ink"
          />
        </a>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Email</p>
            <a href={`mailto:${site.email}`} className="link-underline text-lg">
              {site.email}
            </a>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Elsewhere</p>
            <div className="flex flex-col gap-2 text-lg">
              <a href={site.links.github} target="_blank" rel="noreferrer" className="link-underline inline-flex w-fit items-center gap-2">
                <Github size={16} /> GitHub
              </a>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="link-underline inline-flex w-fit items-center gap-2">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={site.links.instagram} target="_blank" rel="noreferrer" className="link-underline inline-flex w-fit items-center gap-2">
                <Instagram size={16} /> Instagram
              </a>
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Resume</p>
            <a
              href={site.links.resume}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <Download size={15} /> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
