import { personalInfo } from "@/src/data/personal";
import { skillCategories } from "@/src/data/skills";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import styles from "./about.module.css";

export function AboutSection() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <SectionHeading
          title="About & Skills"
          subtitle="Who I am and what I build with."
        />

        <div className={styles.grid}>
          {/* ── Left: Bio + Quick Facts ─────────────── */}
          <div className={styles.left}>
            <div className={styles.bioCard}>
              <p className={styles.cardLabel}>Background</p>
              <p className={styles.bio}>{personalInfo.bio}</p>
            </div>

            <div className={styles.factsCard}>
              <p className={styles.cardLabel}>Quick Facts</p>
              <ul className={styles.factsList} role="list">
                <li className={styles.factItem}>
                  <span className={styles.factIcon} aria-hidden="true">📍</span>
                  <span>{personalInfo.location}</span>
                </li>
                <li className={styles.factItem}>
                  <span className={styles.factIcon} aria-hidden="true">🎓</span>
                  <span>Informatics Engineering Student</span>
                </li>
                <li className={styles.factItem}>
                  <span className={styles.factIcon} aria-hidden="true">💼</span>
                  <span>Open to internship &amp; full-time opportunities</span>
                </li>
                <li className={styles.factItem}>
                  <span className={styles.factIcon} aria-hidden="true">🚀</span>
                  <span>Interested in full-stack &amp; backend engineering</span>
                </li>
                <li className={styles.factItem}>
                  <span className={styles.factIcon} aria-hidden="true">✉️</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className={styles.factLink}
                  >
                    {personalInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Right: Skills by category ───────────── */}
          <div className={styles.right}>
            <p className={styles.skillsHeader}>Tech Stack</p>
            {skillCategories.map((cat) => (
              <div key={cat.category} className={styles.categoryBlock}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryDot} aria-hidden="true" />
                  <h3 className={styles.categoryName}>{cat.category}</h3>
                </div>
                <div className={styles.tagCloud} role="list" aria-label={`${cat.category} skills`}>
                  {cat.skills.map((skill) => (
                    <span key={skill.name} className={styles.tag} role="listitem">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
