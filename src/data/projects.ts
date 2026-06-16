import { Project } from "@/src/types/portfolio";

export const projects: Project[] = [
  {
    id: "bem-petra",
    title: "BEM Petra Official Website",
    description:
      "An interactive, high-performance web portal for Petra Christian University's Student Executive Board.",
    longDescription:
      "A collaborative group project to build a digital hub for BEM Petra (LIFT Cabinet). The platform blends smooth animations with real-time data to showcase the cabinet's vision, members, events, and student units (UKM). I took full ownership of the full-stack development, bridging Creative team designs with a robust backend to ensure a responsive, immersive experience.",
    contributions: [
      "Lead Full-Stack Developer",
      "Architected the full-stack ecosystem connecting Next.js frontend with Laravel backend",
      "Implemented Next.js App Router, SSR, and ISR for optimal performance and SEO",
      "Developed interactive 3D elements and mascot animations",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "Tailwind CSS",
      "GSAP",
    ],
    githubUrl: "",
    liveUrl: "",
    folderUrl: "/assets/project/bem-main",
    imageFallbackColor: "#275f6c",
  },
  {
    id: "lombanesia",
    title: "Lombanesia",
    description:
      "Competition management and discovery marketplace for Indonesian students.",
    longDescription:
      "A centralized marketplace bridging organizers and participants. The platform provides verified, subscription-based tools for organizers and advanced filtering for students to discover competitions.",
    contributions: [
      "Lead Full-Stack Developer & PIC for interns",
      "Architected backend infrastructure and developed the complete admin dashboard",
      "Developed frontend user pages and implemented secure payment verification workflows",
      "Implemented Role-Based Access Control (RBAC) using Spatie Laravel Permission",
    ],
    techStack: [
      "Laravel",
      "Livewire",
      "Alpine.js",
      "Tailwind CSS",
      "MySQL",
      "Spatie Permission",
    ],
    githubUrl: "",
    liveUrl: "",
    folderUrl: "/assets/project/lombanesia",
    imageFallbackColor: "#5f4b32",
  },
  {
    id: "bom-2026",
    title: "BOM OpenRegis",
    description:
      "Interactive multi-game event management platform for large-scale competitive academic events.",
    longDescription:
      "A comprehensive event management system featuring complex team registration workflows, administrative tracking, and multi-game mechanics (Mindsweeper, Mindcraft, Tipping Point) with real-time synchronized leaderboards.",
    contributions: [
      "Vice Coordinator of IT",
      "Developed real-time interactive games using WebSockets and polling techniques",
      "Optimized team registration system with autosave functionality using Laravel Livewire",
      "Engineered automated early-bird logic with quota validation and expiration status",
    ],
    techStack: [
      "Laravel",
      "Livewire",
      "Alpine.js",
      "Tailwind CSS",
      "Pusher/Ably",
      "Redis",
    ],
    githubUrl: "",
    liveUrl: "",
    folderUrl: "/assets/project/bom-2026",
    imageFallbackColor: "#4c3e3e",
  },
  {
    id: "pc-smart-builder",
    title: "PC Smart Builder",
    description:
      "Intelligent platform automating PC component selection using algorithmic optimization.",
    longDescription:
      "A sophisticated web platform that leverages a multi-criteria optimization algorithm to help users create optimal PC builds. It validates compatibility and performance while maximizing budget utilization through a rule-based expert system.",
    contributions: [
      "Designed and developed the core recommendation engine and scoring algorithm",
      "Implemented a graph-based compatibility checker to automate conflict resolution",
      "Developed the bottleneck analysis system to ensure hardware performance balance",
      "Built a reactive user interface using Livewire and Volt",
    ],
    techStack: [
      "Laravel",
      "Livewire",
      "Volt",
      "Tailwind CSS",
      "Alpine.js",
      "MySQL",
    ],
    githubUrl: "",
    liveUrl: "",
    folderUrl: "/assets/project/pc-smart-builder",
    imageFallbackColor: "#383b4e",
  },
  {
    id: "white-myth-wukong",
    title: "White Myth Wukong",
    description:
      "A solo-developed 2D action-adventure game featuring intelligent enemy AI.",
    longDescription:
      "A 2D action-adventure game built from scratch using Java and libGDX. The project features custom A* pathfinding, multi-geometry collision detection, and a modular level management system.",
    contributions: [
      "Solo Game Developer",
      "Programmed a custom A* pathfinding algorithm for intelligent enemy AI",
      "Implemented an advanced multi-geometry collision detection system",
      "Designed pixel-art maps using Tiled and handled full game state management",
    ],
    techStack: ["Java", "libGDX", "Tiled Map Editor", "Box2D"],
    githubUrl: "",
    liveUrl: "",
    folderUrl: "/assets/project/white-myth-wukong",
    imageFallbackColor: "#6c2727",
  },
];
