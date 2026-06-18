"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { projects } from "@/src/data/projects";
import { Project } from "@/src/types/portfolio";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import ProjectGallery from "./ProjectGallery";
import styles from "./projects.module.css";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useTrans } from "@/src/contexts/LanguageContext";
import { uiLabels } from "@/src/data/uiLabels";

const PROJECTS_PER_PAGE = 6;

// Atur kecepatan marquee di sini (detik per loop)
// Angka lebih KECIL = lebih CEPAT | Angka lebih BESAR = lebih LAMBAT
const MARQUEE_SPEED = 20; // default: 20 detik per loop

/* ── Dark Marquee (dipakai di dalam overlay gelap) ── */
function DarkMarquee({
  tags,
  duration = 12,
}: {
  tags: string[];
  duration?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...tags, ...tags, ...tags, ...tags];

  return (
    <div
      className={styles.dMarqueeWrap}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      onMouseEnter={() => trackRef.current?.classList.add(styles.dPaused)}
      onMouseLeave={() => trackRef.current?.classList.remove(styles.dPaused)}
    >
      <div ref={trackRef} className={styles.dMarqueeTrack}>
        {doubled.map((tag, i) => (
          i % tags.length === tags.length - 1 ? (
            // Separator di akhir tiap set
            <span key={`${tag}-${i}`} style={{ display: "contents" }}>
              <span className={styles.dTag}>{tag}</span>
              <span className={styles.dSeparator} aria-hidden="true">
                <span className={styles.dSeparatorWall} />
              </span>
            </span>
          ) : (
            <span key={`${tag}-${i}`} className={styles.dTag}>{tag}</span>
          )
        ))}
      </div>
    </div>
  );
}

/* ── Project Detail Overlay ───────────────────────────── */
function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t } = useTrans();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const bgImage = project.folderUrl
    ? (project.fileName && project.fileName.length > 0
        ? `${project.folderUrl}/${project.fileName[0]}`
        : `${project.folderUrl}/1.webp`)
    : null;

  // Gunakan kecepatan marquee yang sudah diatur
  const marqueeDuration = MARQUEE_SPEED;

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={styles.overlayBackdrop}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Background blurred image */}
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          fill
          className={styles.overlayBgImage}
          priority
        />
      )}

      {/* Dark overlay */}
      <div className={styles.overlayBgOverlay} />

      {/* Close button */}
      <button className={styles.overlayClose} onClick={onClose} aria-label="Close">
        ✕
      </button>

      {/* Content */}
      <motion.div
        key="content"
        initial={{ scale: 0.95, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 24 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className={styles.overlayContent}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* ── Carousel ── */}
        {project.folderUrl && (
          <div className={styles.overlayCarouselWrap}>
            <ProjectGallery
              folderUrl={project.folderUrl}
              projectTitle={project.title}
              fileName={project.fileName}
            />
          </div>
        )}

        {/* ── Project Details ── */}
        <div className={styles.overlayBody}>

          {/* ── Hero: title + role + links ── */}
          <div className={styles.dOverlayHero}>
            <div className="flex justify-start gap-5">
              <h2 className={styles.dOverlayTitle}>{project.title}</h2>
              {(project.githubUrl || project.liveUrl) && (
                <div className={styles.dOverlayLinks}>
                  {project.githubUrl && (
                    <a href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.dOverlayBtn} ${styles.dOverlayBtnPrimary}`}
                    >
                      {/* GitHub icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.dOverlayBtn} ${styles.dOverlayBtnMuted}`}
                    >
                      {/* External link icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>


            {project.role && (
              <span className={styles.dOverlayRole}>
                {t(project.role) as string}
              </span>
            )}
          </div>

          {/* ── Overview ── */}
          {(project.longDescription ?? project.description) && (
            <div className={styles.dBlock}>
              <p className={styles.dBlockLabel}>{t(uiLabels.sections.projects.overview) as string}</p>
              <p className={styles.dBlockText}>
                {t(project.longDescription ?? project.description) as string}
              </p>
            </div>
          )}

          {/* ── Contributions ── */}
          {project.contributions && (
            <div className={styles.dBlock}>
              <p className={styles.dBlockLabel}>{t(uiLabels.sections.projects.contributions) as string}</p>
              <ul className={styles.dContribList}>
                {(t(project.contributions) as string[]).map((c: string, i: number) => (
                  <li key={i} className={styles.dContribItem}>
                    <span className={styles.dContribBullet} aria-hidden="true" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── Tech Stack ── */}
          {project.techStack?.length > 0 && (
            <div className={styles.dBlock}>
              <p className={styles.dBlockLabel}>{t(uiLabels.sections.projects.techStack) as string}</p>
              <DarkMarquee
                tags={project.techStack}
                duration={marqueeDuration}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   GalleryCard & ProjectsSection — tidak ada perubahan
───────────────────────────────────────────────────────── */
function GalleryCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const { t } = useTrans();
  // Gunakan fileName[0] jika ada, fallback ke 1.webp
  const coverSrc = project.folderUrl 
    ? (project.fileName && project.fileName.length > 0
        ? `${project.folderUrl}/${project.fileName[0]}`
        : `${project.folderUrl}/1.webp`)
    : null;

  return (
    <article
      className={styles.card}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent<HTMLElement>);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${project.title}`}
      data-project-id={project.id}
    >
      {coverSrc ? (
        <Image
          src={coverSrc}
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
          style={{ background: project.imageFallbackColor ?? "var(--color-surface)" }}
          aria-hidden="true"
        />
      )}
      <div className={styles.cardOverlay} aria-hidden="true" />
      <span className={styles.cardHint} aria-hidden="true">⤢</span>
      <div className={styles.cardContent}>
        <div className={styles.cardSlider}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <div className={styles.cardReveal}>
            <p className={styles.cardDesc}>{t(project.description) as string}</p>
            <div className={styles.cardTags} aria-hidden="true">
              {project.techStack.slice(0, 4).map((t) => (
                <span key={t} className={styles.cardTag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const { t } = useTrans();
  const [active, setActive] = useState<Project | null>(null);
  const [page, setPage] = useState(0);
  const cloneEl = useRef<HTMLElement | null>(null);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const paged = projects.slice(page * PROJECTS_PER_PAGE, (page + 1) * PROJECTS_PER_PAGE);

  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleProjectClick = (project: Project, e: React.MouseEvent<HTMLElement>) => {
    const img =
      e.currentTarget.querySelector("img") ||
      e.currentTarget.querySelector(`.${styles.cardBg}`);
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const clone = img.cloneNode() as HTMLElement;
    clone.style.cssText = `
      position:fixed;
      left:${rect.left}px;
      top:${rect.top}px;
      width:${rect.width}px;
      height:${rect.height}px;
      z-index:100;
      object-fit:cover;
      transition:none;
    `;
    document.body.appendChild(clone);
    cloneEl.current = clone;

    gsap.to(clone, {
      left: 0, top: 0, width: "100vw", height: "100vh",
      duration: 0.7, ease: "power3.inOut",
      onComplete: () => setActive(project),
    });
  };

  const handleClose = () => {
    if (!active) return;
    const closingProject = active;
    setActive(null);

    setTimeout(() => {
      if (!cloneEl.current) return;
      const originalArticle = document.querySelector(`[data-project-id="${closingProject.id}"]`);
      const original =
        originalArticle?.querySelector("img") ||
        originalArticle?.querySelector(`.${styles.cardBg}`);
      if (!original) {
        cloneEl.current?.remove();
        cloneEl.current = null;
        return;
      }
      const rect = original.getBoundingClientRect();
      gsap.to(cloneEl.current, {
        left: rect.left, top: rect.top, width: rect.width, height: rect.height,
        duration: 0.6, ease: "power3.inOut",
        onComplete: () => {
          cloneEl.current?.remove();
          cloneEl.current = null;
        },
      });
    }, 300);
  };

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.container}>
        <SectionHeading
          title={t(uiLabels.sections.projects.title) as string}
          subtitle={t(uiLabels.sections.projects.subtitle) as string}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28 }}
            className={styles.gallery}
          >
            {paged.map((project) => (
              <GalleryCard
                key={project.id}
                project={project}
                onClick={(e) => handleProjectClick(project, e)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageArrow}
              onClick={prevPage}
              disabled={page === 0}
              aria-label="Previous page"
            >‹</button>
            <div className={styles.pageDots}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`${styles.pageDot} ${i === page ? styles.pageDotActive : ""}`}
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <button
              className={styles.pageArrow}
              onClick={nextPage}
              disabled={page === totalPages - 1}
              aria-label="Next page"
            >›</button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <ProjectOverlay project={active} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}