import { SkillCategory } from "@/src/types/portfolio";

export const skillCategories: SkillCategory[] = [
  {
    category: "Backend",
    skills: [
      { name: "PHP" },
      { name: "Laravel" },
      { name: "Java" },
      { name: "Python" },
      { name: "FastAPI" },
      { name: "Node.js" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
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
