import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import MenuDisplay from "@/components/site/MenuDisplay";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
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
        <div
          style={{
            background: "#20402a",
            color: "#f0e8d3",
            borderRadius: 10,
            borderTop: "4px solid #c2a05e",
            boxShadow: "0 30px 70px rgba(6,18,11,.4),0 8px 22px rgba(6,18,11,.22)",
            padding: "34px 34px 36px",
            overflow: "hidden",
            position: "sticky",
            top: 96,
          }}
        >
          <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={160} height={160} style={{ position: "absolute", right: -26, bottom: -26, width: 160, height: "auto", opacity: 0.08 }} />
          <div className="eyebrow" style={{ color: "#e0c88d", marginBottom: 8, position: "relative" }}>
            Reservierung
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "#f7f1e0", margin: "0 0 6px", position: "relative" }}>
            Ihr Tisch im Albertheim
          </h3>
          <p style={{ fontSize: 14, color: "#cfc9b5", lineHeight: 1.6, marginBottom: 22, position: "relative" }}>
            Sagen Sie uns Tag, Uhrzeit und Personenzahl. Wir bestätigen Ihnen persönlich.
          </p>
          <Link
            href="/buchung?anliegen=tisch"
            className="btn-gold"
            style={{ width: "100%", justifyContent: "center", fontSize: 13.5, padding: "16px 26px", position: "relative" }}
          >
            Tisch reservieren
          </Link>
          <a
            href={`tel:${site.phoneRestaurant.replace(/\s/g, "")}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 12,
              fontSize: 14,
              color: "#e0c88d",
              position: "relative",
            }}
          >
            Lieber anrufen? {site.phoneRestaurantDisplay}
          </a>

          <div
            style={{
              marginTop: 24,
              paddingTop: 22,
              borderTop: "1px solid rgba(224,200,141,.2)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              fontSize: 14.5,
              position: "relative",
            }}
          >
            <div className="eyebrow" style={{ color: "#e0c88d", fontSize: 11, marginBottom: 2 }}>
              Öffnungszeiten
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Mittwoch bis Freitag</span>
              <span style={{ color: "#e0c88d" }}>ab 17:00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Samstag und Sonntag</span>
              <span style={{ color: "#e0c88d" }}>ab 11:30</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Montag und Dienstag</span>
              <span style={{ color: "#b7b39e" }}>Ruhetag</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Hotelgäste</span>
              <span style={{ color: "#e0c88d" }}>täglich</span>
            </div>
          </div>
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
