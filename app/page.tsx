import { HeroSection } from "@/src/components/sections/hero/HeroSection";
import { AboutSection } from "@/src/components/sections/about/AboutSection";
import { ProjectsSection } from "@/src/components/sections/projects/ProjectsSection";
// import { EducationSection } from "@/src/components/sections/education/EducationSection";
import { ContactSection } from "@/src/components/sections/contact/ContactSection";
// import { Background } from "@/src/components/background/Background";
import { WordRainBackground } from "@/src/components/background/WordRainBackground";
// import { CPUBackground } from "@/src/components/background/CPUBackground";

export default function HomePage() {
  return (
    <div>
      <WordRainBackground />

        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        {/* <EducationSection /> */}
        <ContactSection />
    </div>
  );
}
