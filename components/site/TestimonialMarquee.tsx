"use client";

import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  place: string;
  dark?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Man wird empfangen, als käme man zu Freunden. Das Frühstück ist ehrlich und regional, der Blick vom Garten ist unbezahlbar.",
    name: "Familie Bergmann",
    place: "Leipzig · Juni 2026",
  },
  {
    quote:
      "Das Menü im Albertheim war der Höhepunkt unserer Dresden-Reise. Regional, liebevoll und mit einem Wein direkt vom Hang nebenan.",
    name: "Thomas & Anke R.",
    place: "München · Mai 2026",
    dark: true,
  },
  {
    quote:
      "Eine ideale Basis für unsere Motorradtour. Sichere Garage, super Tipps von der Familie und abends sächsische Gemütlichkeit pur.",
    name: "Jörg Neumann",
    place: "Nürnberg · April 2026",
  },
  {
    quote:
      "Wir haben bei Familie Siegel unsere Hochzeit gefeiert und würden es sofort wieder tun. Herzlich, unkompliziert und mit einer Tafel, über die alle noch reden.",
    name: "Lena & Paul",
    place: "Dresden · September 2026",
    dark: true,
  },
  {
    quote:
      "Für unsere Firmentagung genau richtig. Ruhige Zimmer, ein Team, das mitdenkt, und Pausen, die wirklich geschmeckt haben.",
    name: "Kerstin Vogt",
    place: "Chemnitz · März 2026",
  },
];

function Card({ t }: { t: Testimonial }) {
  const dark = t.dark;
  return (
    <figure
      style={{
        flex: "0 0 auto",
        width: 380,
        maxWidth: "82vw",
        margin: 0,
        background: dark ? "#20402a" : "#fff",
        color: dark ? "#f0e8d3" : undefined,
        border: dark ? "none" : "1px solid #eadfc9",
        borderRadius: 6,
        padding: 34,
        boxShadow: dark ? "0 18px 44px rgba(23,48,31,.2)" : "0 10px 30px rgba(23,48,31,.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {dark && (
        <Image
          src="/siegel-mark.png"
          alt=""
          aria-hidden="true"
          width={150}
          height={150}
          style={{ position: "absolute", right: -20, bottom: -20, width: 150, height: "auto", opacity: 0.08 }}
        />
      )}
      <div style={{ color: dark ? "#e0c88d" : "#c2a05e", fontSize: 18, letterSpacing: 3, marginBottom: 16 }}>
        ★★★★★
      </div>
      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 21,
          lineHeight: 1.5,
          color: dark ? "#f0e8d3" : "#2f3a2a",
          fontStyle: "italic",
          margin: "0 0 22px",
          position: "relative",
        }}
      >
        „{t.quote}“
      </blockquote>
      <figcaption>
        <div style={{ fontWeight: 700, fontSize: 14, color: dark ? "#f0e8d3" : "#22331f" }}>{t.name}</div>
        <div style={{ fontSize: 13, color: dark ? "#b7b39e" : "#8a8f80" }}>{t.place}</div>
      </figcaption>
    </figure>
  );
}

/**
 * Durchlaufendes Testimonial-Band. Die Liste wird zweimal gerendert, damit die
 * Schleife nahtlos wirkt. Bei Hover pausiert die Bewegung; wer „Bewegung
 * reduzieren“ eingestellt hat, sieht die Karten still (Styles in globals.css).
 */
export default function TestimonialMarquee() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className="ps-marquee" aria-label="Gästestimmen">
      <div className="ps-marquee-track">
        {doubled.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </div>
    </div>
  );
}
