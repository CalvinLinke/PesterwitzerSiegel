import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Feiern & Tagen",
  description:
    "Hochzeiten, Familienfeiern, Firmenfeiern, Tagungen und Trauerfeiern im Hotel Pesterwitzer Siegel mit Restaurant Albertheim. Festtafel mit Elbtalblick, Menüs und Büfetts für jeden Anlass.",
  path: "/feiern-und-tagen",
  keywords: ["Hochzeit Freital", "Feiern Dresden Umgebung", "Tagungsraum Dresden", "Firmenfeier Pesterwitz"],
});

const occasions = [
  { icon: "♥", h: "Hochzeiten", p: "Der schönste Tag mit Elbtalblick, festlicher Tafel und Zimmern für das Brautpaar und die Gäste." },
  { icon: "✦", h: "Familienfeiern", p: "Taufe, runder Geburtstag oder Jubiläum, gemütlich beisammen bei gutem Essen und gutem Wein." },
  { icon: "◆", h: "Firmenfeiern", p: "Weihnachtsfeier, Sommerfest oder Teamtag, wir kümmern uns und Sie genießen den Abend." },
  { icon: "◈", h: "Tagungen & Seminare", p: "Tageslicht, moderne Technik und Pausen, die schmecken, für konzentriertes Arbeiten." },
  { icon: "❦", h: "Trauerfeiern", p: "In würdevollem Rahmen begleiten wir Sie mit Feingefühl und einem liebevoll gedeckten Tisch." },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        image="/media/festtafel.jpg"
        imageAlt="Große festlich gedeckte Tafel"
        eyebrow="Feiern · Tagen · Festtafeln"
        title="Ihre schönsten Anlässe"
        subtitle="Vom kleinen Familienkreis bis zur großen Festtafel schaffen wir den Rahmen und Sie den Anlass."
        height="58vh"
        minHeight={440}
      />

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 28px 40px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 52px" }}>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Anlässe
          </span>
          <h2 style={{ fontSize: "clamp(30px,3.8vw,48px)", marginTop: 14, color: "#22331f" }}>
            Für jeden Grund zu feiern
          </h2>
        </div>
        <div className="ps-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
          {occasions.map((o) => (
            <div key={o.h} className="card lift" style={{ background: "#fff", border: "1px solid #e6dcc5", borderRadius: 6, padding: 34 }}>
              <div aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: 34, color: "#c2a05e", marginBottom: 12 }}>{o.icon}</div>
              <h3 style={{ fontSize: 26, color: "#22331f", marginBottom: 10 }}>{o.h}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#5c6153" }}>{o.p}</p>
            </div>
          ))}
          <div className="card lift" style={{ background: "#20402a", color: "#f0e8d3", borderRadius: 6, padding: 34, position: "relative", overflow: "hidden" }}>
            <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={120} height={120} style={{ position: "absolute", right: -16, bottom: -16, width: 120, height: "auto", opacity: 0.1 }} />
            <h3 style={{ fontSize: 26, marginBottom: 10, fontFamily: "var(--font-display)" }}>Ihr Anlass fehlt?</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#cfc9b5", marginBottom: 18 }}>
              Erzählen Sie uns davon, wir finden gemeinsam den passenden Rahmen für Ihren Tag.
            </p>
            <Link href="/buchung" className="btn-gold">
              Unverbindlich anfragen
            </Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "70px 28px 40px" }}>
        <div className="ps-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          {[
            { eyebrow: "Menüselbstauswahl", h: "Ihr Menü, Ihre Wahl", p: "Stellen Sie sich aus unseren Vorschlägen Ihr ganz persönliches Festmenü zusammen, Gang für Gang, abgestimmt auf Ihre Gäste und den Anlass.", cta: "Vorschläge anfragen →" },
            { eyebrow: "Büfettvorschläge", h: "Reich gedeckte Tafeln", p: "Vom sächsischen Landbüfett bis zum festlichen Menübüfett, üppig, regional und für jede Gruppengröße passend.", cta: "Büfetts ansehen →" },
          ].map((c) => (
            <div key={c.h} style={{ background: "#f0ebdd", borderRadius: 6, padding: 44, borderLeft: "4px solid #c2a05e" }}>
              <span className="eyebrow" style={{ color: "#b8935a" }}>{c.eyebrow}</span>
              <h3 style={{ fontSize: 30, color: "#22331f", margin: "12px 0 14px" }}>{c.h}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#454e40", marginBottom: 18 }}>{c.p}</p>
              <Link href="/buchung" style={{ fontWeight: 700, fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", color: "#2a5537" }}>
                {c.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="ps-two-col" style={{ maxWidth: 1280, margin: "0 auto", padding: "70px 28px 96px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <Image src="/media/tagungen-02.jpg" alt="Tagungsraum mit flexibler Bestuhlung" width={640} height={420} style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 5, boxShadow: "0 26px 60px rgba(23,48,31,.18)" }} />
        </div>
        <div>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Der Tagungsraum
          </span>
          <h2 style={{ fontSize: "clamp(28px,3.4vw,42px)", margin: "16px 0 20px", color: "#22331f" }}>
            Konzentriert tagen, gut versorgt sein
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 26 }}>
            {[
              "Bis zu 40 Personen mit flexibler Bestuhlung",
              "Beamer, Leinwand und WLAN inklusive",
              "Tageslicht und Pausen mit regionaler Verpflegung",
              "Übernachtung für Ihre Gäste direkt im Haus",
            ].map((b) => (
              <div key={b} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span aria-hidden="true" style={{ color: "#c2a05e" }}>◈</span>
                <span style={{ fontSize: 15, color: "#3a4235" }}>{b}</span>
              </div>
            ))}
          </div>
          <Link href="/buchung" className="btn-gold">
            Tagung anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
