import { HeroSection } from "@/src/components/sections/hero/HeroSection";
import { AboutSection } from "@/src/components/sections/about/AboutSection";
import { ProjectsSection } from "@/src/components/sections/projects/ProjectsSection";
import { EducationSection } from "@/src/components/sections/education/EducationSection";
import { ContactSection } from "@/src/components/sections/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      {/* <EducationSection /> */}
      <ContactSection />
    </>
  );
}
