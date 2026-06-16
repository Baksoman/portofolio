"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="neo-btn flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
}
