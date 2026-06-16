import { Experience } from "@/src/types/portfolio";

export const experiences: Experience[] = [
  {
    id: "internship-1",
    role: "Software Engineer Intern",
    organization: "Tech Startup Co.",
    type: "internship",
    startDate: "Jan 2024",
    endDate: "Jun 2024",
    description: [
      "Developed and maintained RESTful APIs using Node.js and Express",
      "Implemented new features in the React-based frontend application",
      "Collaborated with cross-functional teams in an Agile environment",
      "Improved test coverage from 40% to 80% using Jest",
    ],
    skills: ["React", "Node.js", "Jest", "PostgreSQL"],
  },
  {
    id: "freelance-1",
    role: "Freelance Web Developer",
    organization: "Self-employed",
    type: "freelance",
    startDate: "Aug 2023",
    endDate: "Present",
    description: [
      "Designed and built custom websites for small to medium businesses",
      "Delivered responsive, accessible, and SEO-optimized web solutions",
      "Managed client relationships and project timelines independently",
    ],
    skills: ["Next.js", "WordPress", "Tailwind CSS"],
  },
  {
    id: "org-1",
    role: "Technical Lead",
    organization: "Informatics Student Association",
    type: "organization",
    startDate: "Mar 2023",
    endDate: "Mar 2024",
    description: [
      "Led a team of 8 developers to build the association's web platform",
      "Established coding standards and reviewed pull requests",
      "Organized technical workshops and knowledge-sharing sessions",
    ],
    skills: ["Leadership", "React", "Team Management"],
  },
];
