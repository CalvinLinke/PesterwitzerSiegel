/**
 * Zentrale Stammdaten des Hauses. Einmal hier pflegen, überall verwenden
 * (Impressum, Footer, Kontakt, Schema.org, SEO).
 */
export const site = {
  name: "Hotel Pesterwitzer Siegel",
  shortName: "Pesterwitzer Siegel",
  restaurant: "Restaurant Albertheim",
  claim: "Sächsische Gemütlichkeit, versiegelt.",
  // Produktions-Domain (für canonical, OpenGraph, Sitemap). Aktuell die
  // Vercel-Adresse; bei Domainumzug hier auf die eigene Domain ändern.
  url: "https://pesterwitzer-siegel.vercel.app",
  owner: "Marko Siegel",
  legalForm: "Einzelunternehmen",
  street: "Elbtalblick 23",
  streetNote: "ehemals Dresdner Straße 23",
  zip: "01705",
  city: "Freital",
  district: "Pesterwitz",
  region: "Sachsen",
  regionCode: "DE-SN",
  country: "Deutschland",
  geo: { lat: 51.0206, lng: 13.6386 },
  phoneHotel: "+49 351 6506367",
  phoneHotelDisplay: "0351 6506367",
  phoneRestaurant: "+49 351 65509844",
  phoneRestaurantDisplay: "0351 65509844",
  fax: "+49 351 6506369",
  faxDisplay: "0351 6506369",
  email: "info@pesterwitzersiegel.de",
  emailJobs: "bewerbung@pesterwitzersiegel.de",
  vatId: "DE257604128",
  stars: 3,
  rating: { value: 4.7, count: 128 },
  addressLine: "Elbtalblick 23 · 01705 Freital-Pesterwitz",
} as const;

/** Google-Maps-Embed-URL (wird erst nach Cookie-Einwilligung geladen). */
export const mapsEmbedUrl =
  "https://maps.google.com/maps?q=Hotel%20Pesterwitzer%20Siegel%20Elbtalblick%2023%2C%2001705%20Freital&t=m&z=14&output=embed";

/** Hauptnavigation (echte Routen). */
export const navItems = [
  { href: "/", label: "Start" },
  { href: "/hotel", label: "Hotel" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/feiern-und-tagen", label: "Feiern & Tagen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/karriere", label: "Karriere" },
] as const;
