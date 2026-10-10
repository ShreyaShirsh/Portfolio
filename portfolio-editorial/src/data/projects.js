// Six placeholder case studies. Duplicate an object to add a project;
// `slug` becomes the URL (/work/:slug) and must stay unique.
export const projects = [
  {
    number: "01",
    slug: "diagnosure",
    name: "DIAGNOSURE",
    category: "AI / Web Development",
    year: "2026",
    oneLiner: "An AI-powered health assistant that analyzes symptoms using semantic search to provide explainable condition matches, risk levels, precautions, and personalized diet guidance",
    role: "Full-Stack Developer",
    tools: ["Python", "Django REST Framework", "FAISS", "Sentence-Transformers", "JavaScript"],
    problem: [
      "The initial frontend provided a complete-looking interface but lacked a functional symptom-analysis engine. Simple keyword matching could miss synonyms, overlook relevant symptoms, and return poorly ranked conditions. The challenge was to build a backend that could interpret symptoms described in plain language, identify relevant conditions, and explain its results."],
    process: [
      "Designed a symptom-analysis engine backed by a structured JSON knowledge base of medical conditions. Converted symptom descriptions into searchable numerical representations and used FAISS for semantic similarity search, with Sentence-Transformers embeddings when available and TF-IDF as a lightweight fallback. Combined semantic similarity with literal symptom matching to rank candidates and explain the results. Incorporated symptom severity, duration, and warning signs into risk assessment, and integrated the engine with a Django REST API and frontend."],
    solution: [
      "Built a full-stack health assistant that accepts symptoms in natural language and returns ranked possible conditions, match percentages, risk levels, matched symptoms, precautions, and diet guidance. Added account registration and login, family-member management, assessment history, and downloadable PDF reports. Included an optional LangChain-based explanation layer that is disabled by default."],
    result: [
      "Developed an end-to-end symptom-assessment workflow with explainable results, semantic symptom matching, a TF-IDF fallback, and persistent assessment history. Users can review previous assessments and export reports as PDFs. The match percentage represents relative ranking confidence, not a medically validated probability; the project is intended for educational and informational use, not diagnosis."],
    imageCount: 3,
  },
  {
    number: "02",
    slug: "ticketsurge",
    name: "TicketSurge",
    category: "Backend / Distributed Systems",
    year: "2026",
    oneLiner: "An event-driven ticketing platform designed to prevent seat overselling during flash sales using concurrency-safe bookings, asynchronous processing, and real-time seat updates.",
    role: "Full-Stack Developer",
    tools: ["Python", "Django REST Framework", "PostgreSQL", "Redis", "RabbitMQ", "Celery", "React", "Django Channels", "Docker", "Locust"],
    problem: ["Traditional read-check-write booking flows can allow multiple users to purchase the same last available seat when requests arrive simultaneously. The challenge was to guarantee seat availability remains consistent under high concurrency without making the booking request wait for the entire payment and ticket-generation workflow."],
    process: ["Designed a concurrency-safe booking workflow using short-lived Redis seat holds, database row-level locking, and atomic conditional updates. Implemented idempotency keys to handle retries, RabbitMQ and Celery for asynchronous booking workflows, and the saga pattern with compensating actions for failures. Added Django Channels WebSockets for real-time seat-status updates and used pytest and Locust to validate correctness and load behavior."],
    solution: ["Built a full-stack ticket-booking application with a React seat-selection interface and Django REST API. Integrated Redis-based seat holds, transactional booking confirmation, asynchronous payment and ticket-processing steps, failure recovery, and WebSocket updates. Added automated tests for booking flows and concurrency, Docker Compose for running the services, and a Locust-based flash-sale load test."],
    result: ["Verified 15 automated tests against PostgreSQL, including real-thread concurrency tests. In a Locust test simulating 250 concurrent users competing for 40 seats, the system recorded exactly 40 confirmed bookings, zero overselling, and zero unexpected errors across 2,093 confirmation attempts. Identified and addressed a database connection-exhaustion bottleneck during load testing. The React frontend builds cleanly, although browser-level UI testing and public deployment have not been completed."],
    imageCount: 3,
  },
  {
    number: "03",
    slug: "exoplanet-detection",
    name: "Exoplanet Transit Detector",
    category: "Machine Learning / Data Science",
    year: "2026",
    oneLiner: "An end-to-end ML pipeline that detects and classifies exoplanet transits from noisy TESS light curves, with an interactive web app.",
    role: "Solo developer — data pipeline, ML modeling, and deployment",
    tools: ["Python", "lightkurve", "Transit Least Squares", "scikit-learn", "SHAP", "Streamlit"],
    problem: ["Finding exoplanets in TESS light curves means spotting tiny, periodic dips in a star's brightness — signals easily mimicked by eclipsing binaries, starspots, and detector noise, and buried in crowded, contaminated data. Telling a real planet apart from these impostors at scale is the core challenge."],
    process: ["Built the pipeline in stages: ingest and normalize TESS light curves via lightkurve, detrend stellar variability with a robust biweight filter, and detect periodic dips using Transit Least Squares. Engineered physics-informed features (secondary-eclipse ratio, odd-even depth difference, transit shape) so each decision maps to a real astrophysical cause, and manufactured labeled training data by injecting known synthetic transits into quiet stars — solving the lack of ground-truth labels."],
    solution: ["A calibrated Random Forest classifies each signal as planet, eclipsing binary, or noise, with SHAP explaining every prediction in plain physical terms and calibrated probabilities giving trustworthy confidence. A batch runner processes many stars into a results catalog, and an interactive Streamlit app lets anyone analyze a star by its TESS ID."],
    result: ["Validated with synthetic injection-recovery to quantify detection completeness across planet size and orbital period. The pipeline produces explainable, confidence-scored classifications on real TESS data and surfaces its own limitations (e.g. shallow-transit sensitivity) — an honest, interpretable alternative to black-box detectors."],
    imageCount: 4,
  },
  {
    number: "04",
    slug: "citefrontier",
    name: "CiteFrontier",
    category: "AI / Information Retrieval",
    year: "2026",
    oneLiner: "A streaming, non-generative RAG prototype that decomposes multi-intent questions, retrieves evidence early, and delivers source-verifiable answers with exact citations and explicit abstention.",
    role: "AI / Backend Developer",
    tools: ["Python", "DistilBERT", "spaCy", "BM25", "MiniLM", "FAISS", "Cross-Encoder Reranking", "WebSockets", "Docker"],
    problem: [
      "Conventional retrieval-based question answering can wait until a transcript is complete, struggle with disfluent or compound questions, and return stale or unsupported answers when a user corrects their input. The challenge was to build a streaming retrieval system that identifies separate intents early, handles transcript revisions safely, and ensures every factual answer is supported by the active source corpus."
    ],
    process: [
      "Implemented a streaming pipeline that processes timestamped transcript updates and triggers retrieval when an intent becomes stable. Integrated a locally trained DistilBERT intent-boundary tagger in guarded auto mode, with spaCy dependency rules as a fallback. Added parallel per-intent retrieval, hybrid BM25/MiniLM search, cross-encoder reranking, final-transcript revalidation, session-generation tracking to reject stale asynchronous results, and versioned claim updates that preserve unaffected answers during refinement."
    ],
    solution: [
      "Built a local, non-generative Streaming Live RAG application that decomposes compound questions into independent intents and retrieves exact text extracts from the active corpus. Each supported claim includes verifiable source citations, while unsupported questions receive an explicit abstention. Added a WebSocket interface for live transcript processing, correction handling, retrieval traces, citation inspection, validation results, and session-specific organizer document uploads with labeled benchmark evaluation."
    ],
    result: [
      "Achieved 60/60 reproducible replay scenarios, 37/40 eligible early retrieval cases (92.5%), 15/15 compound-intent identification cases (100%), and 90/90 supported extracts (100%), with zero fabricated citation IDs and 985/985 trace-coverage checks passing. Verified 58 prototype tests, 13 core tests, and 60/60 cases through the Docker WebSocket endpoint. Results come from the project's disclosed synthetic control corpus and local acceptance suite; independent benchmarking and official organizer-corpus validation remain pending."
    ],
    imageCount: 3,
  },
  // {
  //   number: "05",
  //   slug: "project-five",
  //   name: "[PROJECT NAME]",
  //   category: "Frontend Development",
  //   year: "2025",
  //   oneLiner: "[A one-line description of the project and its outcome.]",
  //   role: "[YOUR ROLE]",
  //   tools: ["[TECHNOLOGY]", "[TECHNOLOGY]", "[TECHNOLOGY]"],
  //   problem: "[Describe the problem or challenge this project set out to solve.]",
  //   process: "[Describe your build process and any notable engineering decisions.]",
  //   solution: "[Describe what you shipped.]",
  //   result: "[Describe the outcome — performance, adoption, or feedback.]",
  //   imageCount: 3,
  // },
  // {
  //   number: "06",
  //   slug: "project-six",
  //   name: "[PROJECT NAME]",
  //   category: "Creative Development",
  //   year: "2024",
  //   oneLiner: "[A one-line description of the project and its outcome.]",
  //   role: "[YOUR ROLE]",
  //   tools: ["[TOOL]", "[TOOL]"],
  //   problem: "[Describe the problem or challenge this project set out to solve.]",
  //   process: "[Describe your process.]",
  //   solution: "[Describe the solution.]",
  //   result: "[Describe the outcome.]",
  //   imageCount: 3,
  // },
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
