import { Project } from "@/src/types/portfolio";

export const projects: Project[] = [
  {
    id: "bem-petra",
    title: "BEM Petra Official Website",
    role: {
      en: "Lead Full-Stack Developer",
      id: "Lead Full-Stack Developer"
    },
    description: {
      en: "An interactive, high-performance web portal for Petra Christian University's Student Executive Board.",
      id: "Portal web interaktif dan berkinerja tinggi untuk Badan Eksekutif Mahasiswa Universitas Kristen Petra."
    },
    longDescription: {
      en: "A collaborative group project to build a digital hub for BEM Petra (LIFT Cabinet). The platform blends smooth animations with real-time data to showcase the cabinet's vision, members, events, and student units (UKM). I took full ownership of the full-stack development, bridging Creative team designs with a robust backend to ensure a responsive, immersive experience.",
      id: "Proyek kolaboratif untuk membangun hub digital BEM Petra (Kabinet LIFT). Platform ini memadukan animasi smooth dengan data real-time untuk menampilkan visi kabinet, anggota, acara, dan unit kegiatan mahasiswa (UKM). Saya bertanggung jawab penuh atas pengembangan full-stack, menghubungkan desain tim Kreatif dengan backend yang robust untuk memastikan pengalaman yang responsif dan immersive."
    },
    contributions: {
      en: [
        "Architected the full-stack ecosystem connecting Next.js frontend with Laravel backend",
        "Implemented Next.js App Router, SSR, and ISR for optimal performance and SEO",
        "Developed interactive 3D elements and mascot animations",
      ],
      id: [
        "Merancang ekosistem full-stack yang menghubungkan frontend Next.js dengan backend Laravel",
        "Mengimplementasikan Next.js App Router, SSR, dan ISR untuk performa dan SEO yang optimal",
        "Mengembangkan elemen 3D interaktif dan animasi maskot",
      ]
    },
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "Tailwind CSS",
      "GSAP",
    ],
    githubUrl: "",
    liveUrl: "https://bem.petra.ac.id",
    folderUrl: "/assets/project/bem-main",
    imageFallbackColor: "#275f6c",
  },
  {
    id: "lombanesia",
    title: "Lombanesia",
    role: {
      en: "Lead Full-Stack Developer & PIC for BEM Interns",
      id: "Lead Full-Stack Developer & PIC untuk BEM Interns"
    },
    description: {
      en: "Competition management and discovery marketplace for Indonesian students.",
      id: "Platform manajemen dan pencarian kompetisi untuk mahasiswa Indonesia."
    },
    longDescription: {
      en: "A centralized marketplace bridging organizers and participants. The platform provides verified, subscription-based tools for organizers and advanced filtering for students to discover competitions.",
      id: "Marketplace terpusat yang menghubungkan penyelenggara dan peserta. Platform ini menyediakan tools berbasis subscription yang terverifikasi untuk penyelenggara dan filtering canggih untuk mahasiswa menemukan kompetisi."
    },
    contributions: {
      en: [
        "Architected backend infrastructure and developed the complete admin dashboard",
        "Developed frontend user pages and implemented secure payment verification workflows",
        "Implemented Role-Based Access Control (RBAC) using Spatie Laravel Permission",
      ],
      id: [
        "Merancang infrastruktur backend dan mengembangkan admin dashboard secara lengkap",
        "Mengembangkan halaman frontend user dan mengimplementasikan workflow verifikasi pembayaran yang aman",
        "Mengimplementasikan Role-Based Access Control (RBAC) menggunakan Spatie Laravel Permission",
      ]
    },
    techStack: [
      "Laravel",
      "Livewire",
      "Alpine.js",
      "Tailwind CSS",
      "MySQL",
      "Spatie Permission",
    ],
    githubUrl: "",
    liveUrl: "https://bem.petra.ac.id/lombanesia",
    folderUrl: "/assets/project/lombanesia",
    imageFallbackColor: "#5f4b32",
  },
  {
    id: "bom-2026",
    title: "BOM OpenRegis",
    role: {
      en: "Vice Coordinator of IT",
      id: "Wakil Koordinator IT"
    },
    description: {
      en: "Interactive multi-game event management platform for large-scale competitive academic events.",
      id: "Platform manajemen event multi-game interaktif untuk acara akademik kompetitif skala besar."
    },
    longDescription: {
      en: "A comprehensive event management system featuring complex team registration workflows, administrative tracking, and multi-game mechanics (Mindsweeper, Mindcraft, Tipping Point) with real-time synchronized leaderboards.",
      id: "Sistem manajemen event komprehensif yang menampilkan workflow pendaftaran tim yang kompleks, tracking administratif, dan mekanik multi-game (Mindsweeper, Mindcraft, Tipping Point) dengan leaderboard tersinkronisasi real-time."
    },
    contributions: {
      en: [
        "Developed real-time interactive games using WebSockets and polling techniques",
        "Optimized team registration system with autosave functionality using Laravel Livewire",
        "Engineered automated early-bird logic with quota validation and expiration status",
      ],
      id: [
        "Mengembangkan game interaktif real-time menggunakan WebSockets dan teknik polling",
        "Mengoptimalkan sistem pendaftaran tim dengan fitur autosave menggunakan Laravel Livewire",
        "Merancang logika early-bird otomatis dengan validasi kuota dan status kadaluarsa",
      ]
    },
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
    description: {
      en: "Intelligent platform automating PC component selection using algorithmic optimization.",
      id: "Platform cerdas yang mengotomatisasi pemilihan komponen PC menggunakan optimasi algoritma."
    },
    longDescription: {
      en: "A sophisticated web platform that leverages a multi-criteria optimization algorithm to help users create optimal PC builds. It validates compatibility and performance while maximizing budget utilization through a rule-based expert system.",
      id: "Platform web canggih yang memanfaatkan algoritma optimasi multi-kriteria untuk membantu pengguna membuat build PC yang optimal. Platform ini memvalidasi kompatibilitas dan performa sambil memaksimalkan pemanfaatan budget melalui sistem expert berbasis aturan."
    },
    contributions: {
      en: [
        "Designed and developed the core recommendation engine and scoring algorithm",
        "Implemented a graph-based compatibility checker to automate conflict resolution",
        "Developed the bottleneck analysis system to ensure hardware performance balance",
        "Built a reactive user interface using Livewire and Volt",
      ],
      id: [
        "Merancang dan mengembangkan mesin rekomendasi inti dan algoritma scoring",
        "Mengimplementasikan compatibility checker berbasis graph untuk otomasi resolusi konflik",
        "Mengembangkan sistem analisis bottleneck untuk memastikan keseimbangan performa hardware",
        "Membangun user interface reaktif menggunakan Livewire dan Volt",
      ]
    },
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
    role: {
      en: "Solo Game Developer",
      id: "Solo Game Developer"
    },
    description: {
      en: "A solo-developed 2D action-adventure game featuring intelligent enemy AI.",
      id: "Game 2D action-adventure yang dikembangkan solo dengan AI musuh yang cerdas."
    },
    longDescription: {
      en: "A 2D action-adventure game built from scratch using Java and libGDX. The project features custom A* pathfinding, multi-geometry collision detection, and a modular level management system.",
      id: "Game 2D action-adventure yang dibangun dari nol menggunakan Java dan libGDX. Proyek ini menampilkan A* pathfinding kustom, sistem deteksi collision multi-geometry, dan sistem manajemen level modular."
    },
    contributions: {
      en: [
        "Programmed a custom A* pathfinding algorithm for intelligent enemy AI",
        "Implemented an advanced multi-geometry collision detection system",
        "Designed pixel-art maps using Tiled and handled full game state management",
      ],
      id: [
        "Memprogram algoritma A* pathfinding kustom untuk AI musuh yang cerdas",
        "Mengimplementasikan sistem deteksi collision multi-geometry yang canggih",
        "Merancang map pixel-art menggunakan Tiled dan menangani manajemen state game secara lengkap",
      ]
    },
    techStack: ["Java", "libGDX", "Tiled Map Editor", "Box2D"],
    githubUrl: "",
    liveUrl: "",
    folderUrl: "/assets/project/white-myth-wukong",
    imageFallbackColor: "#6c2727",
  },
];
