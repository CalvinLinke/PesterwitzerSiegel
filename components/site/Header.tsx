"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Routenwechsel schließen
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all .4s ease",
      }}
    >
      <div
        style={{
          background: solid
            ? "rgba(23,48,31,.94)"
            : "linear-gradient(180deg,rgba(15,28,18,.55),rgba(15,28,18,0))",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: `1px solid ${solid ? "rgba(194,160,94,.28)" : "transparent"}`,
          transition: "all .4s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 28px",
            height: solid ? 68 : 92,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "height .4s ease",
          }}
        >
          <Link
            href="/"
            aria-label="Zur Startseite"
            style={{ display: "flex", alignItems: "center", gap: 13 }}
          >
            <Image
              src="/siegel-mark.png"
              alt=""
              width={38}
              height={38}
              style={{
                height: 38,
                width: "auto",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,.25))",
              }}
              priority
            />
            <span style={{ lineHeight: 1 }}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: ".03em",
                  color: "#f0e8d3",
                }}
              >
                Pesterwitzer Siegel
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 9.5,
                  letterSpacing: ".34em",
                  textTransform: "uppercase",
                  color: "#c2a05e",
                  marginTop: 3,
                }}
              >
                Hotel · Restaurant · Freital
              </span>
            </span>
          </Link>

          {/* Desktop-Navigation */}
          <nav
            aria-label="Hauptnavigation"
            className="ps-desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: 30 }}
          >
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`navlink${active ? " on" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/buchung" className="btn-gold">
              Jetzt buchen
            </Link>
          </nav>

          {/* Mobile-Umschalter */}
          <button
            type="button"
            className="ps-burger"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            aria-controls="ps-mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: "none",
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
            }}
          >
            <span style={burgerLine(menuOpen, 1)} />
            <span style={burgerLine(menuOpen, 2)} />
            <span style={burgerLine(menuOpen, 3)} />
          </button>
        </div>
      </div>

      {/* Mobile-Navigation */}
      {menuOpen && (
        <nav
          id="ps-mobile-nav"
          aria-label="Mobile Navigation"
          style={{
            background: "rgba(23,48,31,.98)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(194,160,94,.28)",
            padding: "18px 28px 28px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    padding: "12px 0",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: ".04em",
                    textTransform: "uppercase",
                    color: active ? "#e0c88d" : "#e9e2cf",
                    borderBottom: "1px solid rgba(194,160,94,.15)",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/buchung"
              className="btn-gold"
              style={{ marginTop: 16, justifyContent: "center" }}
            >
              Jetzt buchen
            </Link>
          </div>
        </nav>
      )}

      <style>{`
        @media (max-width: 960px) {
          .ps-desktop-nav { display: none !important; }
          .ps-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function burgerLine(open: boolean, pos: 1 | 2 | 3): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "block",
    width: 26,
    height: 2,
    background: "#e9e2cf",
    borderRadius: 2,
    transition: "transform .3s ease, opacity .3s ease",
  };
  if (!open) return base;
  if (pos === 1) return { ...base, transform: "translateY(7px) rotate(45deg)" };
  if (pos === 2) return { ...base, opacity: 0 };
  return { ...base, transform: "translateY(-7px) rotate(-45deg)" };
}
