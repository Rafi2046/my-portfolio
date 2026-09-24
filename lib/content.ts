export const site = {
  navBrand: "Rafi",
  fullName: "Ishmak Rahat Rafi",
  role: "Flutter Developer at Onesttech Software Solutions",
  headline: "Building scalable cross-platform apps with Flutter.",
  supporting:
    "I ship production mobile experiences and care deeply about architecture, performance, and strong computer-science foundations.",
  email: "ishmakrahat02@gmail.com",
  /** Place a PDF at public/resume.pdf or update this path. */
  resumeHref: "/resume.pdf",
  about: [
    "I'm a Flutter developer at Onesttech Software Solutions, contributing to live products used by real users every day.",
    "Beyond shipping features, I focus on clean architecture, offline-first patterns, and the CS fundamentals — system design and compiler concepts — that keep large codebases maintainable.",
    "I'm always looking to collaborate on open-source Flutter work and ambitious mobile products.",
  ],
  journey:
    "Curiosity about how apps are built turned into shipping Flutter products in production — with a lasting interest in architecture and the computer-science ideas underneath mobile systems.",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

/** Three curated proof points — not inflated vanity metrics. */
export const proofPoints = [
  {
    label: "Apps on stores",
    value: "3",
    detail: "Budget Mint, RUSHD, Quran Audio",
  },
  {
    label: "Current role",
    value: "Flutter",
    detail: "Onesttech Software Solutions",
  },
  {
    label: "Focus",
    value: "CS + UX",
    detail: "Architecture & compiler foundations",
  },
] as const;

export const skillGroups = [
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform product delivery",
    items: ["Flutter", "Dart", "State Management", "Firebase"],
  },
  {
    id: "systems",
    title: "Systems",
    description: "Scalable app architecture",
    items: ["System Architecture", "Offline Sync", "REST / GraphQL", "CI / CD"],
  },
  {
    id: "foundations",
    title: "Foundations",
    description: "Computer science depth",
    items: ["Compiler Design", "Data Structures", "Algorithms", "Clean Architecture"],
  },
] as const;

export type CaseStudy = {
  challenge: string;
  architecture: string;
  outcome: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  kind: "featured" | "lab";
  role?: string;
  android?: string;
  ios?: string;
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    id: "budget-mint",
    title: "Budget Mint",
    tagline: "Expense · trips · meals",
    description:
      "Expense tracking with trip splitting and meal budgeting — shipped on Android and iOS for everyday money workflows.",
    tags: ["Flutter", "Production", "Finance"],
    kind: "featured",
    role: "Developer",
    android:
      "https://play.google.com/store/apps/details?id=com.onesttech.budgetmint",
    ios: "https://apps.apple.com/us/app/budget-mint-expense-tour-meal/id6797770841",
    caseStudy: {
      challenge:
        "Users needed one place to track shared expenses, trips, and meals without spreadsheet chaos.",
      architecture:
        "Feature-oriented Flutter modules, remote-backed state, and store-ready release pipelines for Android and iOS.",
      outcome:
        "Live on Google Play and the App Store as part of Onesttech’s product lineup.",
    },
  },
  {
    id: "rushd",
    title: "RUSHD",
    tagline: "Quran Tafsir & guidance",
    description:
      "A guidance-focused Quran Tafsir experience built for clarity, calm UX, and reliable content delivery.",
    tags: ["Flutter", "Content", "i18n"],
    kind: "featured",
    role: "Team Contributor",
    android:
      "https://play.google.com/store/apps/details?id=com.onesttech.rushd&hl=en",
    ios: "https://apps.apple.com/us/app/rushd-quran-tafsir-guidance/id6758621105",
    caseStudy: {
      challenge:
        "Deliver structured religious content with a respectful, readable interface across devices.",
      architecture:
        "Flutter UI layers with content fetching, navigation patterns suited for long-form reading, and shared team ownership.",
      outcome:
        "Published on Android and iOS; ongoing contributions with the Onesttech team.",
    },
  },
  {
    id: "quran-audio",
    title: "Quran Audio",
    tagline: "Recitation & listening",
    description:
      "Quran audio recitation app focused on smooth playback and a lightweight mobile listening experience.",
    tags: ["Flutter", "Audio", "Production"],
    kind: "featured",
    role: "Team Contributor",
    android:
      "https://play.google.com/store/apps/details?id=com.quranaudio.app&hl=en",
    ios: "https://apps.apple.com/us/app/quran-audio-mp3-tilawat/id6806233147",
    caseStudy: {
      challenge:
        "Make high-quality recitation easy to browse and play with minimal friction on mobile networks.",
      architecture:
        "Flutter client with media playback flows, resilient loading states, and store distribution for both platforms.",
      outcome:
        "Available on Google Play and the App Store for daily listening.",
    },
  },
  {
    id: "flux",
    title: "Flux Architecture Kit",
    tagline: "Lab · clean architecture",
    description:
      "A modular Flutter starter exploring DI, feature modules, and production-ready folder seams.",
    tags: ["Flutter", "Clean Architecture", "DI"],
    kind: "lab",
    caseStudy: {
      challenge:
        "Large Flutter apps often collapse into tangled widgets and shared god-objects.",
      architecture:
        "Feature-first modules, explicit dependency injection, and clear domain boundaries.",
      outcome:
        "A reusable mental model and starter structure for scalable mobile codebases.",
    },
  },
  {
    id: "dartforge",
    title: "DartForge Compiler Lab",
    tagline: "Lab · lexer → bytecode",
    description:
      "A pedagogical compiler for a Dart-inspired subset — parsing, analysis, and a tiny bytecode VM.",
    tags: ["Compilers", "Dart", "CS"],
    kind: "lab",
    caseStudy: {
      challenge:
        "Compiler courses stay abstract unless you implement the pipeline end-to-end.",
      architecture:
        "Lexer → AST → semantic checks → bytecode emission into a minimal interpreter.",
      outcome:
        "Hands-on CS depth that strengthens how I reason about language tooling and app runtimes.",
    },
  },
];

export type TimelineItem = {
  id: string;
  type: "experience" | "education";
  period: string;
  title: string;
  org: string;
  summary: string;
};

/** Edit education rows with your real schools when ready. */
export const timeline: TimelineItem[] = [
  {
    id: "onesttech",
    type: "experience",
    period: "Present",
    title: "Flutter Developer",
    org: "Onesttech Software Solutions",
    summary:
      "Building and shipping cross-platform Flutter apps including Budget Mint, with contributions to RUSHD and Quran Audio.",
  },
  {
    id: "diu-cse",
    type: "education",
    period: "2022 – 2026",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Rafi2046" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ishmakrafi/" },
  { label: "Instagram", href: "https://instagram.com/ishmak_rafi" },
  { label: "Facebook", href: "https://facebook.com/ishmakrafi" },
] as const;
