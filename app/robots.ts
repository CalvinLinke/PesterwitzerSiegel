import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Erzeugt /robots.txt und verweist auf die Sitemap. Admin bleibt außen vor. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
