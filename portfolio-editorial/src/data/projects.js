// Six placeholder case studies. Duplicate an object to add a project;
// `slug` becomes the URL (/work/:slug) and must stay unique.
export const projects = [
  {
    number: "01",
    slug: "project-one",
    name: "[PROJECT NAME]",
    category: "Web Development",
    year: "2026",
    oneLiner: "[A one-line description of the project and its outcome.]",
    role: "[YOUR ROLE, e.g. Lead Developer]",
    tools: ["[TECHNOLOGY]", "[TECHNOLOGY]", "[TECHNOLOGY]"],
    problem:
      "[Describe the problem or challenge this project set out to solve — what wasn't working, and for whom.]",
    process:
      "[Describe your process — research, iteration, key decisions, and any constraints you designed around.]",
    solution:
      "[Describe the solution you shipped and why it addressed the problem better than the alternatives you considered.]",
    result:
      "[Describe the outcome — metrics, feedback, or what changed once this shipped.]",
    imageCount: 3,
  },
  {
    number: "02",
    slug: "project-two",
    name: "[PROJECT NAME]",
    category: "UI/UX Design",
    year: "2026",
    oneLiner: "[A one-line description of the project and its outcome.]",
    role: "[YOUR ROLE, e.g. Product Designer]",
    tools: ["[TOOL]", "[TOOL]", "[TOOL]"],
    problem: "[Describe the problem or challenge this project set out to solve.]",
    process: "[Describe your process, research, and key design decisions.]",
    solution: "[Describe the solution and the reasoning behind it.]",
    result: "[Describe the outcome and impact.]",
    imageCount: 3,
  },
  {
    number: "03",
    slug: "project-three",
    name: "[PROJECT NAME]",
    category: "Creative Development",
    year: "2025",
    oneLiner: "[A one-line description of the project and its outcome.]",
    role: "[YOUR ROLE]",
    tools: ["[TECHNOLOGY]", "[TECHNOLOGY]"],
    problem: "[Describe the problem or challenge this project set out to solve.]",
    process: "[Describe your process and key technical or creative decisions.]",
    solution: "[Describe the solution you built.]",
    result: "[Describe the outcome and impact.]",
    imageCount: 4,
  },
  {
    number: "04",
    slug: "project-four",
    name: "[PROJECT NAME]",
    category: "Brand Identity",
    year: "2025",
    oneLiner: "[A one-line description of the project and its outcome.]",
    role: "[YOUR ROLE]",
    tools: ["[TOOL]", "[TOOL]"],
    problem: "[Describe the problem or challenge this project set out to solve.]",
    process: "[Describe your process — concepts explored, feedback, refinement.]",
    solution: "[Describe the identity system or solution you delivered.]",
    result: "[Describe the outcome and impact.]",
    imageCount: 3,
  },
  {
    number: "05",
    slug: "project-five",
    name: "[PROJECT NAME]",
    category: "Frontend Development",
    year: "2025",
    oneLiner: "[A one-line description of the project and its outcome.]",
    role: "[YOUR ROLE]",
    tools: ["[TECHNOLOGY]", "[TECHNOLOGY]", "[TECHNOLOGY]"],
    problem: "[Describe the problem or challenge this project set out to solve.]",
    process: "[Describe your build process and any notable engineering decisions.]",
    solution: "[Describe what you shipped.]",
    result: "[Describe the outcome — performance, adoption, or feedback.]",
    imageCount: 3,
  },
  {
    number: "06",
    slug: "project-six",
    name: "[PROJECT NAME]",
    category: "Creative Development",
    year: "2024",
    oneLiner: "[A one-line description of the project and its outcome.]",
    role: "[YOUR ROLE]",
    tools: ["[TOOL]", "[TOOL]"],
    problem: "[Describe the problem or challenge this project set out to solve.]",
    process: "[Describe your process.]",
    solution: "[Describe the solution.]",
    result: "[Describe the outcome.]",
    imageCount: 3,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
