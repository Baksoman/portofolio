"use client";

import { useState, useEffect, useRef } from "react";
import { ThemeSwitchToggle } from "@/src/components/ui/ThemeSwitchToggle";
import { LanguageToggle } from "@/src/components/language/LanguageToggle";

const NAV_LINKS = [
  { label: "About",     href: "#about" },
  { label: "Projects",  href: "#projects" },
  // { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact" },
];

export function Header() {
  const [hidden,   setHidden]   = useState(false);
  const [atTop,    setAtTop]    = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const dir = y > lastY.current ? "down" : "up";
      setAtTop(y < 10);
      // hide on scroll-down (after 60px), show on scroll-up
      if (y > 60) setHidden(dir === "down");
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ─── DESKTOP NAVBAR ──────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex justify-center"
        style={{
          transform: hidden ? "translateY(-110%)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/*
          Floating pill — top corners square (attached to top edge),
          bottom corners rounded (hanging look)
        */}
        <div
          className="mx-6 mt-0 flex items-center gap-2 px-4 py-2.5"
          style={{
            background: "var(--color-bg)",
            borderRadius: "0 0 20px 20px",
            boxShadow: atTop
              ? "none"
              : "var(--neo-shadow-out), 0 1px 0 0 var(--color-surface) inset",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            aria-label="Go to top"
            className="mr-4 text-lg font-bold tracking-tight text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            BR<span className="text-[var(--color-accent)]">.</span>
          </a>

          {/* Nav links */}
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className="neo-nav-link rounded-xl px-3.5 py-1.5 text-sm font-medium text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Theme toggle + Language toggle */}
          <div className="ml-4 flex items-center gap-2">
            <LanguageToggle />
            <ThemeSwitchToggle />
          </div>
        </div>
      </header>

      {/* ─── MOBILE DYNAMIC ISLAND ───────────────────────────────── */}
      <div
        className="fixed z-50 lg:hidden"
        style={{
          top: "12px",
          left: "50%",
          transform: hidden
            ? "translateX(-50%) translateY(-130%)"
            : "translateX(-50%) translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Island container — expands on open */}
        <div
          style={{
            background: "var(--color-bg)",
            boxShadow: "var(--neo-shadow-out)",
            borderRadius: menuOpen ? "20px" : "9999px",
            width:  menuOpen ? "min(88vw, 340px)" : "auto",
            transition:
              "border-radius 0.4s cubic-bezier(0.4,0,0.2,1), " +
              "width 0.4s cubic-bezier(0.4,0,0.2,1), " +
              "box-shadow 0.3s ease",
            overflow: "hidden",
          }}
        >
          {/* ── Collapsed pill row ─────────────────────────────── */}
          <div
            className="flex items-center justify-between gap-3 px-4"
            style={{ height: "44px" }}
          >
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
              aria-label="Go to top"
              className="text-base font-bold tracking-tight text-[var(--color-text)] focus-visible:outline-none"
            >
              RM<span className="text-[var(--color-accent)]">.</span>
            </a>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeSwitchToggle />

              {/* Hamburger / close button */}
              <button
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-island-menu"
                onClick={() => setMenuOpen((p) => !p)}
                className="neo-island-btn flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <span
                  className="block h-[1.5px] w-4 bg-[var(--color-text)]"
                  style={{
                    transition: "transform 0.25s ease, opacity 0.2s ease",
                    transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                  }}
                />
                <span
                  className="block h-[1.5px] w-4 bg-[var(--color-text)]"
                  style={{
                    transition: "opacity 0.2s ease",
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  className="block h-[1.5px] w-4 bg-[var(--color-text)]"
                  style={{
                    transition: "transform 0.25s ease, opacity 0.2s ease",
                    transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                  }}
                />
              </button>
            </div>
          </div>

          {/* ── Expanded nav links ─────────────────────────────── */}
          <nav
            id="mobile-island-menu"
            aria-label="Mobile navigation"
            style={{
              maxHeight: menuOpen ? "360px" : "0",
              opacity:   menuOpen ? 1 : 0,
              transition:
                "max-height 0.4s cubic-bezier(0.4,0,0.2,1), " +
                "opacity 0.25s ease",
              overflow: "hidden",
            }}
          >
            {/* divider */}
            <div
              className="mx-4"
              style={{ height: "1px", background: "var(--color-surface)", opacity: 0.5 }}
            />
            <ul role="list" className="flex flex-col gap-1 px-3 py-3">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className="neo-island-link block rounded-2xl px-4 py-2.5 text-sm font-medium text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}