import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Karriere",
  description:
    "Arbeiten im Hotel Pesterwitzer Siegel: Koch, Servicekraft, Rezeption und Ausbildung 2027. Kein Konzern, sondern eine Familie mit fairem Umgang und planbaren Diensten.",
  path: "/karriere",
  keywords: ["Jobs Hotel Freital", "Koch Stelle Dresden", "Ausbildung Hotel Dresden", "Servicekraft Pesterwitz"],
});

const jobs = [
  { h: "Koch / Köchin", tag: "Vollzeit", p: "Für unsere regionale Küche im Albertheim, kreativ, verlässlich und mit Freude am Handwerk.", cta: "Bewerben", dark: false },
  { h: "Servicekraft", tag: "Voll- / Teilzeit", p: "Herzlich am Gast, mit einem guten Gedächtnis für Lieblingsweine. Erfahrung ist schön, Persönlichkeit ist wichtiger.", cta: "Bewerben", dark: false },
  { h: "Rezeption / Empfang", tag: "Teilzeit", p: "Das erste Lächeln unserer Gäste, organisiert, freundlich und mit einem Blick fürs Detail.", cta: "Bewerben", dark: false },
  { h: "Ausbildung 2027", tag: "Azubi", p: "Hotelfach, Koch oder Restaurantfach, starten Sie Ihre Laufbahn in einem Haus mit Herz.", cta: "Mehr erfahren", dark: true },
];

export default function JobsPage() {
  return (
    <>
      <PageHero
        image="/media/hotelbett-01.jpg"
        imageAlt="Blick in ein Zimmer des Hotels"
        eyebrow="Karriere · Familie Siegel sucht Verstärkung"
        title="Werden Sie Teil des Hauses"
        height="54vh"
        minHeight={420}
      />

      <section className="ps-two-col" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 28px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Arbeiten bei uns
          </span>
          <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", margin: "16px 0 20px", color: "#22331f" }}>
            Kein Konzern. Eine Familie.
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.85, color: "#454e40" }}>
            Bei uns zählt der Mensch, Gast wie Kollege. Wir arbeiten in einem kleinen, eingespielten
            Team, in dem jede Hand gebraucht und jede Idee gehört wird. Kurze Wege, ein fairer Umgang
            und ein Chef, der selbst mit anpackt, gehören für uns einfach dazu.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {[
            { h: "Faire Bezahlung", s: "plus Trinkgeld und Zuschläge" },
            { h: "Planbare Dienste", s: "verlässliche Dienstpläne" },
            { h: "Regionale Küche", s: "Handwerk statt Convenience" },
            { h: "Weiterbildung", s: "wir fördern Talente" },
          ].map((b) => (
            <div key={b.h} style={{ background: "#f0ebdd", borderRadius: 6, padding: 24 }}>
              <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "#b8935a", marginBottom: 6 }}>◈</div>
              <strong style={{ fontSize: 15, color: "#22331f" }}>{b.h}</strong>
              <p style={{ fontSize: 13.5, color: "#5c6153", marginTop: 4, lineHeight: 1.6 }}>{b.s}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "50px 28px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Offene Stellen
          </span>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,44px)", marginTop: 14, color: "#22331f" }}>
            Wir freuen uns auf Sie
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {jobs.map((j) => (
            <div
              key={j.h}
              className="card lift ps-job-row"
              style={{
                background: j.dark ? "#20402a" : "#fff",
                color: j.dark ? "#f0e8d3" : undefined,
                border: j.dark ? "none" : "1px solid #e6dcc5",
                borderRadius: 6,
                padding: "26px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {j.dark && (
                <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={110} height={110} style={{ position: "absolute", right: -14, bottom: -14, width: 110, height: "auto", opacity: 0.1 }} />
              )}
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 24, color: j.dark ? "#f0e8d3" : "#22331f", fontFamily: "var(--font-display)" }}>{j.h}</h3>
                  <span style={{ fontSize: 11, background: j.dark ? "#c2a05e" : "#e7f0e7", color: j.dark ? "#20331f" : "#2a5537", padding: "3px 9px", borderRadius: 2, fontWeight: 700 }}>
                    {j.tag}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: j.dark ? "#cfc9b5" : "#5c6153" }}>{j.p}</p>
              </div>
              <Link href="/buchung" className="btn-gold" style={{ whiteSpace: "nowrap" }}>
                {j.cta}
              </Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: "#5c6153", marginTop: 34 }}>
          Keine passende Stelle dabei? Wir freuen uns auch über Ihre Initiativbewerbung an{" "}
          <a href={`mailto:${site.emailJobs}`} style={{ color: "#2a5537", fontWeight: 700 }}>
            {site.emailJobs}
          </a>
        </p>
      </section>

      <style>{`
        @media (max-width: 620px) {
          .ps-job-row { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </>
  );
}
