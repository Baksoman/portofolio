"use client";

interface ScrollLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  download?: boolean;
  "aria-label"?: string;
}

export function ScrollLink({
  href,
  className,
  children,
  download,
  "aria-label": ariaLabel,
}: ScrollLinkProps) {
  if (download) {
    return (
      <a href={href} download className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
