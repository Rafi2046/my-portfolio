export const site = {
  navBrand: "Rafi",
  fullName: "Ishmak Rahat Rafi",
  role: "Flutter Developer at Onesttech Software Solutions",
  headline: "Building scalable cross-platform apps with Flutter.",
  supporting:
    "I ship production mobile experiences and care deeply about architecture, performance, and strong computer-science foundations.",
  email: "hello@example.com",
  about: [
    "I'm a Flutter developer at Onesttech Software Solutions, contributing to live products used by real users every day.",
    "Beyond shipping features, I focus on clean architecture, offline-first patterns, and the CS fundamentals — system design and compiler concepts — that keep large codebases maintainable.",
    "I'm always looking to collaborate on open-source Flutter work and ambitious mobile products.",
  ],
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export const skills = [
  { name: "Flutter", emphasis: true },
  { name: "Dart", emphasis: true },
  { name: "System Architecture", emphasis: true },
  { name: "Compiler Design", emphasis: true },
  { name: "State Management", emphasis: false },
  { name: "Firebase", emphasis: false },
  { name: "REST / GraphQL", emphasis: false },
  { name: "CI / CD", emphasis: false },
] as const;

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "flux",
    title: "Flux Architecture Kit",
    tagline: "Modular Flutter clean architecture",
    description:
      "A feature-first starter with dependency injection, clear domain boundaries, and scalable module seams for production Flutter apps.",
    tags: ["Flutter", "Clean Architecture", "DI"],
  },
  {
    id: "dartforge",
    title: "DartForge Compiler Lab",
    tagline: "Lexer → AST → bytecode",
    description:
      "A pedagogical compiler for a Dart-inspired subset — exploring parsing, semantic analysis, and a tiny bytecode VM.",
    tags: ["Compilers", "Dart", "CS"],
  },
  {
    id: "nimbus",
    title: "Nimbus Sync Engine",
    tagline: "Offline-first conflict resolution",
    description:
      "A sync layer that queues local writes, reconciles remote changes, and surfaces conflict policies designed for mobile networks.",
    tags: ["Sync", "Offline-first", "Architecture"],
  },
  {
    id: "pulse",
    title: "Pulse Design System",
    tagline: "Cross-platform Flutter UI kit",
    description:
      "Token-driven components, theming, and motion guidelines so product teams ship cohesive Flutter interfaces faster.",
    tags: ["Design System", "Flutter", "Theming"],
  },
];

export type LiveApp = {
  name: string;
  description: string;
  role: string;
  android?: string;
  ios?: string;
};

export const liveApps: LiveApp[] = [
  {
    name: "Budget Mint",
    description: "Expense tracking, trip splitting & meal budgeting",
    role: "Developer",
    android:
      "https://play.google.com/store/apps/details?id=com.onesttech.budgetmint",
    ios: "https://apps.apple.com/us/app/budget-mint-expense-tour-meal/id6797770841",
  },
  {
    name: "RUSHD",
    description: "Quran Tafsir & guidance app",
    role: "Team Contributor",
    android:
      "https://play.google.com/store/apps/details?id=com.onesttech.rushd&hl=en",
    ios: "https://apps.apple.com/us/app/rushd-quran-tafsir-guidance/id6758621105",
  },
  {
    name: "Quran Audio",
    description: "Quran audio recitation app",
    role: "Team Contributor",
    android:
      "https://play.google.com/store/apps/details?id=com.quranaudio.app&hl=en",
    ios: "https://apps.apple.com/us/app/quran-audio-mp3-tilawat/id6806233147",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Rafi2046" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ishmakrafi/" },
  { label: "Instagram", href: "https://instagram.com/ishmak_rafi" },
  { label: "Facebook", href: "https://facebook.com/ishmakrafi" },
] as const;
