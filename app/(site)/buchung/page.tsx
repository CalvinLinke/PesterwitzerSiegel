import Image from "next/image";
import type { Metadata } from "next";
import BookingForm from "@/components/site/BookingForm";
import ConsentMap from "@/components/site/ConsentMap";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Buchung & Kontakt",
  description:
    "Zimmer buchen, Tisch reservieren oder eine Feier anfragen im Hotel Pesterwitzer Siegel. Kontakt, Adresse und Anfahrt nach Freital-Pesterwitz bei Dresden.",
  path: "/buchung",
  keywords: ["Zimmer buchen Freital", "Tisch reservieren Albertheim", "Kontakt Hotel Pesterwitz", "Anfahrt Pesterwitzer Siegel"],
});

export const dynamic = "force-dynamic";

type BookingTab = "hotel" | "tisch" | "event" | "bewerbung";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ anliegen?: string; stelle?: string }>;
}) {
  const { anliegen, stelle } = await searchParams;
  const isBewerbung = anliegen === "bewerbung";
  const allowedTabs: BookingTab[] = ["hotel", "tisch", "event", "bewerbung"];
  const initialTab: BookingTab | undefined =
    anliegen && allowedTabs.includes(anliegen as BookingTab) ? (anliegen as BookingTab) : undefined;
  const heading = isBewerbung ? "Schön, dass Sie zu uns möchten" : "Wir halten Ihnen einen Platz frei";
  const intro = isBewerbung
    ? "Wählen Sie die passende Stelle und erzählen Sie uns ein wenig von sich. Wir melden uns persönlich bei Ihnen."
    : "Zimmer, Tisch oder Festtafel, sagen Sie uns einfach, was Sie vorhaben. Wir melden uns persönlich bei Ihnen.";

  return (
    <>
      <section style={{ padding: "128px 0 64px", background: "#20402a", position: "relative", overflow: "hidden" }}>
        <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={360} height={360} style={{ position: "absolute", right: -40, top: 40, width: 360, height: "auto", opacity: 0.06 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 28px 0", position: "relative" }}>
          <div style={{ textAlign: "center", color: "#f0e8d3", marginBottom: 10 }}>
            <span className="eyebrow" style={{ color: "#e0c88d" }}>
              {isBewerbung ? "Karriere & Kontakt" : "Buchung & Kontakt"}
            </span>
          </div>
          <h1 style={{ textAlign: "center", fontSize: "clamp(38px,5vw,68px)", color: "#f7f1e0", marginBottom: 16 }}>
            {heading}
          </h1>
          <p style={{ textAlign: "center", fontSize: 17, color: "#cfc9b5", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
            {intro}
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "-56px auto 0", padding: "0 28px 120px", position: "relative", zIndex: 2 }}>
        <div className="ps-booking-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 44, alignItems: "start" }}>
          <div style={{ background: "#f6f1e6", borderRadius: 8, boxShadow: "0 30px 70px rgba(0,0,0,.22)", padding: "48px 50px" }}>
            <BookingForm variant="full" initialTab={initialTab} initialStelle={stelle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "#17301f", color: "#e9e2cf", borderRadius: 8, padding: 36, position: "relative", overflow: "hidden" }}>
              <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={130} height={130} style={{ position: "absolute", right: -18, bottom: -18, width: 130, height: "auto", opacity: 0.1 }} />
              <div className="eyebrow" style={{ color: "#e0c88d", marginBottom: 20, position: "relative" }}>
                So erreichen Sie uns
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14.5, position: "relative" }}>
                <div>
                  <div style={{ color: "#9c9884", fontSize: 12, marginBottom: 2 }}>Adresse</div>
                  {site.addressLine}
                </div>
                <div>
                  <div style={{ color: "#9c9884", fontSize: 12, marginBottom: 2 }}>Hotel & Rezeption</div>
                  <a href={`tel:${site.phoneHotel.replace(/\s/g, "")}`} style={{ color: "#e0c88d" }}>
                    {site.phoneHotelDisplay}
                  </a>
                </div>
                <div>
                  <div style={{ color: "#9c9884", fontSize: 12, marginBottom: 2 }}>Restaurant Albertheim</div>
                  <a href={`tel:${site.phoneRestaurant.replace(/\s/g, "")}`} style={{ color: "#e0c88d" }}>
                    {site.phoneRestaurantDisplay}
                  </a>
                </div>
                <div>
                  <div style={{ color: "#9c9884", fontSize: 12, marginBottom: 2 }}>E-Mail</div>
                  <a href={`mailto:${site.email}`} style={{ color: "#e0c88d" }}>
                    {site.email}
                  </a>
                </div>
              </div>
            </div>

            <ConsentMap />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .ps-booking-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
