import { SkillCategory } from "@/src/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    skills: [
      { name: "PHP" },
      { name: "Laravel" },
      { name: "FastAPI" },
    ],
  },
  {
    category: "Frontend",
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
    category: "Database",
    skills: [
      { name: "MySQL" },
    ],
  },
  {
    category: "Tools & DevOps",
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
