"use client";

import { useState } from "react";
import type { MenuData } from "@/lib/menu/types";

/**
 * Zeigt die Speisekarten mit umschaltbaren Tabs. Die Tabs kommen aus der
 * Karten-Liste, sodass frei angelegte Karten automatisch erscheinen. Rendert
 * die Live-Daten aus dem Store; Struktur und CI bleiben fix.
 */
export default function MenuDisplay({ data }: { data: MenuData }) {
  const cards = data.cards ?? [];
  const [active, setActive] = useState<string>(cards[0]?.id ?? "");
  const card = cards.find((c) => c.id === active) ?? cards[0];
  if (!card) return null;

  return (
    <>
      <div role="tablist" aria-label="Speisekarte wählen" style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 44, flexWrap: "wrap" }}>
        {cards.map((c) => {
          const on = card.id === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(c.id)}
              style={{
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                padding: "11px 22px",
                borderRadius: 2,
                background: on ? "#20402a" : "#fff",
                color: on ? "#f0e8d3" : "#3a4235",
                border: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        style={{
          background: "#f6f1e6",
          borderRadius: 6,
          padding: "48px 52px",
          boxShadow: "0 30px 70px rgba(0,0,0,.28)",
          animation: "fadein .4s both",
        }}
        className="ps-menu-card"
      >
        {card.note && (
          <p style={{ textAlign: "center", fontSize: 14, color: "#6a6f60", marginBottom: 30 }}>{card.note}</p>
        )}

        {card.categories.map((cat, ci) => (
          <div key={cat.id} style={{ marginBottom: ci < card.categories.length - 1 ? 38 : 0 }}>
            {cat.title && (
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, color: "#b8935a" }}>
                  {cat.title}
                </span>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {cat.items.map((item) => (
                <div key={item.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 23, color: "#22331f" }}>{item.name}</span>
                    <span style={{ flex: 1, borderBottom: "1px dotted #c2a05e", margin: "0 4px 4px" }} />
                    <span style={{ fontWeight: 700, color: "#2a5537", whiteSpace: "nowrap" }}>{item.preis}</span>
                  </div>
                  {item.beschreibung && (
                    <p style={{ fontSize: 13.5, color: "#6a6f60", marginTop: 3 }}>{item.beschreibung}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 13, color: "#b7b39e", marginTop: 24 }}>
        Eine Auswahl unserer Karte. Die vollständige Speisekarte wechselt saisonal, wir beraten Sie gern.
      </p>

      <style>{`
        @media (max-width: 560px) {
          .ps-menu-card { padding: 32px 22px !important; }
        }
      `}</style>
    </>
  );
}
