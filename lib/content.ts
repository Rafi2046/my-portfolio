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
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Work" },
  { href: "/#skills", label: "Stack" },
  { href: "/#experience", label: "Experience" },
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
  /** Brand tint used behind the case-study header, any CSS color. */
  tint: string;
  icon: string;
  /** Uniform 4:3 artwork (1600×1200) shown on the card and case study. */
  cover: string;
  /** Photo of the app on a hand-held phone (transparent PNG/WebP), used as the stage centrepiece. */
  hand?: string;
  /** How the stage presents this app; defaults to fanned phones. */
  stage?: "hand" | "isometric" | "float" | "scan" | "duo" | "waves" | "fan";
  /** Cut-out UI pieces or documents floating in the stage. */
  cards?: { src: string; w: number; h: number }[];
  /** Portrait app screenshots for the case-study gallery. */
  gallery?: { src: string; width: number; height: number; alt: string }[];
  platforms: string;
  android?: string;
  ios?: string;
};

export const statusCopy: Record<Project["status"], string> = {
  live: "Live",
  building: "In development",
  prototype: "Prototype",
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
    tint: "#1f4d3c",
    icon: "/projects/rushd-icon.png",
    cover: "/projects/cover-rushd.jpg",
    hand: "/projects/hands/rushd.webp",
    stage: "hand",
    gallery: [
      { src: "/projects/phones/rushd-home.webp", width: 1144, height: 2392, alt: "Home with prayer times, Hajj guide and quick actions" },
      { src: "/projects/phones/rushd-reader.webp", width: 1144, height: 2392, alt: "Quran reader with word-by-word Bangla and English" },
      { src: "/projects/phones/rushd-quran.webp", width: 1144, height: 2392, alt: "All 114 surahs with Meccan and Medinan filters" },
      { src: "/projects/phones/rushd-hajj.webp", width: 1144, height: 2392, alt: "Hajj & Umrah guide with progress tracking" },
    ],
    platforms: "Android · iOS · Tablet",
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
    cover: "/projects/cover-budget-mint.jpg",
    stage: "duo",
    cards: [
      { src: "/projects/stage/bm-income.webp", w: 475, h: 168 },
      { src: "/projects/stage/bm-expense.webp", w: 475, h: 168 },
      { src: "/projects/stage/bm-budget.webp", w: 990, h: 435 },
    ],
    gallery: [
      { src: "/projects/phones/budget-mint-home.webp", width: 1144, height: 2392, alt: "Home with income, expenses, dues and monthly budget" },
      { src: "/projects/phones/budget-mint-transactions.webp", width: 1144, height: 2392, alt: "Monthly transactions with net balance" },
      { src: "/projects/phones/budget-mint-insights.webp", width: 1144, height: 2392, alt: "Top spending categories and budget status" },
      { src: "/projects/phones/budget-mint-reports.webp", width: 1144, height: 2392, alt: "Financial reports and statements" },
    ],
    platforms: "Android · iOS",
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
    cover: "/projects/cover-fuelsync.jpg",
    stage: "isometric",
    cards: [{ src: "/projects/stage/fs-gauge.webp", w: 540, h: 430 }],
    gallery: [
      { src: "/projects/phones/fuelsync-home.webp", width: 1144, height: 2392, alt: "Efficiency gauge with mileage, fuel and cost per km" },
      { src: "/projects/phones/fuelsync-fueling.webp", width: 1144, height: 2392, alt: "Last fill-up, savings and vehicle vitals" },
      { src: "/projects/phones/fuelsync-stats.webp", width: 1144, height: 2392, alt: "Consumption trend and monthly spending" },
    ],
    platforms: "Android",
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
    tint: "#0d1b33",
    icon: "/projects/quran-icon.png",
    cover: "/projects/cover-quran-audio.jpg",
    stage: "waves",
    cards: [{ src: "/projects/stage/quran-continue.webp", w: 995, h: 260 }],
    gallery: [
      { src: "/projects/phones/quran-home.webp", width: 1144, height: 2392, alt: "Home with your reciters and continue listening" },
      { src: "/projects/phones/quran-reciters.webp", width: 1144, height: 2392, alt: "Reciters by riwayah, region and audio translation" },
      { src: "/projects/phones/quran-library.webp", width: 1144, height: 2392, alt: "Library with favourites and collections" },
    ],
    platforms: "Android · iOS",
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
    cover: "/projects/cover-dosey.jpg",
    stage: "float",
    cards: [
      { src: "/projects/stage/dosey-next.webp", w: 970, h: 294 },
      { src: "/projects/stage/dosey-vit.webp", w: 970, h: 373 },
    ],
    gallery: [
      { src: "/projects/phones/dosey-home.webp", width: 1144, height: 2392, alt: "Today's medicine reminders" },
      { src: "/projects/phones/dosey-medicines.webp", width: 1144, height: 2392, alt: "Medicines with stock left and monthly cost" },
      { src: "/projects/phones/dosey-reminders.webp", width: 1144, height: 2392, alt: "All reminders with on/off toggles" },
      { src: "/projects/phones/dosey-cost.webp", width: 1144, height: 2392, alt: "Projected monthly medicine cost" },
    ],
    platforms: "Android · iOS",
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
    cover: "/projects/cover-docyra.jpg",
    stage: "scan",
    cards: [
      { src: "/projects/stage/doc-invoice.webp", w: 636, h: 900 },
      { src: "/projects/stage/doc-receipt.webp", w: 636, h: 900 },
      { src: "/projects/stage/doc-idcard.webp", w: 636, h: 900 },
    ],
    gallery: [
      { src: "/projects/phones/docyra-home.webp", width: 1144, height: 2392, alt: "Home with quick tools and recent files" },
      { src: "/projects/phones/docyra-files.webp", width: 1144, height: 2392, alt: "Library with folders and filters" },
      { src: "/projects/phones/docyra-tools.webp", width: 1144, height: 2392, alt: "Offline toolkit: scan, OCR, ID cards, PDF edit" },
      { src: "/projects/phones/docyra-document.webp", width: 1144, height: 2392, alt: "Document pages with edit, PDF and OCR actions" },
      { src: "/projects/phones/docyra-preview.webp", width: 1144, height: 2392, alt: "Full-page preview of a scanned invoice" },
      { src: "/projects/phones/docyra-account.webp", width: 1144, height: 2392, alt: "Account with storage stats and scanner settings" },
    ],
    platforms: "Android · iOS",
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
    tint: "#14361f",
    icon: "/projects/ayurvision-icon.png",
    cover: "/projects/cover-ayurvision.jpg",
    gallery: [
      { src: "/projects/phones/ayurvision-home.webp", width: 560, height: 1143, alt: "Home with scan, upload and herb of the day" },
    ],
    platforms: "Android",
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

/** How I work, shown as the Plan → Build → Ship sequence. */
export const process = [
  {
    word: "Plan",
    text: "I start from the people using the app: the flows they repeat every day, the data that must survive offline, and the languages they read in. Then I set the architecture before writing screens.",
    image: "/projects/phones/fuelsync-home.webp",
  },
  {
    word: "Build",
    text: "Feature by feature in Flutter, with Riverpod state, Drift or Firebase storage and tests next to the code. Every screen is checked on real phones and tablets, in English and Bangla.",
    image: "/projects/phones/rushd-home.webp",
  },
  {
    word: "Ship",
    text: "Store listings, release builds and a growth phase after launch: crash reports, rating prompts, faster start-up. Four of my apps are live on Google Play and the App Store.",
    image: "/projects/phones/dosey-home.webp",
  },
] as const;

/** Rows for the experience panel, newest first. */
export const experienceRows = [
  { org: "Onesttech Software Solutions", role: "Flutter Developer", period: "Present" },
  { org: "ESDANA", role: "Alumni-network app · built from scratch", period: "Sep – Oct 2026" },
  { org: "Al Quran Majeed", role: "Quran audio streaming · 121 commits", period: "Aug – Sep 2026" },
  { org: "Website Monitor", role: "Uptime & domain monitoring · built from scratch", period: "Jun – Sep 2026" },
  { org: "RUSHD", role: "Islamic lifestyle app · 232 commits, v3.6.0", period: "Apr – Sep 2026" },
  { org: "Daffodil International University", role: "BSc in Computer Science & Engineering", period: "2022 – 2026" },
] as const;
