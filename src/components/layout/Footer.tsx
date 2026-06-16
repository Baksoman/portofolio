import { personalInfo } from "@/src/data/personal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-surface)] bg-[var(--color-bg)] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          © {year}{" "}
          <span className="font-medium text-[var(--color-text)]">
            {personalInfo.name}
          </span>
          . Built with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
