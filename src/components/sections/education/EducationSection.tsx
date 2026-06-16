import { education } from "@/src/data/education";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import styles from "./education.module.css";

export function EducationSection() {
  return (
    <section id="education" className={styles.section} aria-labelledby="education-heading">
      <div className={styles.container}>
        <SectionHeading
          title="Education"
          subtitle="My academic background and relevant coursework."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {education.map((edu) => (
            <article key={edu.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div>
                  <h3 className={styles.degree}>
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className={styles.institution}>{edu.institution}</p>
                </div>
                <div className={styles.meta}>
                  <p className={styles.years}>{edu.startYear} — {edu.endYear}</p>
                  {edu.gpa && <p className={styles.gpa}>GPA: {edu.gpa}</p>}
                </div>
              </div>

              {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                <>
                  <hr className={styles.divider} />
                  <p className={styles.coursesLabel}>Relevant Coursework</p>
                  <ul className={styles.courses} role="list">
                    {edu.relevantCourses.map((course) => (
                      <li key={course} className={styles.courseTag}>{course}</li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
