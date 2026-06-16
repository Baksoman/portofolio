interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-[var(--color-text-muted)]">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[var(--color-accent)]" />
    </div>
  );
}
