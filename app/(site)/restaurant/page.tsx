import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import MenuDisplay from "@/components/site/MenuDisplay";
import { pageMeta } from "@/lib/seo";
import { getMenu } from "@/lib/menu/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMeta({
  title: "Restaurant Albertheim",
  description:
    "Frische, regionale Küche im historischen Albertheim, begleitet von Pesterwitzer Wein vom Hang nebenan. Abendkarte, Mittagstisch und Weinkarte im Hotel Pesterwitzer Siegel.",
  path: "/restaurant",
  keywords: ["Restaurant Albertheim", "Restaurant Pesterwitz", "regionale Küche Dresden", "sächsische Küche"],
});

export default async function RestaurantPage() {
  const menu = await getMenu();

  return (
    <>
      <PageHero
        image="/media/festtafel.jpg"
        imageAlt="Festlich gedeckte Tafel im Restaurant Albertheim"
        eyebrow="Restaurant Albertheim · seit Generationen"
        title="Albertheim"
        titleItalic
        subtitle="Frische, abwechslungsreiche und regionale Küche im historischen Gewölbe, begleitet von einem Gläschen Pesterwitzer Wein direkt vom Hang nebenan."
        height="64vh"
        minHeight={480}
        siegelSide="left"
      />

      {/* INTRO + ÖFFNUNGSZEITEN */}
      <section
        className="ps-restaurant-intro"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 28px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60, alignItems: "start" }}
      >
        <div>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Unsere Küche
          </span>
          <h2 style={{ fontSize: "clamp(30px,3.8vw,48px)", margin: "16px 0 22px", color: "#22331f" }}>
            Regional gedacht, ehrlich gekocht.
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.85, color: "#454e40", marginBottom: 18 }}>
            Was bei uns auf den Teller kommt, wächst am liebsten in der Nähe. Wir kochen mit dem, was
            die sächsische Jahreszeit hergibt, von der kräftigen Sauerbraten-Tradition bis zum
            leichten Sommergericht aus dem eigenen Garten.
          </p>
          <p style={{ fontSize: 16.5, lineHeight: 1.85, color: "#454e40" }}>
            Dazu genießen Sie einen Wein vom Pesterwitzer Jochhöhschlößchen, den Blick über das Elbtal
            und einen Service, der sich Zeit nimmt. Ob zum Mittag, zum Abend oder zur großen
            Familientafel, bei uns dürfen Sie in Ruhe bleiben.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 30 }}>
            <Image src="/siegel-mark.png" alt="" width={46} height={46} style={{ height: 46, width: "auto" }} />
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 23, color: "#2a5537" }}>
              Küchenchef und Familie Siegel
            </span>
          </div>
        </div>
        <div style={{ background: "#20402a", color: "#f0e8d3", borderRadius: 6, padding: 34, position: "relative", overflow: "hidden" }}>
          <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={150} height={150} style={{ position: "absolute", right: -24, bottom: -24, width: 150, height: "auto", opacity: 0.08 }} />
          <div className="eyebrow" style={{ color: "#e0c88d", marginBottom: 20 }}>
            Öffnungszeiten
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 15 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(224,200,141,.2)", paddingBottom: 12 }}>
              <span>Mittwoch bis Freitag</span>
              <span style={{ color: "#e0c88d" }}>ab 17:00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(224,200,141,.2)", paddingBottom: 12 }}>
              <span>Samstag und Sonntag</span>
              <span style={{ color: "#e0c88d" }}>ab 11:30</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(224,200,141,.2)", paddingBottom: 12 }}>
              <span>Montag und Dienstag</span>
              <span style={{ color: "#b7b39e" }}>Ruhetag</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Hotelgäste</span>
              <span style={{ color: "#e0c88d" }}>täglich</span>
            </div>
          </div>
          <Link href="/buchung" className="btn-gold" style={{ marginTop: 26, width: "100%", justifyContent: "center" }}>
            Tisch reservieren
          </Link>
        </div>
      </section>

      {/* SPEISEKARTE */}
      <section style={{ background: "#20402a", padding: "96px 0", position: "relative", overflow: "hidden" }}>
        <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={420} height={420} style={{ position: "absolute", left: "50%", top: 0, transform: "translate(-50%,-30%)", width: 420, height: "auto", opacity: 0.05 }} />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 28px", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <span className="eyebrow" style={{ color: "#e0c88d" }}>
              Die Karte
            </span>
          </div>
          <h2 style={{ textAlign: "center", fontSize: "clamp(34px,4.4vw,56px)", color: "#f7f1e0", marginBottom: 36 }}>
            Was heute auf den Tisch kommt
          </h2>
          <MenuDisplay data={menu} />
        </div>
      </section>

      {/* FEIER TEASER */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 28px", textAlign: "center" }}>
        <span className="eyebrow" style={{ color: "#b8935a" }}>
          Große Tafel gefällig?
        </span>
        <h2 style={{ fontSize: "clamp(30px,3.8vw,48px)", margin: "16px 0 18px", color: "#22331f" }}>
          Feiern Sie im Albertheim
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.75, color: "#454e40", maxWidth: 600, margin: "0 auto 30px" }}>
          Ob Hochzeit, runder Geburtstag oder Firmenfeier, wir richten Ihre Festtafel aus. Mit Menüs
          zum Selbstzusammenstellen und Büfettvorschlägen für jeden Anlass.
        </p>
        <Link href="/feiern-und-tagen" className="btn-gold">
          Feiern & Tagen entdecken
        </Link>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .ps-restaurant-intro { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </>
  );
}
