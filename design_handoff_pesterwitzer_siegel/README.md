# Handoff: Website-Relaunch „Hotel Pesterwitzer Siegel"

## Überblick
Kompletter Relaunch der Website des familiengeführten 3‑Sterne‑Hotels **Pesterwitzer Siegel** mit Restaurant **Albertheim** in Freital‑Pesterwitz (südlich von Dresden). Das Design ist ein **hochwertiges, eigenständiges Marken‑Erlebnis** – tiefes Waldgrün + Bronze, das freigestellte Siegel‑Element als wiederkehrendes Stilelement, dezente Bewegung (Scroll‑Reveals, Licht‑Ambiente, animiertes „Prägen" des Siegels) und ein prominenter, in den Hero „eingehakter" Buchungs‑Funnel.

Die Seite ist als **Single‑Page‑App mit Client‑Router** aufgebaut (eine „Seite" pro View, per State umgeschaltet), damit alle Unterseiten in einem zusammenhängenden Prototyp erlebbar sind.

## Über die Design‑Dateien (WICHTIG)
Die Datei `Pesterwitzer Siegel.dc.html` ist eine **Design‑Referenz in HTML** – ein Prototyp, der Aussehen und Verhalten zeigt, **kein produktiver Code zum 1:1‑Kopieren**. Aufgabe für die Umsetzung: Dieses Design in der **Zielumgebung neu aufbauen** (empfohlen: **Next.js / React** + CSS‑Modules oder Tailwind, oder das im Zielprojekt etablierte Framework) und dabei die dortigen Konventionen und Komponenten‑Patterns nutzen. Existiert noch keine Umgebung, ist ein modernes React/Next.js‑Setup die naheliegende Wahl.

Hinweis zum Format: Der Prototyp ist eine „Design Component" (`.dc.html`) und benötigt zum Laufen die mitgelieferte Laufzeit `support.js` (nur zum Ansehen des Prototyps – **nicht** in die Produktion übernehmen). Alle Styles sind bewusst **inline** gehalten; für die Umsetzung sollten sie in Komponenten/CSS überführt werden.

## Fidelity
**High‑Fidelity (hifi).** Farben, Typografie, Abstände, Radien, Schatten und Interaktionen sind final gedacht und sollten möglichst pixelgenau mit den Mitteln des Zielprojekts nachgebaut werden. Inhalte/Copys sind ausformuliert (Deutsch), aber teils Platzhalter (siehe „Offene Punkte").

---

## Screens / Views (Router)
Der Router hält `state.page` (Werte: `home`, `hotel`, `restaurant`, `events`, `about`, `jobs`, `book`). Ein fixierter Header wechselt die View; bei Wechsel wird nach oben gescrollt.

### 1. Header (global, fixiert)
- Position: `fixed; top:0`, volle Breite, `z-index:50`. Höhe wechselt animiert: **92px** (Start, transparent über Hero) → **68px** (gescrollt / auf Unterseiten, dunkelgrün `rgba(23,48,31,.94)` + `backdrop-filter: blur(10px)` + goldener Border‑Bottom).
- Links: Logo‑Lockup = Siegel‑Mark (`assets/siegel-mark.png`, 38px hoch) + Wortmarke „Pesterwitzer Siegel" (Cormorant Garamond 700, 22px) + Unterzeile „HOTEL · RESTAURANT · FREITAL" (Mulish 700, 9.5px, `letter-spacing:.34em`, uppercase, Bronze).
- Nav (rechts, `gap:30px`): Start · Hotel · Restaurant · Feiern & Tagen · Über uns · Karriere + Gold‑Button **„Jetzt buchen"**. Nav‑Links: Mulish 700, 13.5px, uppercase, `letter-spacing:.04em`, Farbe `#e9e2cf`; Hover/aktiv Bronze `#e0c88d` mit animiertem Unterstrich (goldene 1.5px‑Linie, `right` transition 0.3s).

### 2. Startseite (`home`)
Reihenfolge der Sektionen (jede außer Hero mit Scroll‑Reveal):
1. **Hero** (2 umschaltbare Varianten, siehe unten)
2. **Funnel** (Buchungs‑Widget, hakt in den Hero – siehe unten)
3. **Willkommen** – 2‑Spalten (Text + Bild `sonnenuntergang`/`hotelbett`), großes kursives Anführungszeichen als Ornament, Signatur „Herzlichst, Ihre Familie Siegel" mit Siegel‑Mark.
4. **Die kleinen Besonderheiten** – 4 Karten (6 km / ★★★ / Elbtalblick / Für Aktive), weiße Karten mit `lift`‑Hover.
5. **Zwei Welten unter einem Siegel** – dunkelgrüne Sektion, 2 große klickbare Karten „Das Hotel" / „Das Restaurant Albertheim" (Bild + Verlaufs‑Overlay, führen zu den Unterseiten).
6. **Arrangements & Pauschalen** – 3 Angebotskarten (Dresden‑Auszeit, Sächsischer Genussabend, Touren‑Wochenende), mit Badge, Preis „ab XXX €".
7. **Dresden liegt Ihnen zu Füßen** – Vollbild‑Bildband (Kronentor) mit Verlauf + CTA.
8. **Gästestimmen** – 3 Testimonial‑Karten (mittlere dunkelgrün hervorgehoben), 5‑Sterne, kursives Zitat in Cormorant.
9. **CTA** – dunkelgrüne Box „Bleiben Sie ein paar Tage." mit Buttons.
10. **Footer** (global).

#### Hero – Varianten (Umschalter unten links: „HERO 1 · 2")
Beide Varianten: `min-height: calc(100vh - 150px)` (damit der Funnel sichtbar auf dem Grün aufsetzt), `id="ps-hero"`, Filmkorn‑Overlay (`.grain`), schwebende Gold‑Partikel (`.mote`, Keyframe `drift`), Sektions‑Hintergrund tiefes Grün‑Radial.
- **Variante 1 – „Editorial Arch"** (Default): 2‑Spalten‑Grid. Links: Eyebrow, große Headline „Sächsische / Gemütlichkeit, / *versiegelt.*" (Cormorant, `clamp(46px,6.4vw,94px)`, letztes Wort kursiv mit Gold‑Verlaufstext), Sub, 2 Buttons, Trust‑Row (★★★ „3 Sterne" · ★★★★★ „4,7 · Gästebewertungen"). Rechts: **Bogen‑Bild** (`sonnenuntergang.jpg`, `aspect-ratio:7/10`, `border-radius:215px 215px 14px 14px`, mehrfacher Schatten + Bronze‑Rahmen) mit **Siegel‑Medaillon** oben mittig (Münze: grüner Radial‑BG + Siegel‑Mark + goldener Innenring + Gold‑Sheen‑Sweep), Einblend‑Animation `archup` / `medaldrop`. Bild‑Bildunterschrift „Elbtalblick 23 · Pesterwitz".
- **Variante 2 – „Cinematic"**: Vollflächiges Foto (`hotel.jpg`) mit langsamem Ken‑Burns (`kbslow`), **Duotone‑Behandlung** (grüne Schatten / bronzene Lichter, siehe `.duo`), dunkler Lesbarkeits‑Verlauf, zentrierte Headline „Ankommen. / *Durchatmen.*" (`clamp(52px,8vw,124px)`), Sub, 2 Buttons.

> Für die Produktion: **eine** Hero‑Variante wählen (der Umschalter `.hero-switch` ist nur ein Vergleichs‑Tool im Mockup und entfällt). Wenn nicht anders entschieden: **Variante 1**.

#### Funnel („reinhaken")
- Eigene Sektion direkt nach dem Hero. Hintergrund‑Verlauf, der das Hero‑Grün weich in den Creme‑Ton auslaufen lässt: `linear-gradient(180deg,#0a1c12 0%,#0a1c12 40px,#e9e0cd 170px,#f6f1e6 300px,#f6f1e6 100%)`.
- Darauf eine **zentrierte Karte** (`max-width:920px`), die mit `margin-top:-190px` von unten in den grünen Hero **eingehakt** ist (überlappt beide Sektionen). Karte: `#fbf8f1`, `border-top:4px solid #c2a05e`, `border-radius:12px`, kräftiger Schatten, 1px Bronze‑Border.
- Kopf: Siegel‑Mark + „Ihr Aufenthalt beginnt hier" (Cormorant 28px) + Subline; rechts Status‑Punkt „Persönliche Rückmeldung durch Familie Siegel".
- Darunter **3 Tabs**: „Hotelnacht" / „Tisch reservieren" / „Feiern & Tagen" (aktiver Tab dunkelgrün gefüllt), je eigenes Formular‑Grid:
  - Hotelnacht: Anreise (date) · Abreise (date) · Gäste (select) · Zimmerart (select) · Button „Verfügbarkeit prüfen".
  - Tisch: Datum · Uhrzeit · Personen · Button „Tisch reservieren".
  - Feiern & Tagen: Anlass · Wunschtermin · Gäste ca. · Button „Unverbindlich anfragen".
- Submit zeigt einen **Bestätigungs‑Toast** (unten mittig, 5.2s) – **Platzhalter**; hier kommt später die API‑Anbindung ans Buchungssystem (Hotel) bzw. Reservierungssystem (Restaurant).

### 3. Hotel (`hotel`)
Page‑Hero (Foto + Overlay + Titel „Schlafen mit Aussicht") → „Die kleinen Besonderheiten" (2‑Spalten Text + Bild mit Bronze‑Badge „Mit 3 Sternen ausgezeichnet") → **Zimmer** (3 Karten: Einzelzimmer ab 74 €, Doppelzimmer ab 98 € „Beliebt", Familienzimmer ab 132 €, je mit Feature‑Chips) → Preis‑Hinweiszeile → **Tagungsraum‑Teaser** (Bild + Bullet‑Liste + CTA zu „Feiern & Tagen").

### 4. Restaurant Albertheim (`restaurant`)
Page‑Hero (Festtafel, Titel kursiv „Albertheim") → Intro „Regional gedacht, ehrlich gekocht." + **Öffnungszeiten‑Karte** (dunkelgrün, Mi–Fr ab 17:00, Sa/So ab 11:30, Mo/Di Ruhetag) → **Speisekarte‑Erlebnis**: dunkelgrüne Sektion mit **umschaltbaren Tabs** (Abendkarte / Mittagstisch / Weinkarte), jeweils elegante Menü‑Liste (Cormorant‑Gerichtnamen, gepunktete Führungslinie, Preis rechts) auf Creme‑Karte → Feier‑Teaser.

### 5. Feiern & Tagen (`events`)
Page‑Hero → 6 Anlass‑Karten (Hochzeiten, Familienfeiern, Firmenfeiern, Tagungen & Seminare, Trauerfeiern, + „Ihr Anlass fehlt?"‑CTA‑Karte) → 2 Karten „Menüselbstauswahl" / „Büfettvorschläge" → Tagungsraum‑Detail (Bild + Bullets + CTA).

### 6. Über uns (`about`)
Page‑Hero „Ein Name wird zum Siegel" → zentrierter Fließtext (Geschichte, „Wir"‑Perspektive) → **Timeline** (3 Meilensteine: Anfangs / Albertheim / Heute) → dunkelgrüne „Unser Versprechen"‑Sektion (Persönlich / Regional / Beständig).

### 7. Karriere (`jobs`)
Page‑Hero → „Kein Konzern. Eine Familie." + 4 Benefit‑Kacheln → **Offene Stellen** (Koch, Servicekraft, Rezeption, Ausbildung 2027) als Zeilen mit „Bewerben"‑Button → Initiativbewerbungs‑Hinweis.

### 8. Buchung & Kontakt (`book`)
Dunkelgrüner Intro‑Header → 2‑Spalten: links große Formular‑Karte mit denselben 3 Tabs (Hotelnacht / Tischreservierung / Feier & Tagung) + Name/Telefon/E‑Mail/Nachricht; rechts Kontakt‑Karte (Adresse, Telefonnummern, E‑Mail) + eingebettete Google‑Maps‑Karte (`iframe`). Submit → Toast (Platzhalter, später API).

### Footer (global)
Dunkelgrün `#17301f`, großes Siegel‑Wasserzeichen, 4 Spalten (Marke/Claim, „Entdecken"‑Links, Kontakt, Rezeptionszeiten + CTA), untere Zeile „© <Jahr> · Familie Siegel" + Impressum/Datenschutz/Barrierefreiheit.

---

## Interaktionen & Verhalten
- **Router**: `go(page)` setzt `state.page`, scrollt nach oben. Header‑Nav + diverse CTAs rufen `nav*`‑Handler.
- **Hero‑Umschalter** (`.hero-switch`, nur Mockup): setzt `state.heroVariant` (1/2). In Produktion entfernen.
- **Buchungs‑Tabs**: `state.bookingTab` (`hotel`/`tisch`/`event`) schaltet das jeweilige Formular‑Grid; aktiver Tab dunkelgrün.
- **Speisekarte‑Tabs**: `state.menu` (`abend`/`mittag`/`wein`).
- **Formular‑Submit**: `preventDefault`, `state.sent=true`, Toast 5.2s, dann zurück. → **API‑Slot** für Buchungs-/Reservierungssystem.
- **Scroll‑Reveals**: Elemente mit Klasse `.reveal` starten `opacity:0; translateY(30px)` und blenden bei Sichtbarkeit zu `.in` ein (`transition .85s cubic-bezier(.2,.7,.2,1)`). Umsetzung mit `IntersectionObserver` **plus** Fallback (Scroll‑Listener + Safety‑Timeout), damit nie Inhalt unsichtbar bleibt.
- **Ambiente‑Animationen** (rein dekorativ, CSS): `grain` (Filmkorn), `drift` (Gold‑Partikel), `kbslow`/`kb` (Ken‑Burns), `archup`/`medaldrop`/`sheenmove` (Hero‑Einblendung & Siegel‑Sheen), `breathe` (Wasserzeichen), Nav‑Unterstrich, `rise1–4` (gestaffelte Hero‑Einblendung).
- **Hover**: Karten `lift` (translateY −6px + Schatten), Buttons `btn-gold` (translateY −2px), Nav‑Unterstrich, Ghost‑Buttons Invert.

## State Management
```
page: 'home'|'hotel'|'restaurant'|'events'|'about'|'jobs'|'book'   // Router
heroVariant: 1|2            // nur Mockup-Umschalter, in Prod entfernen
bookingTab: 'hotel'|'tisch'|'event'
menu: 'abend'|'mittag'|'wein'   // Speisekarte
sent: boolean                // Toast nach Formular-Submit
scrolled: boolean            // Header-Kompaktzustand (window.scrollY > 40)
review: number               // (optional) Testimonials
```
Datenanbindung: Buchung/Verfügbarkeit (Hotel) und Tischreservierung (Restaurant) sind später per **API** anzubinden – aktuell reine UI + Toast.

## Design Tokens
**Farben**
| Rolle | Hex |
|---|---|
| Grün 900 (Footer/Hero‑Tief) | `#17301f` / `#0a1c12` |
| Grün 800 | `#20402a` / `#204029` |
| Grün 700 | `#2a5537` |
| Grün 600 (Akzenttext) | `#3c6f49` |
| Bronze | `#c2a05e` |
| Bronze hell | `#e0c88d` / `#f2dda6` |
| Bronze tief | `#9c7c3e` |
| Creme/Paper (Body) | `#f6f1e6` |
| Creme Karte | `#fbf8f1` |
| Creme Band | `#e9e0cd` / `#f0ebdd` |
| Ink (Text) | `#212a20` |
| Ink soft | `#454e40` / `#5c6153` |
| Erfolg (Status) | `#4a8a5a` |

**Typografie**
- Display/Headlines: **Cormorant Garamond** (Google Fonts), 400–700, oft kursiv für Akzentworte.
- Body/UI: **Mulish** (Google Fonts), 300–800.
- Eyebrows: Mulish 700, 12px, `letter-spacing:.28em`, uppercase.
- Headline‑Skala: `clamp(32px … 124px)` je nach Kontext; Body 14–19px, `line-height` 1.6–1.85.

**Radius**: 2px (Buttons/Chips), 6–12px (Karten), Bogen‑Radius `215px 215px 14px 14px`.
**Schatten**: Karten `0 10px 30px rgba(23,48,31,.06)`; Funnel `0 46px 90px rgba(6,18,11,.5)`; Hero‑Bogen mehrschichtig.
**Buttons**: `btn-gold` = Gold‑Verlauf `linear-gradient(180deg,#d8bd7f,#b8935a)`, Text `#20331f`, 700 uppercase 12.5px, `letter-spacing:.06em`, Radius 2px. `btn-ghost` = transparent, 1.5px grüner Border, Hover invertiert.
**Layout**: Content‑Max‑Breite meist `1280px`, Padding `0 28px`; Sektions‑Abstände 70–110px vertikal.

## Assets (in `./assets/`)
- **`siegel-mark.png`** – Das freigestellte bronzene **Siegel‑Stilelement** (aus dem Firmenlogo extrahiert, transparent). Zentrales Marken‑Motiv – überall wiederkehrend (Header, Hero‑Medaillon, Footer, Wasserzeichen, Bestätigungs‑Toast). *Empfehlung: für Produktion als hochauflösendes SVG/PNG vom Kunden neu beziehen (aktuelle Fassung ist aus einem Screenshot extrahiert).*
- **`logo-badge.png`** – Vollständiges grünes Logo‑Badge (Original, ★★★ + Schriftzug + Siegel) – Reserve/alternative Logo‑Darstellung.
- **`hotel.jpg`** – Drohnen‑/Außenaufnahme des Hauses (Hero V2, Über‑uns, diverse Karten).
- **`sonnenuntergang.jpg`** – Stimmungsbild bei Sonnenuntergang (Hero V1 Bogen). **Achtung: nur 200×156 px** – für Produktion höher aufgelöst nachliefern.
- Weitere Fotos im Prototyp sind **Platzhalter**, die extern von der bestehenden Website verlinkt sind (`https://www.pesterwitzersiegel.de/media/images/…`, z. B. `hotelbett-01.jpg`, `festtafel.jpg`, `tagungen-02.jpg`, `kronentor-*.jpg`). Diese durch finale, lizenzierte Fotos ersetzen und lokal einbinden.

## Offene Punkte / vom Kunden zu bestätigen
- **Bilder**: finale, hochauflösende Fotos (Zimmer, Restaurant, Speisen, Team, Umgebung) statt der externen Platzhalter.
- **Inhalte**: Zimmerpreise, Arrangements‑Preise, Speisen/Weine und die Gästestimmen sind plausible **Platzhalter** – vom Kunden verifizieren lassen.
- **Geschichte/Timeline** (Über uns): Jahreszahlen/Meilensteine sind generisch – echte Historie einsetzen.
- **Buchung/Reservierung**: API‑Anbindung Hotel‑Buchungssystem + Restaurant‑Reservierung; DSGVO/Formular‑Validierung ergänzen.
- **Siegel‑Asset**: Original‑Vektor vom Kunden beziehen (schärfer als die extrahierte Fassung).
- Impressum, Datenschutz, Barrierefreiheit als echte Seiten anlegen.

## Screenshots (`./screenshots/`)
Visuelle Referenz der Views (Ausschnitt „above the fold"). Externe Platzhalter‑Fotos und die Google‑Maps‑Einbettung werden im Screenshot‑Renderer nicht dargestellt und erscheinen leer – das ist ein Tool‑Artefakt, kein Design‑Fehler.
- `01-view.png` – Startseite, **Hero Variante 1** (Editorial Arch)
- `02-view.png` – Startseite, **Hero Variante 2** (Cinematic)
- `03-view.png` – **Hotel**
- `04-view.png` – **Restaurant Albertheim**
- `05-view.png` – **Feiern & Tagen**
- `06-view.png` – **Über uns**
- `07-view.png` – **Karriere**
- `08-view.png` – **Buchung & Kontakt**

> Der Umschalter „HERO 1 · 2" unten links ist nur ein Vergleichs‑Werkzeug des Mockups und entfällt in Produktion.

## Dateien in diesem Paket
- `Pesterwitzer Siegel.dc.html` – der komplette HTML‑Prototyp (Referenz).
- `support.js` – Laufzeit, damit der Prototyp im Browser läuft (nicht für Produktion).
- `assets/` – lokale Bilder (siehe oben).
- `screenshots/` – View‑Referenzbilder (siehe oben).

### Prototyp ansehen
Einen kleinen lokalen Statik‑Server im Ordner starten (nötig, weil die Laufzeit Dateien nachlädt), z. B.:
```
npx serve .
```
und `Pesterwitzer Siegel.dc.html` öffnen. (Direktes Öffnen per `file://` funktioniert wegen Fetch‑Beschränkungen ggf. nicht.)
