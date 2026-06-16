export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  // linkedin: string;
  location: string;
  resumeUrl: string;
  bio: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  /** Short caption shown on the gallery card */
  description: string;
  /** Full detail shown in the lightbox */
  longDescription?: string;
  /** My personal contributions to the project */
  contributions: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Path relative to /public, e.g. "/projects/my-app.jpg" */
  imageUrl: string;
  /** Solid fallback color when no image is provided (CSS color string) */
  imageFallbackColor?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  type: "internship" | "freelance" | "organization" | "activity";
  startDate: string;
  endDate: string | "Present";
  description: string[];
  skills?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | "Present";
  relevantCourses?: string[];
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  verificationUrl?: string;
  credentialId?: string;
}
