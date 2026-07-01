# Hotel Pesterwitzer Siegel

Website des familiär geführten 3-Sterne-Hotels **Pesterwitzer Siegel** mit
Restaurant **Albertheim** in Freital-Pesterwitz bei Dresden. Umgesetzt nach dem
Design-Hand-Off als moderne, mehrseitige Website.

## Technik

- **Next.js 15** (App Router) mit **TypeScript**
- **Tailwind CSS 4** und CSS-Variablen für das Marken-CI
- Schriften **Cormorant Garamond** und **Mulish** lokal über `next/font` (kein Google-Request)
- Speisekarten-Speicher über **Vercel Blob** (eine JSON-Datei, keine Datenbank)

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Werte eintragen (siehe unten)
npm run dev
```

Die Seite läuft dann unter `http://localhost:3000`.

## Umgebungsvariablen

| Variable | Zweck |
|---|---|
| `ADMIN_SECRET_PATH` | geheimer Schlüssel im Admin-Link (`/admin/login?key=…`) |
| `ADMIN_PASSWORD` | Passwort für die Anmeldung |
| `ADMIN_SESSION_SECRET` | Geheimnis zum Signieren des Login-Cookies |
| `BLOB_READ_WRITE_TOKEN` | von Vercel gesetzt, sobald ein Blob-Store verbunden ist |

Ohne `BLOB_READ_WRITE_TOKEN` läuft die Seite mit den Standard-Speisekarten aus
`data/menu.seed.json`; das Speichern im Admin ist dann deaktiviert.

## Speisekarten bearbeiten (Admin)

Der Zugang erfolgt über einen **geheimen Link plus Passwort** (kein E-Mail-Versand):

```
https://IHRE-DOMAIN/admin/login?key=<ADMIN_SECRET_PATH>
```

Diesen Link als Lesezeichen speichern. Nach Eingabe des Passworts lassen sich im
Dashboard die **Abendkarte**, der **Mittagstisch** und die **Weinkarte** frei
pflegen: Kategorien anlegen (etwa Vorspeisen, Hauptgang, Nachspeisen oder ein
zusätzlicher Zwischengang), Gerichte mit Name, Beschreibung und Preis hinzufügen,
sortieren und löschen. Ein Klick auf „Speichern“ macht die Änderungen sofort auf
der Restaurant-Seite sichtbar. Layout und CI bleiben dabei unverändert.

## Deployment (Vercel)

1. Repository mit Vercel verbinden.
2. Einen **Blob-Store** anlegen (Storage → Blob). `BLOB_READ_WRITE_TOKEN` wird
   automatisch als Umgebungsvariable ergänzt.
3. `ADMIN_SECRET_PATH`, `ADMIN_PASSWORD` und `ADMIN_SESSION_SECRET` als
   Umgebungsvariablen setzen.
4. Deployen. Danach in Vercel unter der Domain den geheimen Admin-Link aufrufen.

## Nützliche Skripte

```bash
npm run build          # Produktions-Build
npm run check:content  # Tonalitäts-/Verbotslisten-Check (siehe CONTENT-STYLEGUIDE.md)
```

## Rechtliches & SEO

- Vollständiges **Impressum**, **Datenschutz** und eine **Barrierefreiheits**-Erklärung
- **Cookie-Banner** im CI mit Einwilligung; **Google Maps** lädt erst nach Zustimmung
- Pro Seite eigene Metadaten, OpenGraph-Bild fürs Teilen, `sitemap.xml`, `robots.txt`
  und strukturierte Daten (JSON-LD: Hotel und Restaurant)
