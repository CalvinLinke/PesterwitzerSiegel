import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { titleTemplate } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.restaurant} in Freital bei Dresden`,
    template: titleTemplate,
  },
  description:
    "Familiär geführtes 3-Sterne-Hotel mit Restaurant Albertheim auf der Pesterwitzer Höhe über dem Elbtal, sechs Kilometer von Dresden. Zimmer buchen, Tisch reservieren, feiern und tagen.",
  keywords: [
    "Hotel Pesterwitzer Siegel",
    "Hotel Freital",
    "Hotel bei Dresden",
    "Restaurant Albertheim",
    "Restaurant Pesterwitz",
    "Zimmer buchen Dresden",
    "Feiern und Tagen Dresden",
    "Hochzeit Freital",
  ],
  authors: [{ name: "Familie Siegel" }],
  creator: "Familie Siegel",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: site.name }],
  },
  other: {
    "geo.region": site.regionCode,
    "geo.placename": `${site.city}-${site.district}`,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${mulish.variable}`}>
      <body>{children}</body>
    </html>
  );
}
