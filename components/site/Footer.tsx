import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "#17301f",
        color: "#d9d2be",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src="/siegel-mark.png"
        alt=""
        width={340}
        height={340}
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -40,
          bottom: -30,
          width: 340,
          height: "auto",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "72px 28px 30px",
          position: "relative",
        }}
      >
        <div className="ps-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <Image src="/siegel-mark.png" alt="" width={44} height={44} style={{ height: 44, width: "auto" }} />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#f0e8d3",
                }}
              >
                Pesterwitzer Siegel
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: "#b7b39e", maxWidth: 300 }}>
              Familiär geführtes 3-Sterne-Hotel mit Restaurant Albertheim auf der Pesterwitzer
              Höhe, sechs Kilometer und eine Welt entfernt vom Trubel der Dresdner Altstadt.
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "#c2a05e", marginBottom: 18 }}>
              Entdecken
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "#c8c2ad" }}>
              {navItems
                .filter((n) => n.href !== "/")
                .map((n) => (
                  <Link key={n.href} href={n.href}>
                    {n.label}
                  </Link>
                ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "#c2a05e", marginBottom: 18 }}>
              Kontakt
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                fontSize: 14,
                color: "#c8c2ad",
                lineHeight: 1.5,
              }}
            >
              <span>
                {site.street}
                <br />
                {site.zip} {site.city}-{site.district}
              </span>
              <span>Hotel · {site.phoneHotelDisplay}</span>
              <span>Restaurant · {site.phoneRestaurantDisplay}</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: "#c2a05e", marginBottom: 18 }}>
              Rezeption
            </div>
            <div style={{ fontSize: 14, color: "#c8c2ad", lineHeight: 1.7 }}>
              <div>Montag bis Sonntag · 7:00 bis 22:00</div>
              <div style={{ marginTop: 14, color: "#9c9884" }}>Restaurant Albertheim</div>
              <div>Mittwoch bis Sonntag · ab 11:30</div>
            </div>
            <Link href="/buchung" className="btn-gold" style={{ marginTop: 22 }}>
              Zimmer anfragen
            </Link>
          </div>
        </div>
        <div
          style={{
            marginTop: 52,
            paddingTop: 22,
            borderTop: "1px solid rgba(194,160,94,.22)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 12.5,
            color: "#8f8b76",
          }}
        >
          <span>
            © {year} {site.name} · Familie Siegel
          </span>
          <span style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/barrierefreiheit">Barrierefreiheit</Link>
          </span>
        </div>
      </div>

      <style>{`
        .ps-footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 44px;
        }
        @media (max-width: 860px) {
          .ps-footer-grid { grid-template-columns: 1fr 1fr; gap: 34px; }
        }
        @media (max-width: 520px) {
          .ps-footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
