import { Project } from "@/src/types/portfolio";

/**
 * Add your projects here.
 * - imageUrl: put the image in /public/projects/ and reference it as "/projects/your-image.jpg"
 * - imageFallbackColor: shown when imageUrl is empty or image fails to load
 * - contributions: bullet points describing YOUR role / what YOU built
 */
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Title",
    description: "Short one-line description shown on the gallery card.",
    longDescription:
      "A longer paragraph describing the project in more detail — what problem it solves, who uses it, and the overall architecture.",
    contributions: [
      "Describe your role or contribution here",
      "Another specific thing you built or designed",
      "A third contribution, e.g. 'Integrated payment gateway with Stripe'",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    imageFallbackColor: "#275f6c",
  },
  {
    id: "project-2",
    title: "Another Project",
    description: "Short description of this project.",
    longDescription:
      "More detail about this project — context, goals, and what makes it interesting.",
    contributions: [
      "Your main contribution",
      "A specific feature you implemented",
      "Performance improvement or architecture decision you made",
    ],
    techStack: ["Laravel", "PHP", "MySQL"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    imageFallbackColor: "#4c3e3e",
  },
  {
    id: "project-3",
    title: "Third Project",
    description: "What this project does in one sentence.",
    longDescription:
      "Full description of the third project — background, what you built, and the outcome.",
    contributions: [
      "First contribution",
      "Second contribution",
      "Third contribution",
    ],
    techStack: ["Python", "FastAPI", "Docker"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    imageFallbackColor: "#383b4e",
  },
];
