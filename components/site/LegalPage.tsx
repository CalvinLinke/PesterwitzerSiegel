import Image from "next/image";
import type { ReactNode } from "react";

/** Einheitlicher Rahmen für Rechts- und Informationsseiten im Marken-CI. */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section style={{ background: "#20402a", position: "relative", overflow: "hidden", padding: "150px 0 70px" }}>
        <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={340} height={340} style={{ position: "absolute", right: -40, top: 20, width: 340, height: "auto", opacity: 0.06 }} />
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 28px", position: "relative" }}>
          <span className="eyebrow" style={{ color: "#e0c88d" }}>
            {eyebrow}
          </span>
          <h1 style={{ fontSize: "clamp(36px,5vw,64px)", color: "#f7f1e0", margin: "14px 0 0" }}>{title}</h1>
          {intro && (
            <p style={{ fontSize: 17, color: "#cfc9b5", marginTop: 18, lineHeight: 1.7, maxWidth: 620 }}>{intro}</p>
          )}
        </div>
      </section>

      <article className="ps-legal" style={{ maxWidth: 860, margin: "0 auto", padding: "60px 28px 100px" }}>
        {children}
      </article>

      <style>{`
        .ps-legal h2 {
          font-size: clamp(24px, 3vw, 32px);
          color: #22331f;
          margin: 40px 0 14px;
        }
        .ps-legal h3 {
          font-size: 20px;
          color: #2a5537;
          margin: 26px 0 8px;
        }
        .ps-legal p {
          font-size: 16px;
          line-height: 1.85;
          color: #454e40;
          margin-bottom: 16px;
        }
        .ps-legal a { color: #2a5537; text-decoration: underline; }
        .ps-legal ul { margin: 0 0 16px; padding-left: 22px; }
        .ps-legal li { font-size: 16px; line-height: 1.8; color: #454e40; margin-bottom: 6px; }
        .ps-legal strong { color: #22331f; }
        .ps-legal address {
          font-style: normal;
          font-size: 16px;
          line-height: 1.85;
          color: #454e40;
          margin-bottom: 16px;
        }
        .ps-legal hr { border: none; border-top: 1px solid #e2d8bf; margin: 40px 0; }
      `}</style>
    </>
  );
}
