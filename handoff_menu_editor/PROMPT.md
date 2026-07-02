# Claude Code Prompt

Kopiere den folgenden Block in Claude Code (im Repo-Root von `PesterwitzerSiegel/`). Lege die beiliegende Referenzdatei `reference/Speisekarten-Editor.dc.html` vorher ins Projekt (oder öffne sie im Browser), damit du Optik und Interaktionen exakt nachbauen kannst.

---

Baue den Admin-Speisekarten-Editor neu. Ziel: übersichtliche, alltagstaugliche WYSIWYG-Oberfläche, und erstmals sollen sich **ganze Karten anlegen, umbenennen und löschen** lassen (nicht nur die drei festen). Optik und Verhalten exakt wie in der Referenzdatei `Speisekarten-Editor.dc.html` (im Browser ansehen) und im `screenshot.png`. CI/Fonts/Farben sind schon als Tokens in `app/globals.css` vorhanden (`--font-display` Cormorant Garamond, `--font-sans` Mulish, Grün/Bronze/Creme).

**Datenmodell zuerst umstellen** (sonst Compile-Fehler): `MenuData` wird von `{abend,mittag,wein}` zu einer Karten-Liste `{ cards: MenuCardEntry[] }`, wobei `MenuCardEntry = { id, label, note?, categories }`. Betroffene Dateien in dieser Reihenfolge — die genauen Code-Snippets stehen in `README.md`, Abschnitte 1–7:

1. `lib/menu/types.ts` — neuer Typ, `MENU_TABS/MenuKey/MenuCard` entfernen.
2. `data/menu.seed.json` — auf `cards`-Array umstellen (Inhalte 1:1).
3. `lib/menu/store.ts` — `normalize()` ergänzen, das alte `{abend,mittag,wein}`-Blob-Daten automatisch ins neue Format wandelt (bereits gespeicherte Daten dürfen nicht verloren gehen); in `getMenu()` und `seedData()` anwenden.
4. `app/api/menu/route.ts` — Validierung auf die Karten-Liste umstellen.
5. `components/site/MenuDisplay.tsx` — öffentliche Tabs aus `data.cards` (aktiv über Karten-`id`); der `tabpanel`-Teil bleibt unverändert.
6. `components/admin/MenuEditor.tsx` — **komplett neu**, Signatur `{ initial: MenuData; blobConfigured: boolean }` beibehalten (damit `app/admin/page.tsx` unverändert bleibt). `save()` → weiterhin `PUT /api/menu`; `logout()` wie bisher.

**Funktionsumfang des neuen Editors** (nichts weglassen):
- Karten-Tabs mit Gericht-Zähler; **aktive Karte** hat editierbaren Namen im Tab + ✕ zum Löschen (Rückfrage, letzte Karte nicht löschbar, danach Nachbarkarte aktiv); **＋ Karte** legt leere Karte an und aktiviert sie.
- Kategorien: hinzufügen, inline umbenennen, löschen, Akkordeon mit Anzahl, „Alle ein-/ausklappen“.
- Gerichte: WYSIWYG-Zeile (Name · Leader-Punkte · Preis, Beschreibung darunter), alle Felder inline editierbar, Duplizieren + Löschen beim Hover.
- **Drag & Drop** per eigenem Griff (⠿) für Gerichte und Kategorien, inkl. kategorieübergreifendem Verschieben von Gerichten; großzügige Drop-Zonen, bronzene Einfüge-Linie.
- Kopf: Hinweistext der Karte, Speicher-Status „● Nicht gespeichert / ✓ Gesichert“, Gold-Speichern + Abmelden, Bestätigungs-Toast.

**Umsetzungshinweise:** delegiertes `onChange`/`onClick` am Wurzelelement (Datenzugriff über `data-*`), `useState` für `cards/active/expanded/dirty/toast`, HTML5-Drag&Drop mit `draggable` nur am Griff und `setDragImage` auf die ganze Zeile. Die Auto-Breite der Namens-/Preisfelder nutzt `field-sizing: content` (Chromium) — bitte einen Fallback für Safari/Firefox einbauen (feste min-width oder JS-Breitenmessung). Interaktions-CSS (Hover/Fokus, Drop-Linie, Aktionen einblenden, Placeholder) aus dem `<style>`-Block der Referenz nach `app/globals.css` übernehmen.

Zum Schluss: keine Importe von `MENU_TABS/MenuKey/MenuCard` mehr, `tsc`/Build fehlerfrei, und einmal durchtesten (Karte anlegen → umbenennen → Gerichte pflegen → sortieren → speichern → `/restaurant` zeigt die neue Karte).

---

Alle exakten Code-Blöcke stehen in `README.md`. Die verbindliche Vorlage für Optik & Interaktion ist `reference/Speisekarten-Editor.dc.html`.
