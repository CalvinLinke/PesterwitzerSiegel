import { site } from "@/lib/site";

/**
 * Strukturierte Daten (JSON-LD) für Google: Hotel mit angeschlossenem
 * Restaurant. Verbessert Rich Results und lokale Sichtbarkeit.
 */
export default function SchemaOrg() {
  const businessId = `${site.url}/#hotel`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Hotel", "LodgingBusiness"],
        "@id": businessId,
        name: site.name,
        description:
          "Familiär geführtes 3-Sterne-Hotel mit Restaurant Albertheim auf der Pesterwitzer Höhe über dem Elbtal, sechs Kilometer von Dresden.",
        url: site.url,
        telephone: site.phoneHotel,
        faxNumber: site.fax,
        email: site.email,
        priceRange: "€€",
        starRating: { "@type": "Rating", ratingValue: site.stars },
        currenciesAccepted: "EUR",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          postalCode: site.zip,
          addressLocality: `${site.city}-${site.district}`,
          addressRegion: site.region,
          addressCountry: "DE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        image: `${site.url}/og-image.jpg`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: site.rating.value,
          reviewCount: site.rating.count,
        },
        petsAllowed: true,
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Kostenfreies WLAN", value: true },
          { "@type": "LocationFeatureSpecification", name: "Parkplatz & Garage", value: true },
          { "@type": "LocationFeatureSpecification", name: "Regionales Frühstück", value: true },
        ],
      },
      {
        "@type": "Restaurant",
        "@id": `${site.url}/#restaurant`,
        name: `${site.restaurant} im ${site.name}`,
        servesCuisine: ["Sächsisch", "Regional", "Deutsch"],
        url: `${site.url}/restaurant`,
        telephone: site.phoneRestaurant,
        priceRange: "€€",
        acceptsReservations: true,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          postalCode: site.zip,
          addressLocality: `${site.city}-${site.district}`,
          addressRegion: site.region,
          addressCountry: "DE",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Wednesday", "Thursday", "Friday"],
            opens: "17:00",
            closes: "22:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday", "Sunday"],
            opens: "11:30",
            closes: "22:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "de-DE",
        publisher: { "@id": businessId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
