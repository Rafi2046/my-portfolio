export const site = {
  navBrand: "Rafi",
  fullName: "Ishmak Rahat Rafi",
  role: "Flutter Developer at Onesttech Software Solutions",
  headline: "I build mobile apps people open every day.",
  supporting:
    "Flutter developer shipping production iOS and Android apps — from Quran audio streaming and AI-assisted learning to offline-first finance, fuel and health tools.",
  email: "ishmakrahat02@gmail.com",
  /** Place a PDF at public/resume.pdf or update this path. */
  resumeHref: "/resume.pdf",
  about: [
    "I'm a Flutter developer at Onesttech Software Solutions in Dhaka. Most of my day goes into products that are already in people's hands — RUSHD, Al Quran Majeed, Budget Mint and FuelSync are all live on the stores.",
    "I like owning an app end to end: architecture, offline storage, background audio and alarms, localization in English and Bangla, tests, and the store release at the end of it.",
    "Outside work I build my own apps — a medicine reminder with family sharing, an offline document scanner, and an on-device herb identifier — to push into areas like ML Kit, TensorFlow Lite and Supabase.",
  ],
  journey:
    "Curiosity about how apps are built turned into shipping Flutter products in production, with a lasting interest in clean architecture and the computer-science ideas underneath mobile systems.",
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
] as const;

/** Figures from the April – October 2026 work report (own commits only). */
export const proofPoints = [
  {
    value: "436",
    label: "Commits in six months",
    detail: "8 Apr – 8 Oct 2026, across four production apps",
  },
  {
    value: "4",
    label: "Apps live on the stores",
    detail: "RUSHD, Al Quran Majeed, Budget Mint, FuelSync",
  },
  {
    value: "10+",
    label: "Feature modules added to RUSHD",
    detail: "AI assistant, Word Battle, Hadith library, recitation check",
  },
  {
    value: "EN · বাংলা",
    label: "Fully localized",
    detail: "Every app ships in English and Bangla",
  },
] as const;

export const stackMarquee = [
  "Flutter",
  "Dart",
  "Riverpod",
  "Drift / SQLite",
  "Firebase",
  "Supabase",
  "ML Kit",
  "TensorFlow Lite",
  "OpenCV",
  "just_audio",
  "REST APIs",
  "Integration tests",
  "App Store & Play release",
] as const;

export const skillGroups = [
  {
    id: "mobile",
    title: "Mobile",
    description: "Cross-platform product delivery",
    items: [
      "Flutter & Dart",
      "Riverpod · Provider",
      "Responsive phone & tablet UI",
      "Background audio & alarms",
      "Home-screen widgets",
    ],
  },
  {
    id: "data",
    title: "Data & backend",
    description: "Offline-first and synced",
    items: [
      "Drift · Hive · SQLite",
      "Firebase Auth, Firestore, FCM",
      "Supabase (RLS, Realtime, Edge Functions)",
      "REST integration with Dio",
      "Encrypted on-device storage",
    ],
  },
  {
    id: "ml",
    title: "On-device ML",
    description: "Smart features without a server",
    items: [
      "Google ML Kit OCR & scanning",
      "TensorFlow Lite classification",
      "OpenCV edge detection",
      "Passport MRZ parsing",
      "Speech & recitation checking",
    ],
  },
  {
    id: "quality",
    title: "Shipping",
    description: "From commit to store",
    items: [
      "Unit, widget & integration tests",
      "EN / Bangla localization",
      "Crashlytics & Analytics",
      "Store listings & release",
      "Clean architecture",
    ],
  },
] as const;

export type ProjectMedia =
  | { kind: "banner"; src: string; width: number; height: number }
  | { kind: "phone"; src: string; width: number; height: number }
  | { kind: "icon" }
  | { kind: "collage"; srcs: string[] };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tags: string[];
  ownership: "personal" | "team";
  /** Short line about my part, shown on the card. */
  role: string;
  status: "live" | "building" | "prototype";
  /** Spans both grid columns with media beside the copy. */
  wide?: boolean;
  /** Brand tint for the media panel, any CSS color. */
  tint: string;
  icon: string;
  media: ProjectMedia;
  android?: string;
  ios?: string;
};

export const projects: Project[] = [
  {
    id: "rushd",
    title: "RUSHD",
    tagline: "Islamic lifestyle app",
    description:
      "Quran reader, prayer times, Hajj & Umrah guide, an AI assistant and learning games in one app. My largest project of 2026 — I took it to version 3.6.0.",
    highlights: [
      "Ask Noor AI assistant with conversation history, usage limits and voice playback",
      "Word Battle — a live two-player vocabulary game with lobbies, room codes and ranks",
      "Recitation checking that records the user and compares it with the ayah",
      "Hadith library, Islamic Quiz, 99 Names, six Arabic learning games, tablet layouts",
    ],
    tags: ["Flutter", "AI", "Realtime", "Audio", "EN / BN"],
    ownership: "team",
    role: "Team project · 232 commits, 10+ modules",
    status: "live",
    wide: true,
    tint: "#1f4d3c",
    icon: "/projects/rushd-icon.png",
    media: {
      kind: "phone",
      src: "/projects/rushd-screen.jpg",
      width: 600,
      height: 1250,
    },
    android:
      "https://play.google.com/store/apps/details?id=com.onesttech.rushd&hl=en",
    ios: "https://apps.apple.com/us/app/rushd-quran-tafsir-guidance/id6758621105",
  },
  {
    id: "budget-mint",
    title: "Budget Mint",
    tagline: "Expenses · trips · mess meals",
    description:
      "Personal finance that also handles the messy shared parts — split trip costs with friends and run a shared mess meal budget.",
    highlights: [
      "Trip splitting, mess meal management, savings goals and recurring bills",
      "PDF & Excel reports with correct Bangla rendering",
      "Firebase sync, Google & Apple sign-in, biometric lock, home widgets",
    ],
    tags: ["Flutter", "Firebase", "Finance"],
    ownership: "personal",
    role: "Built end to end",
    status: "live",
    tint: "#0f3b2e",
    icon: "/projects/budget-mint-icon.png",
    media: {
      kind: "banner",
      src: "/projects/budget-mint-1.png",
      width: 1024,
      height: 500,
    },
    android:
      "https://play.google.com/store/apps/details?id=com.onesttech.budgetmint",
    ios: "https://apps.apple.com/us/app/budget-mint-expense-tour-meal/id6797770841",
  },
  {
    id: "fuelsync",
    title: "FuelSync",
    tagline: "Mileage · trips · service",
    description:
      "An offline-first fuel log and mileage tracker that keeps every vehicle's running costs, trips and service history in one place.",
    highlights: [
      "Efficiency dashboard, spend charts and exportable vehicle reports",
      "Trip maps, service reminders and a document vault per vehicle",
      "Receipt OCR with ML Kit and weather-aware ride advice",
    ],
    tags: ["Flutter", "Drift", "Maps", "ML Kit"],
    ownership: "personal",
    role: "Built end to end",
    status: "live",
    tint: "#3a1a0c",
    icon: "/projects/fuelsync-icon.png",
    media: {
      kind: "banner",
      src: "/projects/fuelsync-feature.jpg",
      width: 1024,
      height: 499,
    },
    android:
      "https://play.google.com/store/apps/details?id=com.onesttech.fuelsync",
  },
  {
    id: "quran-audio",
    title: "Al Quran Majeed",
    tagline: "Quran audio & tilawat",
    description:
      "A Quran audio streaming app with 260+ reciters, playlists, podcasts and Islamic stories. Took it from the first commit to its store-growth phase in six weeks.",
    highlights: [
      "Background playback, sleep timer, Khatam tracking and listening stats",
      "Stream caching and a fallback audio source so playback survives weak networks",
      "Podcasts, stories, devotions hub, offline downloads and multiple languages",
    ],
    tags: ["Flutter", "just_audio", "Streaming", "i18n"],
    ownership: "team",
    role: "Team project · 121 commits in six weeks",
    status: "live",
    wide: true,
    tint: "#0d1b33",
    icon: "/projects/quran-icon.png",
    media: {
      kind: "banner",
      src: "/projects/quran-feature.jpg",
      width: 1024,
      height: 500,
    },
    android:
      "https://play.google.com/store/apps/details?id=com.quranaudio.app&hl=en",
    ios: "https://apps.apple.com/us/app/quran-audio-mp3-tilawat/id6806233147",
  },
  {
    id: "dosey",
    title: "Dosey",
    tagline: "Medicine reminder · family care",
    description:
      "A medicine reminder whose alarms really ring — full-screen, even with the app closed — with a caregiver mode so family can follow your doses.",
    highlights: [
      "Prescription scanning fills in medicines and the doctor from a photo",
      "Family Sharing on Supabase with row-level security and Realtime",
      "Offline-first Drift database, BP & sugar logs, stock and cost tracking",
    ],
    tags: ["Flutter", "Supabase", "Drift", "Alarms"],
    ownership: "personal",
    role: "Built end to end",
    status: "building",
    tint: "#1d3a35",
    icon: "/projects/dosey-icon.png",
    media: {
      kind: "phone",
      src: "/projects/dosey-screen.jpg",
      width: 495,
      height: 1100,
    },
  },
  {
    id: "docyra",
    title: "Docyra",
    tagline: "Offline document & ID scanner",
    description:
      "A CamScanner-style scanner that never uploads your documents. Scan, clean up, OCR and edit PDFs entirely on the phone.",
    highlights: [
      "Live edge detection with ML Kit and OpenCV, plus ID card A4 layouts",
      "OCR and passport MRZ parsing on device",
      "PDF tools: merge, compress, sign, watermark, page numbers — behind an app lock",
    ],
    tags: ["Flutter", "OpenCV", "ML Kit", "PDF"],
    ownership: "personal",
    role: "Built end to end",
    status: "building",
    tint: "#0c1e3d",
    icon: "/projects/docyra-icon.png",
    media: { kind: "icon" },
  },
  {
    id: "ayurvision",
    title: "AyurVision",
    tagline: "AI medicinal herb identifier",
    description:
      "Point the camera at a leaf and get the herb, its confidence score and its medicinal uses — fully offline with TensorFlow Lite.",
    highlights: [
      "On-device TFLite image classification with confidence scoring",
      "Herb library with detailed medicinal properties",
      "Scan history and favourites stored locally with Hive",
    ],
    tags: ["Flutter", "TensorFlow Lite", "Hive"],
    ownership: "personal",
    role: "ML project",
    status: "prototype",
    wide: true,
    tint: "#14361f",
    icon: "/projects/ayurvision-icon.png",
    media: {
      kind: "collage",
      srcs: [
        "/projects/herb-hibiscus.jpg",
        "/projects/herb-arjun.jpg",
        "/projects/herb-curry-leaf.jpg",
      ],
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
  highlights?: { name: string; detail: string }[];
};

export const timeline: TimelineItem[] = [
  {
    id: "onesttech",
    type: "experience",
    period: "Present",
    title: "Flutter Developer",
    org: "Onesttech Software Solutions",
    summary:
      "Building and shipping cross-platform Flutter apps for iOS and Android. Between April and October 2026: 436 commits over 78 working days across four apps, three of them started from scratch.",
    highlights: [
      {
        name: "RUSHD",
        detail: "232 commits · AI assistant, games, Hadith library, v3.6.0",
      },
      {
        name: "Al Quran Majeed",
        detail: "121 commits · first commit to store growth in six weeks",
      },
      {
        name: "ESDANA",
        detail: "49 commits · alumni-network app built in three weeks",
      },
      {
        name: "Website Monitor",
        detail: "34 commits · on-device uptime, API, SSL & domain checks",
      },
    ],
  },
  {
    id: "diu-cse",
    type: "education",
    period: "2022 – 2026",
    title: "BSc in Computer Science & Engineering",
    org: "Daffodil International University",
    summary:
      "Software engineering fundamentals — data structures, algorithms, system design and compiler concepts — that underpin how I structure production Flutter apps.",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Rafi2046" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ishmakrafi/" },
  { label: "Instagram", href: "https://instagram.com/ishmak_rafi" },
  { label: "Facebook", href: "https://facebook.com/ishmakrafi" },
] as const;
