import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Barrierefreiheit",
  description: `Erklärung zur Barrierefreiheit der Website des ${site.name}. Unser Bemühen um eine für alle nutzbare Website und Ihr Draht zu uns bei Hürden.`,
  path: "/barrierefreiheit",
});

export default function BarrierefreiheitPage() {
  return (
    <LegalPage
      eyebrow="Für alle da"
      title="Barrierefreiheit"
      intro="Wir möchten, dass sich alle Gäste auf unserer Website gut zurechtfinden, unabhängig von Technik oder Einschränkung."
    >
      <h2>Unser Anspruch</h2>
      <p>
        Gastfreundschaft hört für uns nicht an der Eingangstür auf, sondern beginnt schon online. Wir
        bemühen uns, unsere Website so zu gestalten, dass sie möglichst vielen Menschen offensteht. Als
        Orientierung dienen uns die Web Content Accessibility Guidelines (WCAG) 2.1 in der Stufe AA.
      </p>

      <h2>Was wir umgesetzt haben</h2>
      <ul>
        <li>Eine klare, durchgängige Seitenstruktur mit sinnvollen Überschriften.</li>
        <li>Einen Sprunglink, mit dem Sie direkt zum Hauptinhalt gelangen.</li>
        <li>Vollständige Bedienbarkeit mit der Tastatur, mit gut sichtbarer Fokus-Markierung.</li>
        <li>Aussagekräftige Alternativtexte für inhaltlich wichtige Bilder.</li>
        <li>Farbkontraste, die sich an den Empfehlungen der WCAG orientieren.</li>
        <li>
          Rücksicht auf die Systemeinstellung „Bewegung reduzieren“, sodass dekorative Animationen
          bei Bedarf ausgeschaltet werden.
        </li>
        <li>
          Beschriftete Formularfelder sowie eine Karte, die erst nach Ihrer Zustimmung geladen wird.
        </li>
      </ul>

      <h2>Wo es noch hakt</h2>
      <p>
        Trotz aller Sorgfalt ist eine Website nie ganz fertig. Einzelne Inhalte oder eingebundene
        Dienste Dritter, etwa die Karte von Google Maps, erfüllen unsere Anforderungen
        möglicherweise noch nicht vollständig. Wir arbeiten kontinuierlich daran, solche Hürden
        abzubauen.
      </p>

      <h2>Sie stoßen auf eine Barriere?</h2>
      <p>
        Dann sagen Sie uns bitte Bescheid, wir sind für jeden Hinweis dankbar und kümmern uns
        persönlich darum. Am schnellsten erreichen Sie uns telefonisch unter {site.phoneHotelDisplay}{" "}
        oder per E-Mail an <a href={`mailto:${site.email}`}>{site.email}</a>. Gern lesen wir Ihnen auch
        Inhalte vor oder helfen bei einer Buchung am Telefon weiter.
      </p>
    </LegalPage>
  );
}
