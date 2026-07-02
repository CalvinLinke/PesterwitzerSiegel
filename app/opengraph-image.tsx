import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} · ${site.restaurant} in Freital bei Dresden`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Fonts lokal einbetten, damit der Schriftzug immer gestochen scharf ist
   (unabhängig vom niedrig aufgelösten Logo-Asset). */
function font(path: string): Buffer {
  return readFileSync(fileURLToPath(new URL(path, import.meta.url)));
}
const cormorant = font("./_fonts/cormorant-600.woff");
const mulish = font("./_fonts/mulish-700.woff");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          padding: 36,
          background: "linear-gradient(180deg,#1c3b26 0%,#0f2417 100%)",
          fontFamily: "Mulish",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(224,200,141,0.45)",
            borderRadius: 10,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
            {[0, 1, 2].map((i) => (
              <svg key={i} width="32" height="32" viewBox="0 0 24 24">
                <path
                  d="M12 .8l3.1 6.9 7.5.7-5.6 5 1.6 7.4L12 18l-6.2 2.8 1.6-7.4-5.6-5 7.5-.7z"
                  fill="#e0c88d"
                />
              </svg>
            ))}
          </div>
          <div style={{ display: "flex", fontFamily: "Cormorant", fontWeight: 600, fontSize: 108, color: "#f7f1e0", lineHeight: 1 }}>
            Pesterwitzer Siegel
          </div>
          <div style={{ display: "flex", fontFamily: "Mulish", fontWeight: 700, fontSize: 24, letterSpacing: 12, color: "#c2a05e", marginTop: 24 }}>
            HOTEL · RESTAURANT · FREITAL
          </div>
          <div style={{ display: "flex", width: 190, height: 2, background: "#c2a05e", margin: "32px 0" }} />
          <div style={{ display: "flex", fontFamily: "Cormorant", fontWeight: 600, fontSize: 42, color: "#e6cf95" }}>
            Sächsische Gemütlichkeit, versiegelt.
          </div>
          <div style={{ display: "flex", fontFamily: "Mulish", fontWeight: 700, fontSize: 20, letterSpacing: 2, color: "#a9b3a0", marginTop: 20 }}>
            Familiär geführtes 3-Sterne-Haus · 6 km von Dresden
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, weight: 600, style: "normal" },
        { name: "Mulish", data: mulish, weight: 700, style: "normal" },
      ],
    }
  );
}
