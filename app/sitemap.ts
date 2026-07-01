import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Erzeugt /sitemap.xml mit allen öffentlichen Seiten für Google & Co. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/hotel", priority: 0.9, changeFrequency: "monthly" },
    { path: "/restaurant", priority: 0.9, changeFrequency: "weekly" },
    { path: "/feiern-und-tagen", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ueber-uns", priority: 0.6, changeFrequency: "yearly" },
    { path: "/karriere", priority: 0.6, changeFrequency: "monthly" },
    { path: "/buchung", priority: 0.8, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
    { path: "/barrierefreiheit", priority: 0.2, changeFrequency: "yearly" },
  ];

  const now = new Date();
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
