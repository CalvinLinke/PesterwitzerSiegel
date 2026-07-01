"use client";

import { useConsent } from "@/lib/cookieConsent";
import { mapsEmbedUrl } from "@/lib/site";

/**
 * Bindet die Google-Maps-Karte erst nach ausdrücklicher Einwilligung ein.
 * Ohne Zustimmung zeigt sie einen CI-konformen Platzhalter mit Button
 * "Karte laden", der die Kategorie "funktional" freischaltet.
 */
export default function ConsentMap() {
  const { categories, setFunktional, ready } = useConsent();

  const wrapperStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 14px 40px rgba(23,48,31,.14)",
    height: 280,
    border: "1px solid #e6dcc5",
    position: "relative",
  };

  if (ready && categories.funktional) {
    return (
      <div style={wrapperStyle}>
        <iframe
          title="Anfahrt zum Hotel Pesterwitzer Siegel"
          src={mapsEmbedUrl}
          style={{ width: "100%", height: "100%", border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...wrapperStyle,
        background:
          "linear-gradient(135deg,#20402a,#17301f)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "28px 24px",
        color: "#e9e2cf",
      }}
    >
      <div
        aria-hidden="true"
        style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "#c2a05e", lineHeight: 1, marginBottom: 8 }}
      >
        ◈
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#f0e8d3", marginBottom: 6 }}>
        Karte von Google Maps
      </div>
      <p style={{ fontSize: 13.5, color: "#c8c2ad", maxWidth: 340, lineHeight: 1.6, marginBottom: 16 }}>
        Wenn Sie die Karte laden, werden Daten an Google übertragen. Ihre Zustimmung merken wir uns,
        sie lässt sich jederzeit widerrufen.
      </p>
      <button className="btn-gold" type="button" onClick={() => setFunktional(true)}>
        Karte laden
      </button>
    </div>
  );
}
