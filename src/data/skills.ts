import { SkillCategory } from "@/src/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    category: {
      en: "Backend",
      id: "Backend"
    },
    skills: [
      { name: "PHP" },
      { name: "Laravel" },
      { name: "FastAPI" },
    ],
  },
  {
    category: {
      en: "Frontend",
      id: "Frontend"
    },
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "Three.js" },
    ],
  },
  {
    category: {
      en: "Database",
      id: "Database"
    },
    skills: [
      { name: "MySQL" },
    ],
  },
  {
    category: {
      en: "Tools & DevOps",
      id: "Tools & DevOps"
    },
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Vite" },
      { name: "NPM" },
      { name: "Figma" },
    ],
  },
];
