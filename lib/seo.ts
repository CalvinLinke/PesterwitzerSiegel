import type { Metadata } from "next";
import { site } from "./site";

const titleTemplate = `%s | ${site.name}`;

/**
 * Baut konsistente, SEO-optimierte Metadaten pro Seite: Titel, Description,
 * Canonical, OpenGraph (fürs Teilen) und Twitter-Card. Das Teilen-Bild liefert
 * einheitlich die opengraph-image/twitter-image-Konvention (Marken-Panel).
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = new URL(opts.path, site.url).toString();
  const absoluteTitle =
    opts.path === "/" ? `${site.name} · ${site.restaurant}` : `${opts.title} | ${site.name}`;
  return {
    title: opts.title,
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url,
      siteName: site.name,
      title: absoluteTitle,
      description: opts.description,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: opts.description,
      images: ["/opengraph-image"],
    },
  };
}

export { titleTemplate };
