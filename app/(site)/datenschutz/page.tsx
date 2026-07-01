import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Datenschutz",
  description: `Datenschutzerklärung des ${site.name}. Informationen zur Verarbeitung personenbezogener Daten, zu Google Maps, Cookies und Ihren Rechten.`,
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <LegalPage
      eyebrow="Rechtliches"
      title="Datenschutz"
      intro="Ihre Daten sind bei uns in guten Händen. Hier erfahren Sie, welche Daten wir verarbeiten und warum."
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
      </p>
      <address>
        {site.name}
        <br />
        Inhaber: {site.owner}
        <br />
        {site.street}, {site.zip} {site.city}-{site.district}
        <br />
        Telefon: {site.phoneHotelDisplay}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </address>

      <h2>2. Grundsätzliches</h2>
      <p>
        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre
        personenbezogenen Daten vertraulich sowie entsprechend der gesetzlichen
        Datenschutzvorschriften und dieser Datenschutzerklärung. Die Nutzung unserer Website ist in
        der Regel ohne Angabe personenbezogener Daten möglich. Personenbezogene Daten erheben wir nur
        dann, wenn Sie uns diese freiwillig mitteilen, etwa über unser Kontakt- und Buchungsformular.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei einem externen Dienstleister gehostet (Vercel Inc., 340 S Lemon Ave
        #4133, Walnut, CA 91789, USA). Die personenbezogenen Daten, die beim Besuch dieser Website
        erfasst werden, werden auf den Servern des Anbieters gespeichert. Der Einsatz erfolgt im
        Interesse einer sicheren, schnellen und zuverlässigen Bereitstellung unseres Angebots
        (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Anbieter besteht ein Vertrag über
        Auftragsverarbeitung (AVV).
      </p>

      <h2>4. Server-Logfiles</h2>
      <p>
        Beim Aufruf unserer Seiten werden automatisch Informationen in sogenannten Server-Logfiles
        gespeichert, die Ihr Browser übermittelt. Dies sind Browsertyp und Browserversion,
        verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners sowie Uhrzeit der
        Serveranfrage. Diese Daten sind nicht bestimmten Personen zuordenbar und dienen der
        technischen Auslieferung und Sicherheit der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO.
      </p>

      <h2>5. Kontakt- und Buchungsformular</h2>
      <p>
        Wenn Sie uns über das Formular eine Anfrage senden, verarbeiten wir die von Ihnen gemachten
        Angaben (etwa Name, Telefonnummer, E-Mail-Adresse, Reisedaten und Ihre Nachricht), um Ihre
        Anfrage zu bearbeiten und Ihnen persönlich zu antworten. Rechtsgrundlage ist Art. 6 Abs. 1
        lit. b DSGVO (Anbahnung eines Vertragsverhältnisses) beziehungsweise Art. 6 Abs. 1 lit. f
        DSGVO (Bearbeitung Ihres Anliegens). Die Daten verbleiben bei uns, bis der Zweck entfällt oder
        gesetzliche Aufbewahrungsfristen dies vorschreiben.
      </p>

      <h2>6. Cookies und Einwilligung</h2>
      <p>
        Unsere Website verwendet nur technisch notwendige Speichermechanismen sowie Funktionen, die
        Ihre Einwilligung voraussetzen. Ihre Cookie-Entscheidung speichern wir lokal in Ihrem Browser,
        damit wir Sie nicht bei jedem Besuch erneut fragen müssen. Diese Einwilligung können Sie
        jederzeit widerrufen, indem Sie die gespeicherten Daten Ihres Browsers löschen. Rechtsgrundlage
        für einwilligungspflichtige Funktionen ist Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit § 25
        Abs. 1 TDDDG, für technisch notwendige § 25 Abs. 2 TDDDG.
      </p>

      <h2>7. Google Maps</h2>
      <p>
        Auf unserer Kontaktseite binden wir eine Karte des Dienstes Google Maps ein, um Ihnen die
        Anfahrt zu erleichtern. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Irland. Die Karte wird <strong>erst dann geladen, wenn Sie ausdrücklich
        einwilligen</strong>, entweder über unseren Cookie-Hinweis oder über die Schaltfläche „Karte
        laden“. Vorher wird keine Verbindung zu Google aufgebaut. Sobald Sie die Karte laden, werden
        Daten wie Ihre IP-Adresse an Google übertragen und gegebenenfalls auf Servern in den USA
        verarbeitet. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO in
        Verbindung mit § 25 Abs. 1 TDDDG. Weitere Informationen finden Sie in der{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von Google
        </a>
        .
      </p>

      <h2>8. Schriftarten (lokal eingebunden)</h2>
      <p>
        Zur einheitlichen Darstellung von Schriften verwenden wir die Schriftarten Cormorant Garamond
        und Mulish. Diese werden lokal von unserem Server ausgeliefert, es besteht dabei keine
        Verbindung zu Servern von Google. Ihre Daten werden hierbei nicht an Dritte übertragen.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO),</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
        <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
        <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO),</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO) sowie</li>
        <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>10. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Ihnen steht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu. Zuständig ist der
        Sächsische Datenschutzbeauftragte, Devrientstraße 5, 01067 Dresden.
      </p>

      <h2>11. Werbliche Nutzung / Widerspruch</h2>
      <p>
        Der Nutzung der im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung
        von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien widersprechen wir
        hiermit ausdrücklich. Wir behalten uns im Falle unverlangt zugesandter Werbeinformationen
        ausdrücklich rechtliche Schritte vor.
      </p>
    </LegalPage>
  );
}
