"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useConsent } from "@/lib/cookieConsent";

/**
 * Cookie-Banner im Marken-CI (dunkelgrün, Bronze, Cormorant, Siegel-Mark).
 * Erscheint beim ersten Öffnen der Website. Buttons sind gleichwertig
 * (DSGVO: "Nur notwendige" und "Alle akzeptieren"). Über "Einstellungen"
 * lässt sich Google Maps (Kategorie funktional) gezielt zulassen.
 */
export default function CookieBanner() {
  const { ready, bannerOpen, acceptAll, acceptEssential, setFunktional, categories } = useConsent();
  const [details, setDetails] = useState(false);
  const [funktionalDraft, setFunktionalDraft] = useState(false);

  if (!ready || !bannerOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 20,
        transform: "translateX(-50%)",
        zIndex: 120,
        width: "min(680px, calc(100vw - 32px))",
        background: "#17301f",
        color: "#e9e2cf",
        border: "1px solid rgba(194,160,94,.4)",
        borderTop: "4px solid #c2a05e",
        borderRadius: 10,
        boxShadow: "0 30px 70px rgba(6,18,11,.55)",
        padding: "26px 28px",
        animation: "rise .5s both",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <Image src="/siegel-mark.png" alt="" width={34} height={34} style={{ height: 34, width: "auto" }} />
        <h2
          id="cookie-title"
          style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#f0e8d3", margin: 0 }}
        >
          Ein Keks zur Begrüßung
        </h2>
      </div>
      <p id="cookie-desc" style={{ fontSize: 14.5, lineHeight: 1.7, color: "#c8c2ad", marginBottom: 18 }}>
        Wir verwenden nur, was für den Betrieb der Website nötig ist. Wenn Sie möchten, binden wir
        zusätzlich unsere Google-Maps-Anfahrtskarte ein, damit Sie den Weg zu uns auf der Höhe gleich
        vor Augen haben. Dabei werden Daten an Google übertragen. Sie entscheiden, was geladen wird,
        und können Ihre Wahl jederzeit ändern. Mehr dazu in unserer{" "}
        <Link href="/datenschutz" style={{ color: "#e0c88d", textDecoration: "underline" }}>
          Datenschutzerklärung
        </Link>
        .
      </p>

      {details && (
        <div
          style={{
            background: "rgba(10,26,16,.5)",
            border: "1px solid rgba(194,160,94,.2)",
            borderRadius: 6,
            padding: 16,
            marginBottom: 18,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#f0e8d3" }}>Notwendig</div>
              <div style={{ fontSize: 13, color: "#a9b3a0" }}>
                Technisch erforderlich, damit die Seite funktioniert. Immer aktiv.
              </div>
            </div>
            <span style={{ fontSize: 12.5, color: "#a9b3a0", whiteSpace: "nowrap" }}>Immer an</span>
          </div>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "flex-start",
              cursor: "pointer",
            }}
          >
            <span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#f0e8d3", display: "block" }}>
                Funktional · Google Maps
              </span>
              <span style={{ fontSize: 13, color: "#a9b3a0" }}>
                Lädt unsere Anfahrtskarte von Google. Ohne Ihre Zustimmung bleibt die Karte aus.
              </span>
            </span>
            <input
              type="checkbox"
              checked={funktionalDraft}
              onChange={(e) => setFunktionalDraft(e.target.checked)}
              aria-label="Google Maps zulassen"
              style={{ width: 20, height: 20, marginTop: 2, accentColor: "#c2a05e" }}
            />
          </label>
        </div>
      )}

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        {details ? (
          <button className="btn-gold" type="button" onClick={() => setFunktional(funktionalDraft)}>
            Auswahl speichern
          </button>
        ) : (
          <button className="btn-gold" type="button" onClick={acceptAll}>
            Alle akzeptieren
          </button>
        )}
        <button
          type="button"
          onClick={acceptEssential}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "transparent",
            color: "#f0e8d3",
            fontWeight: 700,
            letterSpacing: ".06em",
            textTransform: "uppercase",
            fontSize: 12.5,
            padding: "13px 24px",
            border: "1.5px solid rgba(224,200,141,.5)",
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          Nur notwendige
        </button>
        <button
          type="button"
          onClick={() => {
            setFunktionalDraft(categories.funktional);
            setDetails((v) => !v);
          }}
          aria-expanded={details}
          style={{
            background: "none",
            border: "none",
            color: "#e0c88d",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "underline",
            marginLeft: "auto",
          }}
        >
          {details ? "Weniger anzeigen" : "Einstellungen"}
        </button>
      </div>
    </div>
  );
}
