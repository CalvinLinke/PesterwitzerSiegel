"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ps_hero_variant";

/**
 * Startseiten-Hero mit zwei umschaltbaren Varianten (Editorial Arch /
 * Cinematic). Die Wahl wird in localStorage gemerkt. Der Umschalter unten
 * links bleibt erhalten (vom Kunden gewünscht).
 */
export default function HeroHome() {
  const [variant, setVariant] = useState<1 | 2>(1);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "2") setVariant(2);
  }, []);

  function choose(v: 1 | 2) {
    setVariant(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(v));
    } catch {
      /* ignore */
    }
  }

  // Parallaxe des Siegels in Variante 2
  useEffect(() => {
    if (variant !== 2) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const hero = document.getElementById("ps-hero");
        if (!hero) return;
        const r = hero.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
        hero.style.setProperty("--mx", nx.toFixed(3));
        hero.style.setProperty("--my", ny.toFixed(3));
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [variant]);

  return (
    <>
      {variant === 1 ? <HeroV1 /> : <HeroV2 />}

      <div
        role="group"
        aria-label="Hero-Variante wählen"
        style={{
          position: "fixed",
          left: 16,
          bottom: 16,
          zIndex: 70,
          display: "flex",
          gap: 7,
          alignItems: "center",
          background: "rgba(11,26,16,.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(224,200,141,.35)",
          borderRadius: 100,
          padding: "6px 10px 6px 15px",
          boxShadow: "0 12px 30px rgba(0,0,0,.4)",
        }}
      >
        <b
          style={{
            font: "700 9.5px/1 var(--font-sans)",
            letterSpacing: ".16em",
            textTransform: "uppercase",
            color: "#c2a05e",
            marginRight: 2,
          }}
        >
          Hero
        </b>
        {[1, 2].map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={variant === n}
            aria-label={`Hero-Variante ${n}`}
            onClick={() => choose(n as 1 | 2)}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              border: `1px solid ${variant === n ? "#c2a05e" : "rgba(224,200,141,.4)"}`,
              background: variant === n ? "#c2a05e" : "transparent",
              color: variant === n ? "#17301f" : "#e9e2cf",
              font: "700 12px var(--font-sans)",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </>
  );
}

function HeroV1() {
  return (
    <section
      id="ps-hero"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 150px)",
        overflow: "hidden",
        background: "radial-gradient(135% 108% at 22% 6%,#1a4028 0%,#102a1b 46%,#0a1c12 100%)",
      }}
    >
      <div className="grain" />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <span className="mote" style={{ left: "16%", bottom: "8%", animationDuration: "15s" }} />
        <span className="mote" style={{ left: "33%", bottom: "20%", animationDuration: "19s", animationDelay: "3s" }} />
        <span className="mote" style={{ left: "60%", bottom: "6%", animationDuration: "17s", animationDelay: "6s" }} />
        <span className="mote" style={{ left: "79%", bottom: "24%", animationDuration: "21s", animationDelay: "2s" }} />
        <span className="mote" style={{ left: "47%", bottom: "12%", animationDuration: "16s", animationDelay: "9s" }} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 84% 40%,rgba(96,142,106,.18),transparent 42%),radial-gradient(circle at 10% 92%,rgba(194,160,94,.10),transparent 46%)",
          pointerEvents: "none",
        }}
      />
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55, pointerEvents: "none" }}
        aria-hidden="true"
      >
        <g fill="none" stroke="#3c6549" strokeWidth="1">
          <path d="M-60 560 C 240 500 450 600 720 530 S 1160 460 1320 520" />
          <path d="M-60 610 C 240 550 450 650 720 580 S 1160 510 1320 570" />
          <path d="M-60 660 C 240 600 450 700 720 630 S 1160 560 1320 620" />
          <path d="M-60 710 C 240 650 450 750 720 680 S 1160 610 1320 670" />
          <path d="M-60 510 C 240 450 450 550 720 480 S 1160 410 1320 470" />
        </g>
      </svg>
      <Image
        src="/siegel-mark.png"
        alt=""
        aria-hidden="true"
        width={720}
        height={720}
        style={{ position: "absolute", left: "-9%", bottom: "-18%", width: "min(54vw,720px)", height: "auto", opacity: 0.05, pointerEvents: "none" }}
      />

      <div
        className="ps-hero1-grid"
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1320,
          margin: "0 auto",
          padding: "135px 40px 150px",
          minHeight: "calc(100vh - 150px)",
          display: "grid",
          gridTemplateColumns: "1.02fr .98fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div className="rise1" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
            <span style={{ width: 44, height: 1.5, background: "#c2a05e", transformOrigin: "left", animation: "drawline 1s ease .3s both", display: "inline-block" }} />
            <span className="eyebrow" style={{ color: "#e0c88d" }}>
              Hotel & Restaurant · über den Dächern von Dresden
            </span>
          </div>
          <h1
            className="rise2"
            style={{ fontSize: "clamp(46px,6.4vw,94px)", lineHeight: 0.97, color: "#f7f1e0", fontWeight: 600, letterSpacing: "-.015em" }}
          >
            Sächsische
            <br />
            Gemütlichkeit,
            <br />
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "transparent",
                background: "linear-gradient(100deg,#f2dda6,#c2a05e 52%,#e6cf95)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              versiegelt.
            </span>
          </h1>
          <p className="rise3" style={{ marginTop: 28, fontSize: 18.5, lineHeight: 1.75, color: "#dcd6c3", maxWidth: 520, fontWeight: 300 }}>
            Ein familiär geführtes 3-Sterne-Haus mit dem historischen Restaurant Albertheim auf der
            Pesterwitzer Höhe. Das Elbtal liegt Ihnen zu Füßen und ein Gläschen Wein wächst am Hang
            gleich nebenan.
          </p>
          <div className="rise4" style={{ marginTop: 38, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/buchung" className="btn-gold">
              Zimmer buchen
            </Link>
            <Link
              href="/restaurant"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(246,241,230,.06)",
                backdropFilter: "blur(6px)",
                color: "#f6f1e6",
                fontWeight: 700,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                fontSize: 12.5,
                padding: "13px 24px",
                border: "1.5px solid rgba(224,200,141,.45)",
                borderRadius: 2,
              }}
            >
              Restaurant entdecken
            </Link>
          </div>
          <div className="rise4" style={{ marginTop: 42, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ color: "#e0c88d", letterSpacing: 2, fontSize: 13 }}>★★★</span>
              <span style={{ fontSize: 12.5, color: "#a9b3a0", letterSpacing: ".03em" }}>3 Sterne</span>
            </div>
            <div style={{ width: 1, height: 22, background: "rgba(224,200,141,.28)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ color: "#e0c88d", letterSpacing: 2, fontSize: 13 }}>★★★★★</span>
              <span style={{ fontSize: 12.5, color: "#a9b3a0", letterSpacing: ".03em" }}>4,7 · Gästebewertungen</span>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", justifySelf: "center", width: "min(42vw,430px)" }}>
          <div
            style={{
              aspectRatio: "7/10",
              borderRadius: "215px 215px 14px 14px",
              overflow: "hidden",
              position: "relative",
              boxShadow:
                "0 44px 90px rgba(6,18,11,.62),0 0 0 1px rgba(224,200,141,.35),0 0 0 11px rgba(18,42,26,.5)",
              animation: "archup 1.1s cubic-bezier(.2,.7,.2,1) .2s both",
            }}
          >
            <Image
              src="/sonnenuntergang.jpg"
              alt="Hotel Pesterwitzer Siegel bei Sonnenuntergang mit Blick über das Elbtal"
              fill
              sizes="(max-width: 960px) 90vw, 430px"
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="vig" />
          </div>
          <div
            style={{
              position: "absolute",
              inset: -11,
              borderRadius: "226px 226px 20px 20px",
              border: "1px solid rgba(224,200,141,.22)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -60,
              left: "50%",
              width: 134,
              height: 134,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 18px 44px rgba(6,18,11,.6)",
              animation: "medaldrop 1s cubic-bezier(.2,.9,.3,1) .5s both",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 38%,#1e4229,#0f2417)" }} />
            <Image
              src="/siegel-mark.png"
              alt=""
              aria-hidden="true"
              width={104}
              height={104}
              style={{ position: "absolute", inset: 15, width: "calc(100% - 30px)", height: "calc(100% - 30px)", objectFit: "contain" }}
            />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: "inset 0 0 0 3px rgba(224,200,141,.5),inset 0 0 22px rgba(0,0,0,.4)" }} />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "42%",
                height: "100%",
                background: "linear-gradient(90deg,transparent,rgba(255,247,225,.5),transparent)",
                animation: "sheenmove 5s ease-in-out 1.6s infinite",
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(11,26,16,.72)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(224,200,141,.3)",
              borderRadius: 3,
              padding: "7px 15px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16, color: "#f0e8d3" }}>
              Elbtalblick 23 · Pesterwitz
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ps-hero1-grid { grid-template-columns: 1fr !important; padding: 120px 28px 90px !important; }
        }
      `}</style>
    </section>
  );
}

function HeroV2() {
  return (
    <section id="ps-hero" style={{ position: "relative", minHeight: "calc(100vh - 150px)", overflow: "hidden", background: "#0e2417" }}>
      <div className="duo" style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/hotel.jpg"
          alt="Hotel Pesterwitzer Siegel aus der Vogelperspektive"
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover", animation: "kbslow 26s ease-in-out infinite alternate" }}
        />
        <div className="vig" />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,rgba(8,20,12,.5) 0%,rgba(8,20,12,.1) 38%,rgba(8,20,12,.58) 72%,rgba(8,20,12,.9) 100%)",
          pointerEvents: "none",
        }}
      />
      <div className="grain" />
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <span className="mote" style={{ left: "20%", bottom: "10%", animationDuration: "16s" }} />
        <span className="mote" style={{ left: "44%", bottom: "18%", animationDuration: "20s", animationDelay: "4s" }} />
        <span className="mote" style={{ left: "68%", bottom: "8%", animationDuration: "18s", animationDelay: "7s" }} />
        <span className="mote" style={{ left: "84%", bottom: "22%", animationDuration: "22s", animationDelay: "2s" }} />
      </div>
      <Image
        src="/siegel-mark.png"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        style={{
          position: "absolute",
          right: "6%",
          top: "15%",
          width: "min(28vw,300px)",
          height: "auto",
          opacity: 0.12,
          transform: "translate3d(calc(var(--mx,0)*-14px),calc(var(--my,0)*-10px),0)",
          transition: "transform .35s ease-out",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          minHeight: "calc(100vh - 150px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div className="rise1" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <span style={{ width: 34, height: 1.5, background: "#c2a05e", display: "inline-block" }} />
          <span className="eyebrow" style={{ color: "#e0c88d" }}>
            Freital-Pesterwitz · 6 km von Dresden
          </span>
          <span style={{ width: 34, height: 1.5, background: "#c2a05e", display: "inline-block" }} />
        </div>
        <h1 className="rise2" style={{ fontSize: "clamp(52px,8vw,124px)", lineHeight: 0.9, color: "#f7f1e0", fontWeight: 600, letterSpacing: "-.02em" }}>
          Ankommen.
          <br />
          <span
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              color: "transparent",
              background: "linear-gradient(100deg,#f2dda6,#c2a05e 55%,#e6cf95)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Durchatmen.
          </span>
        </h1>
        <p className="rise3" style={{ marginTop: 26, fontSize: 19, lineHeight: 1.7, color: "#e4dece", maxWidth: 540, fontWeight: 300 }}>
          Familiär geführtes 3-Sterne-Hotel und Restaurant Albertheim hoch über dem Elbtal, mit
          sächsischer Gemütlichkeit, die man ernst meint.
        </p>
        <div className="rise4" style={{ marginTop: 36, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/buchung" className="btn-gold">
            Zimmer buchen
          </Link>
          <Link
            href="/restaurant"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(246,241,230,.08)",
              backdropFilter: "blur(6px)",
              color: "#f6f1e6",
              fontWeight: 700,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              fontSize: 12.5,
              padding: "13px 24px",
              border: "1.5px solid rgba(224,200,141,.5)",
              borderRadius: 2,
            }}
          >
            Restaurant entdecken
          </Link>
        </div>
      </div>
    </section>
  );
}
