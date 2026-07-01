import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Hotel & Zimmer",
  description:
    "Wohnliche Zimmer, ein ehrliches Frühstück und die kleinen Besonderheiten im familiär geführten 3-Sterne-Hotel Pesterwitzer Siegel bei Dresden. Einzel-, Doppel- und Familienzimmer.",
  path: "/hotel",
  keywords: ["Hotel Freital Zimmer", "3 Sterne Hotel Dresden", "Zimmer buchen Pesterwitz", "Familienzimmer Dresden"],
});

const chip: React.CSSProperties = {
  fontSize: 11.5,
  background: "#f0ebdd",
  color: "#3a4235",
  padding: "5px 10px",
  borderRadius: 2,
};

export default function HotelPage() {
  return (
    <>
      <PageHero
        image="/media/ps-aussen-01-large.jpg"
        imageAlt="Außenansicht des Hotels Pesterwitzer Siegel"
        eyebrow="Das Hotel · 3 Sterne · Familiär geführt"
        title="Schlafen mit Aussicht"
        subtitle="Wohnliche Zimmer, ein ehrliches Frühstück und die kleinen Besonderheiten, die aus einer Übernachtung einen Aufenthalt machen."
      />

      {/* BESONDERHEITEN */}
      <section className="ps-two-col" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Die kleinen Besonderheiten
          </span>
          <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", margin: "16px 0 22px", color: "#22331f" }}>
            Es sind die Details, die bleiben.
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.85, color: "#454e40", marginBottom: 26 }}>
            Jedes unserer Zimmer ist individuell eingerichtet, kein Zimmer gleicht dem anderen. Was
            sie verbindet, ist ein gutes Bett, ruhige Nächte und der Blick ins Grüne. Und morgens ein
            Frühstück, für das wir bei Bäcker, Fleischer und Winzern aus der Nachbarschaft einkaufen.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { t: "Regionales Frühstück", s: "aus der Nachbarschaft" },
              { t: "Kostenfreies WLAN", s: "im ganzen Haus" },
              { t: "Parkplatz & Garage", s: "sicher direkt am Haus" },
              { t: "Gästegarten", s: "mit Elbtalblick" },
            ].map((f) => (
              <div key={f.t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span aria-hidden="true" style={{ color: "#c2a05e", fontSize: 18 }}>◈</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "#3a4235" }}>
                  <strong style={{ color: "#22331f" }}>{f.t}</strong>
                  <br />
                  {f.s}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Image src="/media/hotelbett-01.jpg" alt="Gemütliches Doppelzimmer mit Blick ins Grüne" width={640} height={480} style={{ width: "100%", height: 480, objectFit: "cover", borderRadius: 5, boxShadow: "0 26px 60px rgba(23,48,31,.2)" }} />
          <div style={{ position: "absolute", bottom: -22, right: -22, background: "#c2a05e", color: "#20331f", padding: "22px 26px", borderRadius: 4, maxWidth: 220, boxShadow: "0 16px 40px rgba(120,90,30,.3)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1 }}>★★★</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Mit 3 Sternen ausgezeichnet</div>
          </div>
        </div>
      </section>

      {/* ZIMMER */}
      <section style={{ background: "#f0ebdd", padding: "90px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <span className="eyebrow" style={{ color: "#b8935a" }}>
              Unsere Zimmer
            </span>
            <h2 style={{ fontSize: "clamp(32px,4vw,50px)", marginTop: 14, color: "#22331f" }}>
              Finden Sie Ihr Zimmer
            </h2>
          </div>
          <div className="ps-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {[
              { img: "/media/hotelbett-01.jpg", h: "Einzelzimmer", price: "ab 74 €", p: "Kompakt und ruhig, ideal für Geschäftsreisende und Städtebesucher. Inklusive Frühstück.", chips: ["Dusche/WC", "TV · WLAN", "Schreibtisch"], featured: false },
              { img: "/media/festtafel.jpg", h: "Doppelzimmer", price: "ab 98 €", p: "Unser Klassiker mit Wohlfühlfaktor. Viele mit Blick über das Elbtal. Inklusive Frühstück.", chips: ["Elbtalblick", "Queensize-Bett", "Sitzecke"], featured: true },
              { img: "/media/ps-aussen-01-large.jpg", h: "Familienzimmer", price: "ab 132 €", p: "Großzügig für die ganze Familie, mit viel Platz zum Ausbreiten. Inklusive Frühstück für alle.", chips: ["Bis 4 Personen", "Extra Platz", "Familienbad"], featured: false },
            ].map((z) => (
              <div key={z.h} className="card lift" style={{ background: "#fff", borderRadius: 6, overflow: "hidden", border: z.featured ? "2px solid #c2a05e" : "1px solid #e6dcc5", position: "relative", boxShadow: z.featured ? "0 18px 44px rgba(120,90,30,.14)" : undefined }}>
                {z.featured && (
                  <div style={{ position: "absolute", top: 14, right: 14, zIndex: 2, background: "#c2a05e", color: "#20331f", fontWeight: 700, fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 2 }}>
                    Beliebt
                  </div>
                )}
                <div style={{ height: 230, position: "relative" }} className="ph">
                  <Image src={z.img} alt={`Zimmerbeispiel ${z.h}`} fill sizes="(max-width: 900px) 100vw, 400px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: 27, color: "#22331f" }}>{z.h}</h3>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#2a5537" }}>{z.price}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#5c6153", lineHeight: 1.7, margin: "10px 0 18px" }}>{z.p}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {z.chips.map((c) => (
                      <span key={c} style={chip}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "#8a8f80", marginTop: 24 }}>
            Alle Preise gelten pro Nacht inklusive Frühstück. Kurtaxe und Endreinigung sind inklusive, Kinder bis 6 Jahre wohnen frei.
          </p>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Link href="/buchung" className="btn-gold">
              Verfügbarkeit & Preise prüfen
            </Link>
          </div>
        </div>
      </section>

      {/* TAGUNGEN TEASER */}
      <section className="ps-two-col" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <div style={{ position: "relative", order: 2 }}>
          <Image src="/media/tagungen-02.jpg" alt="Heller Tagungsraum mit Tageslicht" width={640} height={420} style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 5, boxShadow: "0 26px 60px rgba(23,48,31,.18)" }} />
        </div>
        <div style={{ order: 1 }}>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Tagen & Besprechen
          </span>
          <h2 style={{ fontSize: "clamp(30px,3.6vw,44px)", margin: "16px 0 20px", color: "#22331f" }}>
            Der Tagungsraum mit Weitblick
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.85, color: "#454e40", marginBottom: 24 }}>
            Konzentriert arbeiten und dabei gut versorgt sein, das gelingt in unserem Tagungsraum mit
            zeitgemäßer Technik, viel Tageslicht und einem Service, der mitdenkt. Für Workshops,
            Seminare oder Klausuren, mit Pausen, die auch wirklich schmecken.
          </p>
          <Link href="/feiern-und-tagen" className="btn-ghost">
            Zu Feiern & Tagen
          </Link>
        </div>
      </section>
    </>
  );
}
