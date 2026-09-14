import { site } from "../../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-ink">
          {site.initials} / {site.name}
        </span>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted">
          <a href={site.links.github} target="_blank" rel="noreferrer" className="link-underline">
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="link-underline">
            LinkedIn
          </a>
          <a href={site.links.instagram} target="_blank" rel="noreferrer" className="link-underline">
            Instagram
          </a>
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {site.location} — © {year}
        </span>
      </div>
    </footer>
  );
}
