"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Tab = "hotel" | "tisch" | "event" | "bewerbung";

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 7,
};
const capStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#5c6153",
};

const STELLEN = [
  "Koch / Köchin",
  "Servicekraft",
  "Rezeption / Empfang",
  "Ausbildung 2027",
  "Initiativbewerbung",
];

/**
 * Buchungs-, Kontakt- und Bewerbungsformular mit Tabs. Die kompakte Variante
 * (Funnel auf der Startseite) hat keine Kontaktfelder und keinen Bewerbungs-Tab.
 * Die volle Variante (Buchungsseite) ergänzt Name/Telefon/E-Mail/Nachricht und
 * einen Bewerbungs-Tab, der über die Karriereseite vorbelegt werden kann.
 * Submit zeigt einen Bestätigungs-Toast (Platzhalter, später an ein System
 * anzubinden).
 */
export default function BookingForm({
  variant = "full",
  initialTab,
  initialStelle,
}: {
  variant?: "full" | "compact";
  initialTab?: Tab;
  initialStelle?: string;
}) {
  const compact = variant === "compact";
  const [tab, setTab] = useState<Tab>(initialTab ?? "hotel");
  const [stelle, setStelle] = useState<string>(initialStelle ?? STELLEN[0]);
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

  const tabDef: { id: Tab; label: string }[] = compact
    ? [
        { id: "hotel", label: "Hotelnacht" },
        { id: "tisch", label: "Tisch reservieren" },
        { id: "event", label: "Feiern & Tagen" },
      ]
    : [
        { id: "hotel", label: "Hotelnacht" },
        { id: "tisch", label: "Tischreservierung" },
        { id: "event", label: "Feier & Tagung" },
        { id: "bewerbung", label: "Bewerbung" },
      ];

  const compactLabel =
    tab === "tisch" ? "Tisch reservieren" : tab === "event" ? "Unverbindlich anfragen" : "Verfügbarkeit prüfen";
  const fullLabel = tab === "bewerbung" ? "Bewerbung absenden" : "Anfrage absenden";

  // include a passed-in Stelle even if it is not in the default list
  const stellenOptions = STELLEN.includes(stelle) ? STELLEN : [stelle, ...STELLEN];

  const gridGap = compact ? 14 : 20;
  const blockGap = compact ? 0 : 26;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Art der Anfrage"
        style={{ display: "flex", gap: 10, marginBottom: compact ? 20 : 32, flexWrap: "wrap" }}
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
              className={`bk-tab${active ? " on" : ""}`}
            >
              <span aria-hidden="true" className="bk-dot" />
              {t.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={onSubmit}>
        {tab === "hotel" && (
          <>
            {!compact && (
              <h3 style={{ fontSize: 28, color: "#22331f", marginBottom: 22 }}>Eine Hotelnacht anfragen</h3>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: compact ? "repeat(auto-fit,minmax(185px,1fr))" : "1fr 1fr",
                gap: gridGap,
                marginBottom: blockGap,
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
            </div>
          </>
        )}

        {tab === "tisch" && (
          <>
            {!compact && (
              <h3 style={{ fontSize: 28, color: "#22331f", marginBottom: 22 }}>Einen Tisch reservieren</h3>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: compact ? "repeat(auto-fit,minmax(185px,1fr))" : "1fr 1fr 1fr",
                gap: gridGap,
                marginBottom: blockGap,
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
            </div>
          </>
        )}

        {tab === "event" && (
          <>
            {!compact && (
              <h3 style={{ fontSize: 28, color: "#22331f", marginBottom: 22 }}>Feier oder Tagung anfragen</h3>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: compact ? "repeat(auto-fit,minmax(185px,1fr))" : "1fr 1fr 1fr",
                gap: gridGap,
                marginBottom: blockGap,
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
            </div>
          </>
        )}

        {tab === "bewerbung" && !compact && (
          <>
            <h3 style={{ fontSize: 28, color: "#22331f", marginBottom: 8 }}>Bei uns bewerben</h3>
            <p style={{ fontSize: 15, color: "#5c6153", lineHeight: 1.7, marginBottom: 22 }}>
              Schön, dass Sie Teil unseres Hauses werden möchten. Wählen Sie die passende Stelle und
              erzählen Sie uns ein wenig von sich. Unterlagen können Sie gern per E-Mail nachreichen.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: gridGap, marginBottom: blockGap }}>
              <label style={labelStyle}>
                <span style={capStyle}>Stelle</span>
                <select
                  className="fld"
                  aria-label="Gewünschte Stelle"
                  value={stelle}
                  onChange={(e) => setStelle(e.target.value)}
                >
                  {stellenOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Verfügbar ab</span>
                <input className="fld" type="date" aria-label="Verfügbar ab" />
              </label>
            </div>
          </>
        )}

        {!compact && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: gridGap, marginBottom: 22 }}>
              <label style={labelStyle}>
                <span style={capStyle}>Name</span>
                <input className="fld" type="text" placeholder="Ihr Name" required />
              </label>
              <label style={labelStyle}>
                <span style={capStyle}>Telefon</span>
                <input className="fld" type="tel" placeholder="Für Rückfragen" />
              </label>
            </div>
            <label style={{ ...labelStyle, marginBottom: 22 }}>
              <span style={capStyle}>E-Mail</span>
              <input className="fld" type="email" placeholder="ihre@email.de" required />
            </label>
            <label style={{ ...labelStyle, marginBottom: 28 }}>
              <span style={capStyle}>{tab === "bewerbung" ? "Ihre Nachricht an uns" : "Ihre Nachricht"}</span>
              <textarea
                className="fld"
                rows={4}
                placeholder={
                  tab === "bewerbung"
                    ? "Ein paar Worte zu Ihnen, Ihrer Erfahrung und ab wann Sie können"
                    : "Wünsche, Fragen, Anlass"
                }
              />
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <button className="btn-gold" type="submit">
                {fullLabel}
              </button>
              <span style={{ fontSize: 12.5, color: "#8a8f80", maxWidth: 280 }}>
                Unverbindlich und kostenfrei. Wir melden uns persönlich bei Ihnen.
              </span>
            </div>
          </>
        )}

        {compact && (
          <div style={{ marginTop: 20 }}>
            <button className="btn-gold" type="submit" style={{ whiteSpace: "nowrap" }}>
              {compactLabel}
            </button>
          </div>
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
              {tab === "bewerbung" ? "Vielen Dank für Ihre Bewerbung!" : "Vielen Dank!"}
            </div>
            <div style={{ fontSize: 13, color: "#c8c2ad" }}>
              Ihre Nachricht ist bei uns eingegangen, wir melden uns persönlich.
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
