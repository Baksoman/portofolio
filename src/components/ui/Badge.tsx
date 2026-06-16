interface BadgeProps {
  label: string;
}

export function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-block rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-text)]">
      {label}
    </span>
  );
}
