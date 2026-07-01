import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeroHome from "@/components/site/HeroHome";
import BookingForm from "@/components/site/BookingForm";
import Reveal from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Hotel & Restaurant auf der Pesterwitzer Höhe",
  description:
    "Familiär geführtes 3-Sterne-Hotel mit Restaurant Albertheim über dem Elbtal, sechs Kilometer von Dresden. Zimmer buchen, Tisch reservieren und sächsische Gemütlichkeit genießen.",
  path: "/",
  keywords: ["Hotel Freital", "Hotel Dresden Umgebung", "Restaurant Albertheim", "Pesterwitz"],
});

const cardBase: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eadfc9",
  borderRadius: 8,
  boxShadow: "0 8px 26px rgba(23,48,31,.05)",
};

export default function HomePage() {
  return (
    <>
      <HeroHome />

      {/* FUNNEL, hakt in den Hero ein */}
      <section
        style={{
          position: "relative",
          background:
            "linear-gradient(180deg,#0a1c12 0%,#0a1c12 40px,#e9e0cd 170px,#f6f1e6 300px,#f6f1e6 100%)",
          padding: "0 0 84px",
        }}
      >
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 28px", position: "relative" }}>
          <div
            style={{
              background: "#fbf8f1",
              border: "1px solid rgba(194,160,94,.35)",
              borderTop: "4px solid #c2a05e",
              borderRadius: 12,
              boxShadow: "0 46px 90px rgba(6,18,11,.5),0 10px 26px rgba(6,18,11,.22)",
              margin: "-190px auto 0",
              padding: "32px 40px 40px",
              position: "relative",
              zIndex: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 18,
                flexWrap: "wrap",
                marginBottom: 22,
                paddingBottom: 20,
                borderBottom: "1px solid #ece2cc",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Image src="/siegel-mark.png" alt="" width={44} height={44} style={{ height: 44, width: "auto" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#22331f", lineHeight: 1.02 }}>
                    Ihr Aufenthalt beginnt hier
                  </div>
                  <div style={{ fontSize: 13, color: "#6a6f60", marginTop: 3 }}>
                    Zimmer, Tisch oder Festtafel in wenigen Klicks angefragt
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: "#5c6153", fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a8a5a", boxShadow: "0 0 0 3px rgba(74,138,90,.18)" }} />
                Persönliche Rückmeldung durch Familie Siegel
              </div>
            </div>
            <BookingForm variant="compact" />
          </div>
        </div>
      </section>

      {/* WILLKOMMEN */}
      <Reveal
        as="section"
        className="ps-two-col"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "110px 28px 90px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 70,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            aria-hidden="true"
            style={{ position: "absolute", top: -34, left: -34, fontFamily: "var(--font-display)", fontSize: 150, color: "#e7dcc2", lineHeight: 1, zIndex: 0, fontStyle: "italic" }}
          >
            „
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="eyebrow" style={{ color: "#b8935a" }}>
              Willkommen · Familie Siegel
            </span>
            <h2 style={{ fontSize: "clamp(34px,4vw,52px)", lineHeight: 1.08, margin: "18px 0 24px", color: "#22331f" }}>
              Ein Haus, das sich anfühlt wie ankommen.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#454e40", marginBottom: 18 }}>
              Auf der Pesterwitzer Höhe, mit Blick über das Elbtal bis zur Frauenkirche, führen wir
              unser 3-Sterne-Haus so, wie wir selbst gern zu Gast sind. Persönlich, warmherzig und
              ohne Allüren. Bei uns buchen Sie keine Übernachtung von der Stange, sondern kommen für
              ein paar Tage nach Hause.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#454e40", marginBottom: 30 }}>
              Morgens gibt es ein Frühstück aus der Region, tagsüber liegt Dresden direkt vor der Tür
              und abends genießen Sie ein Gläschen Pesterwitzer Wein im Gästegarten. Das ist die
              sprichwörtliche sächsische Gemütlichkeit, und die meinen wir ernst.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Image src="/siegel-mark.png" alt="" width={52} height={52} style={{ height: 52, width: "auto" }} />
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, color: "#2a5537" }}>
                Herzlichst, Ihre Familie Siegel
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 24, left: 24, right: -24, bottom: -24, border: "1.5px solid #c2a05e", borderRadius: 4, zIndex: 0 }} />
          <Image
            src="/media/hotelbett-01.jpg"
            alt="Wohnliches Hotelzimmer im Pesterwitzer Siegel"
            width={640}
            height={520}
            style={{ position: "relative", zIndex: 1, width: "100%", height: 520, objectFit: "cover", borderRadius: 4, boxShadow: "0 30px 70px rgba(23,48,31,.22)" }}
          />
        </div>
      </Reveal>

      {/* BESONDERHEITEN */}
      <Reveal as="section" style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 28px 80px" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 52px" }}>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Die kleinen Besonderheiten
          </span>
          <h2 style={{ fontSize: "clamp(32px,4vw,50px)", marginTop: 16, color: "#22331f" }}>
            Warum Gäste wiederkommen
          </h2>
        </div>
        <div className="ps-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22 }}>
          {[
            { big: "6 km", h: "Bis zur Altstadt", p: "Semperoper, Zwinger und Frauenkirche liegen nur eine kurze Fahrt entfernt." },
            { big: "★★★", h: "Familiär geführt", p: "Ein privates 3-Sterne-Haus, in dem man Ihren Namen noch kennt." },
            { big: "◈", h: "Elbtalblick", p: "Weite Sicht über das Tal, am schönsten mit einem Wein im Gästegarten." },
            { big: "☺", h: "Für Aktive", p: "Touren zum Wandern, Rad- und Motorradfahren beginnen direkt vor der Haustür." },
          ].map((c) => (
            <div key={c.h} className="card lift" style={{ ...cardBase, textAlign: "center", padding: "34px 22px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 48, color: "#b8935a", marginBottom: 6, lineHeight: 1 }}>
                {c.big}
              </div>
              <h3 style={{ fontSize: 22, marginBottom: 8, color: "#22331f" }}>{c.h}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5c6153" }}>{c.p}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ZWEI WELTEN */}
      <Reveal as="section" style={{ background: "#20402a", color: "#f0e8d3", position: "relative", overflow: "hidden" }}>
        <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={520} height={520} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 520, height: "auto", opacity: 0.05 }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 28px", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="eyebrow" style={{ color: "#e0c88d" }}>
              Zwei Welten unter einem Siegel
            </span>
            <h2 style={{ fontSize: "clamp(34px,4.4vw,58px)", marginTop: 16, color: "#f7f1e0" }}>
              Hotel & Restaurant Albertheim
            </h2>
          </div>
          <div className="ps-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 34 }}>
            {[
              { href: "/hotel", img: "/media/ps-aussen-01-large.jpg", alt: "Außenansicht des Hotels", eyebrow: "Das Hotel", h: "Schlafen & Ankommen", p: "Wohnliche Zimmer, ein ehrliches Frühstück und die kleinen Besonderheiten, die den Unterschied machen.", cta: "Zimmer entdecken →" },
              { href: "/restaurant", img: "/media/festtafel.jpg", alt: "Festlich gedeckte Tafel im Restaurant Albertheim", eyebrow: "Das Restaurant", h: "Genießen & Verweilen", p: "Im historischen Albertheim verwöhnen wir Sie mit frischer, regionaler Küche und Weinen aus der Nachbarschaft.", cta: "Zur Speisekarte →" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="card lift" style={{ position: "relative", borderRadius: 6, overflow: "hidden", minHeight: 440, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <Image src={c.img} alt={c.alt} fill sizes="(max-width: 900px) 100vw, 620px" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(23,48,31,.1),rgba(23,48,31,.9))" }} />
                <div style={{ position: "relative", padding: 40 }}>
                  <span className="eyebrow" style={{ color: "#e0c88d" }}>{c.eyebrow}</span>
                  <h3 style={{ fontSize: 38, color: "#fff", margin: "10px 0 12px" }}>{c.h}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "#dcd6c3", maxWidth: 420 }}>{c.p}</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 20, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", fontSize: 12.5, color: "#e0c88d" }}>
                    {c.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ARRANGEMENTS */}
      <Reveal as="section" style={{ maxWidth: 1280, margin: "0 auto", padding: "70px 28px 96px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            <span className="eyebrow" style={{ color: "#b8935a" }}>
              Arrangements & Pauschalen
            </span>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,46px)", marginTop: 14, color: "#22331f" }}>
              Zeit, die man verschenken kann
            </h2>
          </div>
          <Link href="/hotel" className="btn-ghost">
            Alle Angebote
          </Link>
        </div>
        <div className="ps-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
          {[
            { img: "/media/kronentor-05-large.jpg", badge: "2 Nächte", h: "Dresden-Auszeit", p: "Zwei Übernachtungen, Frühstück und ein Abendmenü im Albertheim, die Kultur der Stadt inklusive.", price: "ab 179 €" },
            { img: "/media/festtafel.jpg", badge: "Genuss", h: "Sächsischer Genussabend", p: "Eine Nacht mit einem Vier-Gang-Menü und einer Weinbegleitung vom Pesterwitzer Hang.", price: "ab 145 €" },
            { img: "/media/ps-aussen-01-large.jpg", badge: "Aktiv", h: "Touren-Wochenende", p: "Für Wanderer, Rad- und Motorradfahrer mit Kartenmaterial, Lunchpaket und sicherer Garage.", price: "ab 129 €" },
          ].map((c) => (
            <div key={c.h} className="card lift" style={{ background: "#fff", borderRadius: 6, overflow: "hidden", border: "1px solid #eadfc9", boxShadow: "0 10px 30px rgba(23,48,31,.06)" }}>
              <div style={{ height: 200, position: "relative" }} className="ph">
                <Image src={c.img} alt="" fill sizes="(max-width: 900px) 100vw, 400px" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 14, left: 14, background: "#c2a05e", color: "#20331f", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 2 }}>
                  {c.badge}
                </div>
              </div>
              <div style={{ padding: 26 }}>
                <h3 style={{ fontSize: 26, marginBottom: 8, color: "#22331f" }}>{c.h}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#5c6153", marginBottom: 18 }}>{c.p}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#2a5537" }}>{c.price}</span>
                  <span style={{ fontSize: 12, color: "#8a8f80" }}>pro Person im Doppelzimmer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* DRESDEN BAND */}
      <Reveal as="section" style={{ position: "relative", minHeight: 520, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Image src="/media/kronentor-01.jpg" alt="Kronentor des Dresdner Zwingers" fill sizes="100vw" className="ph" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(15,28,18,.88) 0%,rgba(15,28,18,.5) 55%,rgba(15,28,18,.2) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "80px 28px", width: "100%" }}>
          <div style={{ maxWidth: 560 }}>
            <span className="eyebrow" style={{ color: "#e0c88d" }}>
              Ausflugsziele
            </span>
            <h2 style={{ fontSize: "clamp(34px,4.4vw,56px)", color: "#f7f1e0", margin: "16px 0 20px", lineHeight: 1.06 }}>
              Dresden liegt Ihnen zu Füßen
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: "#e2dcc9", marginBottom: 30 }}>
              Semperoper, Zwinger, Frauenkirche und das Residenzschloss, die Kulturhauptstadt Sachsens
              ist nur eine kurze Fahrt entfernt. Und für ruhigere Tage warten die Sächsische Schweiz
              und das Schloss Burgk in Freital.
            </p>
            <Link href="/ueber-uns" className="btn-gold">
              Unsere Umgebung entdecken
            </Link>
          </div>
        </div>
      </Reveal>

      {/* GÄSTESTIMMEN */}
      <Reveal as="section" style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="eyebrow" style={{ color: "#b8935a" }}>
            Gästestimmen
          </span>
          <h2 style={{ fontSize: "clamp(32px,4vw,50px)", marginTop: 16, color: "#22331f" }}>
            Was unsere Gäste erzählen
          </h2>
        </div>
        <div className="ps-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 26 }}>
          <blockquote style={{ background: "#fff", border: "1px solid #eadfc9", borderRadius: 6, padding: 34, boxShadow: "0 10px 30px rgba(23,48,31,.05)", margin: 0 }}>
            <div style={{ color: "#c2a05e", fontSize: 18, letterSpacing: 3, marginBottom: 16 }}>★★★★★</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.5, color: "#2f3a2a", fontStyle: "italic", marginBottom: 22 }}>
              „Man wird empfangen, als käme man zu Freunden. Das Frühstück ist ehrlich und regional,
              der Blick vom Garten ist unbezahlbar.“
            </p>
            <footer style={{ fontWeight: 700, fontSize: 14, color: "#22331f" }}>Familie Bergmann</footer>
            <div style={{ fontSize: 13, color: "#8a8f80" }}>Leipzig · Juni 2026</div>
          </blockquote>
          <blockquote style={{ background: "#20402a", color: "#f0e8d3", borderRadius: 6, padding: 34, boxShadow: "0 18px 44px rgba(23,48,31,.2)", position: "relative", overflow: "hidden", margin: 0 }}>
            <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={150} height={150} style={{ position: "absolute", right: -20, bottom: -20, width: 150, height: "auto", opacity: 0.08 }} />
            <div style={{ color: "#e0c88d", fontSize: 18, letterSpacing: 3, marginBottom: 16 }}>★★★★★</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.5, fontStyle: "italic", marginBottom: 22, position: "relative" }}>
              „Das Menü im Albertheim war der Höhepunkt unserer Dresden-Reise. Regional, liebevoll und
              mit einem Wein direkt vom Hang nebenan.“
            </p>
            <footer style={{ fontWeight: 700, fontSize: 14 }}>Thomas & Anke R.</footer>
            <div style={{ fontSize: 13, color: "#b7b39e" }}>München · Mai 2026</div>
          </blockquote>
          <blockquote style={{ background: "#fff", border: "1px solid #eadfc9", borderRadius: 6, padding: 34, boxShadow: "0 10px 30px rgba(23,48,31,.05)", margin: 0 }}>
            <div style={{ color: "#c2a05e", fontSize: 18, letterSpacing: 3, marginBottom: 16 }}>★★★★★</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.5, color: "#2f3a2a", fontStyle: "italic", marginBottom: 22 }}>
              „Eine ideale Basis für unsere Motorradtour. Sichere Garage, super Tipps von der Familie
              und abends sächsische Gemütlichkeit pur.“
            </p>
            <footer style={{ fontWeight: 700, fontSize: 14, color: "#22331f" }}>Jörg Neumann</footer>
            <div style={{ fontSize: 13, color: "#8a8f80" }}>Nürnberg · April 2026</div>
          </blockquote>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal as="section" style={{ maxWidth: 1280, margin: "0 auto 96px", padding: "0 28px" }}>
        <div style={{ background: "linear-gradient(120deg,#17301f,#274d33)", borderRadius: 8, padding: "70px 60px", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={200} height={200} style={{ position: "absolute", left: 40, top: "50%", transform: "translateY(-50%)", width: 200, height: "auto", opacity: 0.1 }} />
          <Image src="/siegel-mark.png" alt="" aria-hidden="true" width={200} height={200} style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", width: 200, height: "auto", opacity: 0.1 }} />
          <span className="eyebrow" style={{ color: "#e0c88d" }}>
            Ihre Auszeit wartet
          </span>
          <h2 style={{ fontSize: "clamp(34px,4.6vw,58px)", color: "#f7f1e0", margin: "16px 0 14px" }}>
            Bleiben Sie ein paar Tage.
          </h2>
          <p style={{ fontSize: 17, color: "#d7d0bd", maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Wir halten Ihnen ein Zimmer mit Aussicht und ein Gläschen Pesterwitzer Wein bereit.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/buchung" className="btn-gold">
              Jetzt Zimmer buchen
            </Link>
            <Link
              href="/restaurant"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: "#f6f1e6", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", fontSize: 12.5, padding: "13px 24px", border: "1.5px solid rgba(224,200,141,.5)", borderRadius: 2 }}
            >
              Tisch reservieren
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
