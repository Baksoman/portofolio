import { Experience } from "@/src/types/portfolio";

export const experiences: Experience[] = [
  {
    id: "internship-1",
    role: {
      en: "Software Engineer Intern",
      id: "Software Engineer Intern"
    },
    organization: "Tech Startup Co.",
    type: "internship",
    startDate: "Jan 2024",
    endDate: "Jun 2024",
    description: {
      en: [
        "Developed and maintained RESTful APIs using Node.js and Express",
        "Implemented new features in the React-based frontend application",
        "Collaborated with cross-functional teams in an Agile environment",
        "Improved test coverage from 40% to 80% using Jest",
      ],
      id: [
        "Mengembangkan dan memelihara RESTful API menggunakan Node.js dan Express",
        "Mengimplementasikan fitur baru pada aplikasi frontend berbasis React",
        "Berkolaborasi dengan tim lintas fungsi dalam lingkungan Agile",
        "Meningkatkan test coverage dari 40% menjadi 80% menggunakan Jest",
      ]
    },
    skills: ["React", "Node.js", "Jest", "PostgreSQL"],
  },
  {
    id: "freelance-1",
    role: {
      en: "Freelance Web Developer",
      id: "Freelance Web Developer"
    },
    organization: "Self-employed",
    type: "freelance",
    startDate: "Aug 2023",
    endDate: "Present",
    description: {
      en: [
        "Designed and built custom websites for small to medium businesses",
        "Delivered responsive, accessible, and SEO-optimized web solutions",
        "Managed client relationships and project timelines independently",
      ],
      id: [
        "Merancang dan membangun website kustom untuk bisnis kecil hingga menengah",
        "Menghasilkan solusi web yang responsif, accessible, dan SEO-optimized",
        "Mengelola hubungan klien dan timeline proyek secara mandiri",
      ]
    },
    skills: ["Next.js", "WordPress", "Tailwind CSS"],
  },
  {
    id: "org-1",
    role: {
      en: "Technical Lead",
      id: "Technical Lead"
    },
    organization: "Informatics Student Association",
    type: "organization",
    startDate: "Mar 2023",
    endDate: "Mar 2024",
    description: {
      en: [
        "Led a team of 8 developers to build the association's web platform",
        "Established coding standards and reviewed pull requests",
        "Organized technical workshops and knowledge-sharing sessions",
      ],
      id: [
        "Memimpin tim yang terdiri dari 8 developer untuk membangun platform web asosiasi",
        "Menetapkan standar coding dan mereview pull request",
        "Mengorganisir workshop teknis dan sesi knowledge-sharing",
      ]
    },
    skills: ["Leadership", "React", "Team Management"],
  },
];
