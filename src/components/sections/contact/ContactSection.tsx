import { personalInfo } from "@/src/data/personal";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ScrollLink } from "@/src/components/ui/ScrollLink";
import styles from "./contact.module.css";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    description: "Send me an email",
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/Baksoman",
    href: personalInfo.github,
    description: "View my GitHub profile",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <SectionHeading
          title="Get In Touch"
          subtitle="I'm open to opportunities, collaborations, or just a good conversation."
        />

        <div className={styles.cards}>
          {CONTACT_LINKS.map((link) => (
            <div key={link.label} className={styles.card}>
              <p className={styles.cardLabel}>{link.label}</p>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={link.description}
                className={styles.cardLink}
              >
                {link.value}
              </a>
            </div>
          ))}
        </div>

        {/* <ScrollLink
          href={personalInfo.resumeUrl}
          download
          className={styles.resumeBtn}
        >
          Download Resume
        </ScrollLink> */}
      </div>
    </section>
  );
}
