import { personalInfo } from "@/src/data/personal";
import { ScrollLink } from "@/src/components/ui/ScrollLink";
import styles from "./hero.module.css";

export function HeroSection() {
  return (
    <section id="hero" className={styles.section} aria-labelledby="hero-heading">
      {/* Radial glow */}
      <div className={styles.glow} aria-hidden="true">
        <div className={styles.glowBlob} />
      </div>

      <div className={styles.inner}>
        {/* Greeting pill */}
        <div className={styles.pill}>
          <span className={styles.pillDot} />
          <p className={styles.pillLabel}>Hello, I&apos;m</p>
        </div>

        {/* Name */}
        <h1 id="hero-heading" className={styles.name}>
          {personalInfo.name}
        </h1>

        {/* Title chip */}
        <div className={styles.titleChip}>
          <p className={styles.titleText}>{personalInfo.title}</p>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>{personalInfo.tagline}</p>

        {/* CTA Buttons */}
        <div className={styles.ctas}>
          <ScrollLink href="#about" className={styles.btnPrimary}>
            Explore My Work
          </ScrollLink>
          <ScrollLink href={personalInfo.resumeUrl} download className={styles.btnAccent}>
            Download Resume
          </ScrollLink>
        </div>

        {/* Social links */}
        <div className={styles.socials}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={styles.socialLink}
          >
            GitHub
          </a>
          <span className={styles.divider} aria-hidden="true" />
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send email"
            className={styles.socialLink}
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
