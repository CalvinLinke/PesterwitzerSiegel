import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Über uns",
  description:
    "Die Geschichte der Familie Siegel und ihres Hauses auf der Pesterwitzer Höhe. Ein familiär geführtes 3-Sterne-Hotel mit dem historischen Restaurant Albertheim über dem Elbtal.",
  path: "/ueber-uns",
  keywords: ["Familie Siegel", "Geschichte Pesterwitzer Siegel", "Hotel Pesterwitz Geschichte"],
});

const timeline = [
  { label: "Anfangs", h: "Der Gasthof auf der Höhe", p: "Wo heute Gäste aus aller Welt nächtigen, kehrten einst Reisende auf dem Weg nach Dresden ein. So wurde der Grundstein für ein Haus gelegt, das Gastfreundschaft großschreibt." },
  { label: "Albertheim", h: "Das Restaurant öffnet", p: "Im historischen Gewölbe entsteht das Albertheim und bis heute ist es das Herz des Hauses, in dem regionale Küche und Pesterwitzer Wein zusammenfinden." },
  { label: "Heute", h: "Familiär geführt, modern gedacht", p: "Drei Sterne, moderne Zimmer, ein Tagungsraum und ein Restaurant mit Weitblick, geführt von der Familie und getragen von einem Team, das mit Herz dabei ist." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/media/kronentor-05-large.jpg"
        imageAlt="Blick über Dresden vom Pesterwitzer Umland"
        eyebrow="Über uns · Familie Siegel"
        title="Ein Name wird zum Siegel"
        height="60vh"
        siegelSide="right"
      />

      <section style={{ maxWidth: 820, margin: "0 auto", padding: "90px 28px 60px", textAlign: "center" }}>
        <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={80} height={80} style={{ width: 80, height: "auto", marginBottom: 24 }} />
        <h2 style={{ fontSize: "clamp(30px,3.8vw,46px)", color: "#22331f", marginBottom: 24 }}>
          Auf der Höhe zu Hause
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.9, color: "#454e40", marginBottom: 20 }}>
          Oben auf der Pesterwitzer Höhe, dort wo der Blick weit über das Elbtal reicht, führen wir
          unser Haus als Familie. Seit Generationen und mit viel Leidenschaft. Der Name Pesterwitzer
          Siegel verbindet, was uns ausmacht: das Dorf Pesterwitz mit seiner Weinbautradition und unser
          Versprechen, für das wir mit unserem Namen einstehen.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.9, color: "#454e40" }}>
          Aus einem Gasthaus wurde über die Jahre ein familiäres 3-Sterne-Hotel mit dem historischen
          Restaurant Albertheim. Geblieben ist die sächsische Gastfreundschaft, die man nicht spielt,
          sondern jeden Tag lebt.
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 28px 90px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {timeline.map((t) => (
            <div key={t.label} className="ps-timeline-row" style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 32, padding: "28px 0", borderBottom: "1px solid #e2d8bf" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 34, color: "#c2a05e" }}>{t.label}</div>
              <div>
                <h3 style={{ fontSize: 24, color: "#22331f", marginBottom: 8 }}>{t.h}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#5c6153" }}>{t.p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#20402a", color: "#f0e8d3", padding: "90px 0", position: "relative", overflow: "hidden" }}>
        <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={480} height={480} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 480, height: "auto", opacity: 0.05 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", position: "relative", textAlign: "center" }}>
          <span className="eyebrow" style={{ color: "#e0c88d" }}>
            Wofür wir stehen
          </span>
          <h2 style={{ fontSize: "clamp(30px,3.8vw,48px)", margin: "16px 0 44px", color: "#f7f1e0" }}>
            Unser Versprechen
          </h2>
          <div className="ps-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 34 }}>
            {[
              { h: "Persönlich", p: "Bei uns sind Sie Gast, keine Zimmernummer. Wir kennen Ihren Namen und Ihren Lieblingswein." },
              { h: "Regional", p: "Vom Frühstück bis zum Abendmenü kaufen wir bei Nachbarn ein. Kurze Wege und ehrlicher Geschmack." },
              { h: "Beständig", p: "Familiär geführt heißt für uns: Wir denken in Generationen und nicht in Quartalen." },
            ].map((v) => (
              <div key={v.h}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 44, color: "#e0c88d", marginBottom: 10 }}>{v.h}</div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#cfc9b5" }}>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 560px) {
          .ps-timeline-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </>
  );
}
