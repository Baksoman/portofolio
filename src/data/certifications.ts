import { Certification } from "@/src/types/portfolio";

export const certifications: Certification[] = [
  {
    id: "aws-cloud",
    name: "AWS Certified Cloud Practitioner",
    provider: "Amazon Web Services",
    issueDate: "Nov 2023",
    verificationUrl: "https://aws.amazon.com/verification",
    credentialId: "AWS-CCP-12345",
  },
  {
    id: "meta-react",
    name: "Meta Front-End Developer Certificate",
    provider: "Meta via Coursera",
    issueDate: "Aug 2023",
    verificationUrl: "https://coursera.org/verify/professional-cert/example",
    credentialId: "META-FE-67890",
  },
  {
    id: "google-ux",
    name: "Google UX Design Certificate",
    provider: "Google via Coursera",
    issueDate: "Mar 2023",
    verificationUrl: "https://coursera.org/verify/professional-cert/example2",
    credentialId: "GOOGLE-UX-11111",
  },
];
