# [YOUR NAME] — Editorial Portfolio

A minimal, black-and-white, typography-driven portfolio built with React,
Tailwind CSS, Framer Motion, and React Router. Inspired by the restraint
and confidence of studio sites like heatbureau.com — original layout,
copy, and interactions throughout, with every piece of personal
information left as an obvious placeholder for you to replace.

## Stack

- **Vite + React 18** — build tooling and UI
- **React Router** — client-side routing (`/` and `/work/:slug` case studies)
- **Tailwind CSS** — styling, editorial type scale, thin-line grid system
- **Framer Motion** — text/image reveal animations, page transitions, scroll reveals
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev
```

`npm run build` produces a production build in `dist/`; `npm run preview`
serves that build locally.

## Everything you need to edit is in `src/data/`

- **`site.js`** — your name, roles, status line, bio paragraphs, email,
  and social links. Every field is a bracketed placeholder like
  `[YOUR NAME]` or `[YOUR EMAIL]` — replace the text, keep the structure.
- **`projects.js`** — six placeholder case studies (`01`–`06`). Each has a
  unique `slug` (becomes its URL, e.g. `/work/project-one`), plus problem/
  process/solution/result copy for its detail page and an `imageCount`
  controlling how many image blocks render there. Duplicate an object to
  add a project, delete one to remove it — the work grid and the
  previous/next navigation on detail pages both update automatically.
- **`skills.js`** — the list rendered in "What I Do."
- **`experience.js`** — the timeline entries in "Experience & Education."

Images are intentionally left as labeled placeholder blocks
(`src/components/ui/PlaceholderImage.jsx`) rather than stock photos —
swap them for real `<img>` tags once you have assets; the surrounding
aspect-ratio containers and reveal animations already fit around them.

## Structure

```
src/
  components/
    layout/     Navbar, Footer
    cursor/     CustomCursor (desktop-only, fine-pointer + motion-OK)
    texture/    Grain (film-grain overlay)
    ui/         TextReveal, ImageReveal, PlaceholderImage — shared primitives
    home/       Hero, About, Work, ProjectCard, Skills, Experience, Contact,
                AbstractGraphic (the animated hero line-art)
  pages/        Home.jsx, ProjectDetail.jsx, NotFound.jsx
  data/         site.js, projects.js, skills.js, experience.js — edit these
  hooks/        usePrefersReducedMotion, useIsFinePointer
  lib/          motion.js — shared Framer Motion variants
```

## Interactions

- **Custom cursor** — a ring that follows the pointer with a light spring
  lag, expanding into a labeled circle ("VIEW", "BACK", "EMAIL", ...) over
  interactive elements (`data-cursor="..."` attribute). Only mounts on
  fine-pointer, motion-OK devices — touch devices and
  `prefers-reduced-motion` both get the plain system cursor.
- **Text reveal** — headlines split into words and rise into view on
  scroll/mount, staggered (`TextReveal.jsx`).
- **Image reveal** — a solid curtain wipes away while the image
  eases down from a slight over-scale (`ImageReveal.jsx`), used on the
  hero portrait and every project image.
- **Project cards** — image scales on hover, title nudges sideways, an
  arrow badge follows the cursor within the card, and the whole row is a
  link to that project's case-study page.
- **Page transitions** — route changes cross-fade via
  `AnimatePresence`/`framer-motion`, and each project page scrolls to top
  on navigation.
- Everything above respects `prefers-reduced-motion`: the custom cursor
  doesn't mount, and a global CSS rule collapses animation/transition
  durations.

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import the repo in Vercel — it auto-detects Vite (`npm run build`,
   output directory `dist`). `vercel.json` is included so client-side
   routes (`/work/:slug`) resolve correctly on refresh/direct load.
3. Deploy.
