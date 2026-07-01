"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Tab = "hotel" | "tisch" | "event";

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};
const capStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#5c6153",
};

/**
 * Buchungs-/Kontaktformular mit drei Tabs. In der kompakten Variante (Funnel
 * auf der Startseite) ohne Kontaktfelder, in der vollen Variante (Buchungsseite)
 * mit Name/Telefon/E-Mail/Nachricht. Submit zeigt einen Bestätigungs-Toast
 * (Platzhalter, später an ein Buchungssystem anzubinden).
 */
export default function BookingForm({ variant = "full" }: { variant?: "full" | "compact" }) {
  const [tab, setTab] = useState<Tab>("hotel");
  const [sent, setSent] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSent(false), 5200);
  }

  const compact = variant === "compact";

  const tabDef: { id: Tab; label: string }[] = [
    { id: "hotel", label: compact ? "◆ Hotelnacht" : "Hotelnacht" },
    { id: "tisch", label: compact ? "◆ Tisch reservieren" : "Tischreservierung" },
    { id: "event", label: compact ? "◆ Feiern & Tagen" : "Feier & Tagung" },
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Art der Anfrage"
        style={{ display: "flex", gap: 8, marginBottom: compact ? 18 : 30, flexWrap: "wrap" }}
      >
        {tabDef.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              style={{
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: compact ? ".1em" : ".08em",
                textTransform: "uppercase",
                padding: compact ? "9px 16px" : "11px 20px",
                borderRadius: 2,
                background: active ? "#20402a" : compact ? "transparent" : "transparent",
                color: active ? "#f0e8d3" : "#5c6153",
                border: compact ? "none" : `1px solid ${active ? "#20402a" : "transparent"}`,
                fontFamily: "var(--font-sans)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={onSubmit}>
        {tab === "hotel" && (
          <>
            {!compact && (
              <h3 style={{ fontSize: 28, color: "#22331f", marginBottom: 22 }}>
                Eine Hotelnacht anfragen
              </h3>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: compact
                  ? "repeat(auto-fit,minmax(150px,1fr))"
                  : "1fr 1fr",
                gap: compact ? 14 : 18,
                alignItems: compact ? "end" : "stretch",
                marginBottom: compact ? 0 : 18,
              }}
            >
              <label style={labelStyle}>
                <span style={capStyle}>Anreise</span>
                <input className="fld" type="date" required aria-label="Anreisedatum" />
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Abreise</span>
                <input className="fld" type="date" required aria-label="Abreisedatum" />
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Gäste</span>
                <select className="fld" aria-label="Anzahl Gäste" defaultValue="2 Personen">
                  <option>1 Person</option>
                  <option>2 Personen</option>
                  <option>3 Personen</option>
                  <option>4 Personen</option>
                </select>
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Zimmerart</span>
                <select className="fld" aria-label="Zimmerart" defaultValue="Doppelzimmer">
                  <option>Einzelzimmer</option>
                  <option>Doppelzimmer</option>
                  <option>Komfort-Doppelzimmer</option>
                  <option>Familienzimmer</option>
                  <option>Noch unentschieden</option>
                </select>
              </label>
              {compact && (
                <button className="btn-gold" type="submit" style={{ height: 44, whiteSpace: "nowrap" }}>
                  Verfügbarkeit prüfen
                </button>
              )}
            </div>
          </>
        )}

        {tab === "tisch" && (
          <>
            {!compact && (
              <h3 style={{ fontSize: 28, color: "#22331f", marginBottom: 22 }}>
                Einen Tisch reservieren
              </h3>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: compact
                  ? "repeat(auto-fit,minmax(150px,1fr))"
                  : "1fr 1fr 1fr",
                gap: compact ? 14 : 18,
                alignItems: compact ? "end" : "stretch",
                marginBottom: compact ? 0 : 18,
              }}
            >
              <label style={labelStyle}>
                <span style={capStyle}>Datum</span>
                <input className="fld" type="date" required aria-label="Datum der Reservierung" />
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Uhrzeit</span>
                <input className="fld" type="time" defaultValue="18:30" aria-label="Uhrzeit" />
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Personen</span>
                <select className="fld" aria-label="Anzahl Personen" defaultValue="2 Personen">
                  <option>2 Personen</option>
                  <option>3 Personen</option>
                  <option>4 Personen</option>
                  <option>5 Personen</option>
                  <option>6+ Personen</option>
                </select>
              </label>
              {compact && (
                <button className="btn-gold" type="submit" style={{ height: 44, whiteSpace: "nowrap" }}>
                  Tisch reservieren
                </button>
              )}
            </div>
          </>
        )}

        {tab === "event" && (
          <>
            {!compact && (
              <h3 style={{ fontSize: 28, color: "#22331f", marginBottom: 22 }}>
                Feier oder Tagung anfragen
              </h3>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: compact
                  ? "repeat(auto-fit,minmax(150px,1fr))"
                  : "1fr 1fr 1fr",
                gap: compact ? 14 : 18,
                alignItems: compact ? "end" : "stretch",
                marginBottom: compact ? 0 : 18,
              }}
            >
              <label style={labelStyle}>
                <span style={capStyle}>Anlass</span>
                <select className="fld" aria-label="Anlass" defaultValue="Hochzeit">
                  <option>Hochzeit</option>
                  <option>Familienfeier</option>
                  <option>Firmenfeier</option>
                  <option>Tagung / Seminar</option>
                  <option>Trauerfeier</option>
                </select>
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Wunschtermin</span>
                <input className="fld" type="date" aria-label="Wunschtermin" />
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Gäste ca.</span>
                <select className="fld" aria-label="ungefähre Gästezahl" defaultValue="bis 20">
                  <option>bis 20</option>
                  <option>20 bis 40</option>
                  <option>40 bis 60</option>
                  <option>60 bis 80</option>
                </select>
              </label>
              {compact && (
                <button className="btn-gold" type="submit" style={{ height: 44, whiteSpace: "nowrap" }}>
                  Unverbindlich anfragen
                </button>
              )}
            </div>
          </>
        )}

        {!compact && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <label style={labelStyle}>
                <span style={capStyle}>Name</span>
                <input className="fld" type="text" placeholder="Ihr Name" required />
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Telefon</span>
                <input className="fld" type="tel" placeholder="Für Rückfragen" />
              </label>
            </div>
            <label style={{ ...labelStyle, marginBottom: 18 }}>
              <span style={capStyle}>E-Mail</span>
              <input className="fld" type="email" placeholder="ihre@email.de" required />
            </label>
            <label style={{ ...labelStyle, marginBottom: 24 }}>
              <span style={capStyle}>Ihre Nachricht</span>
              <textarea className="fld" rows={3} placeholder="Wünsche, Fragen, Anlass" />
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-gold" type="submit">
                Anfrage absenden
              </button>
              <span style={{ fontSize: 12.5, color: "#8a8f80", maxWidth: 260 }}>
                Unverbindlich und kostenfrei. Wir melden uns persönlich bei Ihnen.
              </span>
            </div>
          </>
        )}
      </form>

      {sent && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 34,
            transform: "translateX(-50%)",
            zIndex: 80,
            background: "#17301f",
            color: "#f0e8d3",
            padding: "16px 26px",
            borderRadius: 3,
            border: "1px solid #c2a05e",
            boxShadow: "0 20px 50px rgba(0,0,0,.35)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            animation: "rise .5s both",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          <Image src="/siegel-mark.png" alt="" width={30} height={30} style={{ height: 30, width: "auto" }} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600 }}>
              Vielen Dank!
            </div>
            <div style={{ fontSize: 13, color: "#c8c2ad" }}>
              Ihre Anfrage ist bei uns eingegangen, wir melden uns persönlich.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSent(false)}
            aria-label="Hinweis schließen"
            style={{
              cursor: "pointer",
              color: "#9c9884",
              fontSize: 20,
              marginLeft: 8,
              background: "none",
              border: "none",
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
