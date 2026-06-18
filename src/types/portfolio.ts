export type LocalizedText = {
  en: string;
  id: string;
};

export type LocalizedArray = {
  en: string[];
  id: string[];
};

export interface PersonalInfo {
  name: string;
  title: LocalizedText;
  tagline: LocalizedText;
  email: string;
  github: string;
  // linkedin: string;
  location: LocalizedText;
  resumeUrl: string;
  bio: LocalizedText;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: LocalizedText;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  role?: LocalizedText;
  description: LocalizedText;
  longDescription?: LocalizedText;
  contributions: LocalizedArray;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  folderUrl?: string;
  fileName?: string[];
  imageFallbackColor?: string;
}

export interface Experience {
  id: string;
  role: LocalizedText;
  organization: string;
  type: "internship" | "freelance" | "organization" | "activity";
  startDate: string;
  endDate: string | "Present";
  description: LocalizedArray;
  skills?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: LocalizedText;
  field: LocalizedText;
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
