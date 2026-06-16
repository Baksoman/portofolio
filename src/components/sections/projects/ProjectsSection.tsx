"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { projects } from "@/src/data/projects";
import { Project } from "@/src/types/portfolio";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import styles from "./projects.module.css";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS_PER_PAGE = 6;

/* ─────────────────────────────────────────────────────────
   Image Carousel (inside detail overlay)
───────────────────────────────────────────────────────── */
function ImageCarousel({ folderUrl }: { folderUrl: string }) {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(1);
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);
  const touchStartX = useRef<number | null>(null);

  // Probe how many images exist (max 20)
  useEffect(() => {
    setCurrent(0);
    setLoadedSet(new Set());
    let cancelled = false;

    (async () => {
      let count = 0;
      for (let i = 1; i <= 20; i++) {
        try {
          const res = await fetch(`${folderUrl}/${i}.webp`, { method: "HEAD" });
          if (!res.ok) break;
          count = i;
        } catch {
          break;
        }
        if (cancelled) return;
      }
      if (!cancelled) setTotal(Math.max(1, count));
    })();

    return () => { cancelled = true; };
  }, [folderUrl]);

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        setCurrent((c) => (c + 1) % total);
      }
    }, 3500);
  }, [total]);

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAuto]);

  const go = useCallback((dir: 1 | -1) => {
    setCurrent((c) => (c + dir + total) % total);
    startAuto();
  }, [total, startAuto]);

  // Touch/swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    isPaused.current = false;
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const indices = Array.from({ length: total }, (_, i) => i);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.32, ease: "easeInOut" }}
          className={styles.carouselSlide}
        >
          {!loadedSet.has(current) && (
            <div className={styles.carouselSkeleton} aria-hidden="true" />
          )}
          <Image
            src={`${folderUrl}/${current + 1}.webp`}
            alt={`Screenshot ${current + 1}`}
            fill
            className={styles.carouselImg}
            sizes="(max-width: 768px) 100vw, 860px"
            priority={current === 0}
            onLoad={() => setLoadedSet((prev) => new Set(prev).add(current))}
          />
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            onClick={() => go(1)}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Dots */}
          <div className={styles.carouselDots} role="tablist" aria-label="Image navigation">
            {indices.map((i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Image ${i + 1}`}
                className={`${styles.carouselDot} ${i === current ? styles.carouselDotActive : ""}`}
                onClick={() => { setCurrent(i); startAuto(); }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Project Detail Overlay
───────────────────────────────────────────────────────── */
function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
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
      <motion.div
        key="panel"
        initial={{ scale: 0.95, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 24 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className={styles.overlayPanel}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        {/* Close */}
        <button className={styles.overlayClose} onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Scrollable area */}
        <div className={styles.overlayScroll}>

          {/* ── Carousel ── */}
          {project.folderUrl && (
            <div className={styles.overlayCarouselWrap}>
              <ImageCarousel folderUrl={project.folderUrl} />
            </div>
          )}

          <div className={styles.overlayBody}>

            {/* ── Hero header ── */}
            <div className={styles.overlayHero}>
              <h2 className={styles.overlayTitle}>{project.title}</h2>
              <div className={styles.overlayMeta}>
                {/* {project.type    && <span className={styles.overlayMetaChip}>{project.type}</span>} */}
                {/* {project.date    && <span className={styles.overlayMetaChip}>{project.date}</span>} */}
                {/* {project.role    && <span className={styles.overlayMetaChip}>{project.role}</span>} */}
              </div>
              {(project.githubUrl || project.liveUrl) && (
                <div className={styles.overlayLinks}>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLinkPrimary}>
                      GitHub →
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.overlayLinkMuted}>
                      Live Demo →
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* ── Overview ── */}
            {(project.longDescription ?? project.description) && (
              <div className={styles.overlayBlock}>
                <p className={styles.overlayBlockLabel}>Overview</p>
                <p className={styles.overlayDesc}>
                  {project.longDescription ?? project.description}
                </p>
              </div>
            )}

            {/* ── Contributions + Tech Stack (2-col) ── */}
            <div className={styles.overlayGrid}>
              {project.contributions?.length > 0 && (
                <div className={styles.overlayBlock}>
                  <p className={styles.overlayBlockLabel}>My Contributions</p>
                  <ul className={styles.contribList}>
                    {project.contributions.map((c, i) => (
                      <li key={i} className={styles.contribItem}>
                        <span className={styles.contribBullet} aria-hidden="true" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.techStack?.length > 0 && (
                <div className={styles.overlayBlock}>
                  <p className={styles.overlayBlockLabel}>Tech Stack</p>
                  <div className={styles.overlayTags}>
                    {project.techStack.map((t) => (
                      <span key={t} className={styles.overlayTag}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Challenges ── */}
            {/* {project.challenges?.length > 0 && (
              <div className={styles.overlayBlock}>
                <p className={styles.overlayBlockLabel}>Challenges & Solutions</p>
                <ul className={styles.contribList}>
                  {project.challenges.map((c, i) => (
                    <li key={i} className={styles.contribItem}>
                      <span className={styles.contribBullet} aria-hidden="true" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {/* ── Results ── */}
            {/* {project.results?.length > 0 && (
              <div className={styles.overlayBlock}>
                <p className={styles.overlayBlockLabel}>Results & Outcomes</p>
                <ul className={styles.contribList}>
                  {project.results.map((r, i) => (
                    <li key={i} className={styles.contribItem}>
                      <span className={styles.contribBullet} aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Gallery Card
───────────────────────────────────────────────────────── */
function GalleryCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const coverSrc = project.folderUrl ? `${project.folderUrl}/1.webp` : null;

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
      {/* Background */}
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

      {/* Gradient overlay */}
      <div className={styles.cardOverlay} aria-hidden="true" />

      {/* Expand hint */}
      <span className={styles.cardHint} aria-hidden="true">⤢</span>

      {/* Content — title bottom-left always, desc+tags slide up on hover */}
      <div className={styles.cardContent}>
        <div className={styles.cardSlider}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <div className={styles.cardReveal}>
            <p className={styles.cardDesc}>{project.description}</p>
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

/* ─────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────── */
export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [page, setPage]     = useState(0);
  const cloneEl             = useRef<HTMLElement | null>(null);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const paged      = projects.slice(page * PROJECTS_PER_PAGE, (page + 1) * PROJECTS_PER_PAGE);

  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleProjectClick = (project: Project, e: React.MouseEvent<HTMLElement>) => {
    const img =
      e.currentTarget.querySelector("img") ||
      e.currentTarget.querySelector(`.${styles.cardBg}`);
    if (!img) return;

    const rect  = img.getBoundingClientRect();
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
          title="Projects"
          subtitle="Click any card to explore the project in detail."
        />

        {/* Gallery with page transition */}
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

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageArrow}
              onClick={prevPage}
              disabled={page === 0}
              aria-label="Previous page"
            >
              ‹
            </button>

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
            >
              ›
            </button>
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