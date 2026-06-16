interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
}

export function NeoCard({
  children,
  className = "",
  as: Tag = "div",
}: NeoCardProps) {
  return (
    <Tag className={`neo-card rounded-2xl p-6 ${className}`}>{children}</Tag>
  );
}
