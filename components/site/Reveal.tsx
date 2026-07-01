"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Blendet Inhalt beim Scrollen sanft ein (IntersectionObserver mit Fallback
 * und Safety-Timeout, damit nie Inhalt unsichtbar bleibt). Respektiert
 * prefers-reduced-motion über die CSS-Regeln in globals.css.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.classList.contains("in")) return;

    let io: IntersectionObserver | null = null;
    const safety = window.setTimeout(() => el.classList.add("in"), 5000);

    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
      );
      io.observe(el);
    } else {
      el.classList.add("in");
    }

    return () => {
      window.clearTimeout(safety);
      io?.disconnect();
    };
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
