import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Impressum",
    description: `Impressum und Anbieterkennzeichnung des ${site.name} in Freital-Pesterwitz, Inhaber ${site.owner}.`,
    path: "/impressum",
  }),
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Impressum" intro="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).">
      <h2>Anbieter</h2>
      <address>
        {site.name}
        <br />
        Inhaber: {site.owner}
        <br />
        {site.street} ({site.streetNote})
        <br />
        {site.zip} {site.city}-{site.district}
        <br />
        {site.country}
      </address>

      <h2>Kontakt</h2>
      <p>
        Telefon Hotel und Rezeption: <a href={`tel:${site.phoneHotel.replace(/\s/g, "")}`}>{site.phoneHotelDisplay}</a>
        <br />
        Telefon Restaurant Albertheim:{" "}
        <a href={`tel:${site.phoneRestaurant.replace(/\s/g, "")}`}>{site.phoneRestaurantDisplay}</a>
        <br />
        Telefax: {site.faxDisplay}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        <strong>{site.vatId}</strong>
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        Verantwortlich für den Inhalt nach § 18 Abs. 2 Medienstaatsvertrag (MStV):
        <br />
        {site.owner}, Anschrift wie oben.
      </p>

      <h2>Aufsichtsbehörde</h2>
      <p>
        Zuständig für die Erteilung der Gaststättenerlaubnis ist die Landeshauptstadt Dresden
        beziehungsweise das Ordnungsamt der Stadt Freital, {site.zip} {site.city}.
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die
        Sie unter{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>{" "}
        finden. Unsere E-Mail-Adresse haben Sie oben bereits gefunden.
      </p>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <hr />

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß den allgemeinen Gesetzen für eigene Inhalte auf diesen
        Seiten verantwortlich. Wir haben unsere Inhalte mit größter Sorgfalt erstellt, für ihre
        Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine Gewähr übernehmen. Als
        Diensteanbieter sind wir nicht verpflichtet, übermittelte oder gespeicherte fremde
        Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
        Tätigkeit hindeuten. Sobald uns eine konkrete Rechtsverletzung bekannt wird, entfernen wir die
        betroffenen Inhalte umgehend.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält gelegentlich Links zu externen Websites Dritter, auf deren Inhalte wir
        keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
        übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
        mögliche Rechtsverstöße überprüft, rechtswidrige Inhalte waren dabei nicht erkennbar. Eine
        dauerhafte inhaltliche Kontrolle ohne konkrete Anhaltspunkte einer Rechtsverletzung ist uns
        nicht zumutbar. Sobald uns Rechtsverletzungen bekannt werden, entfernen wir solche Links
        umgehend.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die von uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
        außerhalb der Grenzen des Urheberrechts bedürfen unserer schriftlichen Zustimmung. Downloads
        und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
        entsprechenden Hinweis. Sobald uns Rechtsverletzungen bekannt werden, entfernen wir die
        betroffenen Inhalte umgehend.
      </p>
    </LegalPage>
  );
}
