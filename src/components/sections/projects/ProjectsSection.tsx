"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { projects } from "@/src/data/projects";
import { Project } from "@/src/types/portfolio";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import styles from "./projects.module.css";

/* ── Lightbox ─────────────────────────────────────────────── */
function Lightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus trap & close on Escape
  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 200);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className={styles.lightbox}>
        {/* Close button */}
        <button
          ref={closeBtnRef}
          onClick={handleClose}
          aria-label="Close project details"
          className={styles.closeBtn}
        >
          ✕
        </button>

        {/* Hero image */}
        <div className={styles.lightboxImage}>
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 62rem"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: project.imageFallbackColor ?? "var(--color-surface)",
              }}
            />
          )}
          <div className={styles.lightboxImageGradient} aria-hidden="true" />
        </div>

        {/* Body */}
        <div className={styles.lightboxBody}>
          <h2 className={styles.lightboxTitle}>{project.title}</h2>

          {(project.longDescription ?? project.description) && (
            <p className={styles.lightboxDesc}>
              {project.longDescription ?? project.description}
            </p>
          )}

          <div className={styles.lightboxGrid}>
            {/* Contributions */}
            {project.contributions.length > 0 && (
              <div className={styles.lightboxBlock}>
                <p className={styles.lightboxBlockLabel}>My Contributions</p>
                <ul className={styles.contribList} role="list">
                  {project.contributions.map((c, i) => (
                    <li key={i} className={styles.contribItem}>
                      <span className={styles.contribBullet} aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack */}
            {project.techStack.length > 0 && (
              <div className={styles.lightboxBlock}>
                <p className={styles.lightboxBlockLabel}>Tech Stack</p>
                <div className={styles.lightboxTags} role="list" aria-label="Technologies used">
                  {project.techStack.map((t) => (
                    <span key={t} className={styles.lightboxTag} role="listitem">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className={styles.lightboxLinks}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.lightboxLink}
                >
                  View on GitHub →
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.lightboxLinkMuted}
                >
                  Live Demo →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Gallery card ─────────────────────────────────────────── */
function GalleryCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <article
      className={styles.card}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${project.title}`}
    >
      {/* Background image or fallback color */}
      {project.imageUrl ? (
        <Image
          src={project.imageUrl}
          alt=""
          aria-hidden="true"
          fill
          className={styles.cardBg}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          className={styles.cardBg}
          style={{
            background: project.imageFallbackColor ?? "var(--color-surface)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay */}
      <div className={styles.cardOverlay} aria-hidden="true" />

      {/* Expand hint icon */}
      <span className={styles.cardHint} aria-hidden="true">⤢</span>

      {/* Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTags} aria-hidden="true">
          {project.techStack.slice(0, 4).map((t) => (
            <span key={t} className={styles.cardTag}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ── Section ──────────────────────────────────────────────── */
export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.container}>
        <SectionHeading
          title="Projects"
          subtitle="Click any card to explore the project in detail."
        />

        <div className={styles.gallery}>
          {projects.map((project) => (
            <GalleryCard
              key={project.id}
              project={project}
              onClick={() => setActive(project)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox — rendered outside the grid, fixed to viewport */}
      {active && (
        <Lightbox project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
