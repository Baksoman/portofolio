import { Education } from "@/src/types/portfolio";

export const education: Education[] = [
  {
    id: "university",
    institution: "State University of Technology",
    degree: { en: "Bachelor of Science", id: "Sarjana Sains" },
    field: { en: "Informatics Engineering", id: "Teknik Informatika" },
    startYear: 2021,
    endYear: "Present",
    gpa: "3.75 / 4.00",
    relevantCourses: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Systems",
      "Web Programming",
      "Computer Networks",
      "Object-Oriented Programming",
    ],
  },
];
