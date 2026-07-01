import type { Metadata } from "next";
import { site } from "./site";

const titleTemplate = `%s | ${site.name}`;

/**
 * Baut konsistente, SEO-optimierte Metadaten pro Seite: Titel, Description,
 * Canonical, OpenGraph (fürs Teilen) und Twitter-Card.
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = new URL(opts.path, site.url).toString();
  const image = opts.image ?? "/og-image.jpg";
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
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${site.name} in Freital-Pesterwitz`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: opts.description,
      images: [image],
    },
  };
}

export { titleTemplate };
