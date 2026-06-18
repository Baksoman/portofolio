"use client";

import { useLanguage } from "@/src/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "id" : "en")}
      aria-label="Toggle language"
      className="neo-btn flex h-8 w-12 items-center justify-center rounded-full text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      style={{
        background: "var(--color-bg)",
        boxShadow: "var(--neo-shadow-out)",
        color: "var(--color-text)",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {language === "en" ? "ID" : "EN"}
    </button>
  );
}
