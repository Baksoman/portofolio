"use client";

import { useEffect, useRef } from "react";
import { personalInfo } from "@/src/data/personal";
import { skillCategories } from "@/src/data/skills";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import styles from "./about.module.css";

const SPEED_PX_PER_S = 38;

function MarqueeRow({ skills, label }: { skills: { name: string }[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const raf1 = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const halfW = track.scrollWidth / 2;
        const duration = halfW / SPEED_PX_PER_S;
        track.style.setProperty('--marquee-duration', `${duration}s`);
      })
    );
    return () => cancelAnimationFrame(raf1);
  }, [skills]);

  // Add a separator to the start of the list.
  const baseList = [{ name: "SEPARATOR", isSeparator: true }, ...skills];

  // Repeat the list 12 times (6 for the first half, 6 for the second half).
  // The container max-width is 1152px, so 6 copies of even a short list will safely cover it.
  const TOTAL_COPIES = 12;
  const tags = Array.from({ length: TOTAL_COPIES }).flatMap(() => baseList);

  return (
    <div
      className={styles.marqueeWrap}
      aria-label={`${label} skills`}
      onMouseEnter={() => trackRef.current?.classList.add(styles.paused)}
      onMouseLeave={() => trackRef.current?.classList.remove(styles.paused)}
    >
      <div ref={trackRef} className={styles.marqueeTrack} role="list">
        {tags.map((item, i) => (
          'isSeparator' in item && item.isSeparator ? (
            <span key={`sep-${i}`} className={styles.separator} aria-hidden="true">
              <div className={styles.separatorWall} />
            </span>
          ) : (
            <span
              key={`${item.name}-${i}`}
              className={styles.tag}
              role="listitem"
            >
              {item.name}
            </span>
          )
        ))}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <SectionHeading
          title="About & Skills"
          subtitle="Who I am and what I build with."
        />

        <div className={styles.grid}>
          {/* ── Left: Bio Card ─────────────────────── */}
          <div className={styles.left}>
            <div className={styles.bioCard}>
              <div className={styles.blobTri} aria-hidden="true" />
              <p className={styles.cardLabel}>Background</p>
              <p className={styles.bio}>{personalInfo.bio}</p>
            </div>
          </div>

          {/* ── Right: Skills Marquee ───────────────── */}
          <div className={styles.right}>
            <div className={styles.skillsCard}>
              <div className={`${styles.decoRing} ${styles.decoRing1}`} aria-hidden="true" />
              <div className={`${styles.decoRing} ${styles.decoRing2}`} aria-hidden="true" />
              <div className={styles.decoSq} aria-hidden="true" />
              <div className={`${styles.decoDot} ${styles.decoDot1}`} aria-hidden="true" />
              <div className={`${styles.decoDot} ${styles.decoDot2}`} aria-hidden="true" />
              <div className={`${styles.decoDot} ${styles.decoDot3}`} aria-hidden="true" />

              <p className={styles.skillsHeader}>Tech Stack</p>

              {skillCategories.map((cat) => (
                <div key={cat.category} className={styles.categoryBlock}>
                  <div className={styles.categoryHeader}>
                    <span className={styles.categoryDot} aria-hidden="true" />
                    <h3 className={styles.categoryName}>{cat.category}</h3>
                  </div>
                  <MarqueeRow skills={cat.skills} label={cat.category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}