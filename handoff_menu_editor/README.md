# Handoff — Speisekarten-Editor (Neugestaltung)

Ziel: den bestehenden Admin-Editor (`/admin`) durch eine übersichtliche, alltagstaugliche WYSIWYG-Oberfläche ersetzen — und dabei erstmals **ganze Karten anlegen, umbenennen und löschen** ermöglichen (nicht nur die fixen drei).

Enthalten:
- `screenshot.png` — Zielbild.
- `reference/Speisekarten-Editor.dc.html` + `support.js` — das **lauffähige Referenz-Design**. Im Browser öffnen, um Verhalten/Optik 1:1 zu sehen. Das ist die verbindliche Vorlage für Optik & Interaktionen.
- `README.md` (diese Datei) — alle nötigen Code-Änderungen.
- `PROMPT.md` — fertiger Claude-Code-Prompt.

> Tech-Stack: Next.js (App Router), TypeScript, React Client Components, Inline-Styles + globale Klassen in `app/globals.css`. Persistenz via Vercel Blob (`lib/menu/store.ts`).

---

## 0) Der entscheidende Punkt: Datenmodell wird zur Karten-Liste

Bisher ist `MenuData` ein festes Objekt mit den Schlüsseln `abend | mittag | wein`. Damit man Karten frei hinzufügen/löschen kann, wird daraus eine **Liste von Karten**. Diese Änderung betrifft 6 Dateien:

1. `lib/menu/types.ts` — neuer Typ
2. `data/menu.seed.json` — neue Struktur
3. `lib/menu/store.ts` — Migration alter Blob-Daten
4. `app/api/menu/route.ts` — angepasste Validierung
5. `components/site/MenuDisplay.tsx` — öffentliche Anzeige (Tabs aus der Liste)
6. `components/admin/MenuEditor.tsx` — **komplett neu** (Kern der Aufgabe)

Reihenfolge unbedingt einhalten (Typ zuerst, sonst Compile-Fehler überall).

---

## 1) `lib/menu/types.ts` (ersetzen)

```ts
export type MenuItem = {
  id: string;
  name: string;
  beschreibung: string;
  preis: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

/** Eine ganze Speisekarte (früher: fixer Schlüssel abend/mittag/wein). */
export type MenuCardEntry = {
  id: string;
  label: string;         // Anzeigename im Tab, frei editierbar
  note?: string;         // optionaler Hinweistext oben auf der Karte
  categories: MenuCategory[];
};

export type MenuData = {
  cards: MenuCardEntry[];
};

/** Alte Struktur (nur noch für die Migration alter Blob-Daten). */
export type LegacyMenuCard = { note?: string; categories: MenuCategory[] };
export type LegacyMenuData = { abend: LegacyMenuCard; mittag: LegacyMenuCard; wein: LegacyMenuCard };
```

`MENU_TABS`, `MenuKey` und `MenuCard` entfallen. Alle Importe davon anpassen (siehe unten).

---

## 2) `data/menu.seed.json` (ersetzen)

Gleiche Inhalte, neue Hülle — `cards`-Array mit `id` + `label`:

```json
{
  "cards": [
    {
      "id": "abend",
      "label": "Abendkarte",
      "categories": [
        { "id": "abend-vorspeisen", "title": "Vorspeisen", "items": [
          { "id": "a1", "name": "Sächsische Kartoffelsuppe", "beschreibung": "mit Wursteinlage und frischem Majoran", "preis": "8,50 €" },
          { "id": "a2", "name": "Rehterrine", "beschreibung": "aus heimischer Jagd, mit Preiselbeeren und geröstetem Landbrot", "preis": "12,50 €" }
        ]},
        { "id": "abend-hauptgaenge", "title": "Hauptgänge", "items": [
          { "id": "a3", "name": "Sächsischer Sauerbraten", "beschreibung": "mit Rotkohl, hausgemachten Klößen und Rosinensauce", "preis": "21,90 €" },
          { "id": "a4", "name": "Zander vom Elbfischer", "beschreibung": "auf Rieslingsauce, mit Petersilienkartoffeln und Marktgemüse", "preis": "24,50 €" },
          { "id": "a5", "name": "Pesterwitzer Gemüsepfanne", "beschreibung": "aus dem eigenen Garten, mit Kräuterschmand, vegetarisch", "preis": "16,50 €" }
        ]},
        { "id": "abend-nachspeisen", "title": "Nachspeisen", "items": [
          { "id": "a6", "name": "Warmer Apfelstrudel", "beschreibung": "mit Vanillesauce und einer Kugel Sahneeis", "preis": "7,90 €" },
          { "id": "a7", "name": "Sächsische Quarkkäulchen", "beschreibung": "mit Zimtzucker und eingelegten Früchten der Saison", "preis": "7,50 €" }
        ]}
      ]
    },
    {
      "id": "mittag",
      "label": "Mittagstisch",
      "note": "Von Mittwoch bis Freitag, 11:30 bis 14:00 Uhr, wechselnd und frisch",
      "categories": [
        { "id": "mittag-gerichte", "title": "Mittagstisch", "items": [
          { "id": "m1", "name": "Tagessuppe & Bauernbrot", "beschreibung": "", "preis": "6,90 €" },
          { "id": "m2", "name": "Schnitzel Wiener Art", "beschreibung": "mit Bratkartoffeln und Gurkensalat", "preis": "13,90 €" },
          { "id": "m3", "name": "Wochengericht", "beschreibung": "unser Küchenchef überrascht Sie, fragen Sie einfach Ihren Service", "preis": "12,50 €" }
        ]}
      ]
    },
    {
      "id": "wein",
      "label": "Weinkarte",
      "note": "Weine vom Pesterwitzer Jochhöhschlößchen und von sächsischen Winzern aus der Nachbarschaft",
      "categories": [
        { "id": "wein-offen", "title": "Offene Weine", "items": [
          { "id": "w1", "name": "Pesterwitzer Müller-Thurgau", "beschreibung": "trocken, frisch, vom Hang direkt nebenan", "preis": "6,50 € / 0,2l" },
          { "id": "w2", "name": "Sächsischer Riesling", "beschreibung": "elegant, mineralisch, mit einer feinen Säure", "preis": "7,20 € / 0,2l" },
          { "id": "w3", "name": "Spätburgunder Elbtal", "beschreibung": "samtig, zum Sauerbraten unser Favorit", "preis": "7,80 € / 0,2l" }
        ]}
      ]
    }
  ]
}
```

---

## 3) `lib/menu/store.ts` (Migration ergänzen)

Wichtig: Es können bereits **alte Daten** im Blob liegen (`{abend,mittag,wein}`). Diese beim Lesen automatisch ins neue Format wandeln, damit nichts verloren geht. Nur `getMenu()` und `seedData()` anfassen — Rest bleibt.

```ts
import type { MenuData, MenuCardEntry, LegacyMenuData } from "./types";

/** Wandelt alte {abend,mittag,wein}-Daten in die neue cards-Liste. */
function normalize(raw: unknown): MenuData {
  const r = raw as Partial<MenuData> & Partial<LegacyMenuData>;
  if (r && Array.isArray((r as MenuData).cards)) return r as MenuData;
  if (r && (r.abend || r.mittag || r.wein)) {
    const map: [string, string][] = [["abend", "Abendkarte"], ["mittag", "Mittagstisch"], ["wein", "Weinkarte"]];
    const cards: MenuCardEntry[] = [];
    for (const [id, label] of map) {
      const c = (r as LegacyMenuData)[id as keyof LegacyMenuData];
      if (c) cards.push({ id, label, note: c.note, categories: c.categories ?? [] });
    }
    return { cards };
  }
  return { cards: [] };
}
```

- In `seedData()`: `return normalize(JSON.parse(JSON.stringify(seed)));`
- In `getMenu()` an **jeder** Stelle, an der aktuell Blob-JSON zurückgegeben wird: `return normalize(await res.json());` (statt `return (await res.json()) as MenuData;`).
- `saveMenu()` speichert unverändert das neue `MenuData` (mit `cards`).

---

## 4) `app/api/menu/route.ts` (Validierung anpassen)

Die Zeile `if (!data || !isCard(data.abend) || !isCard(data.mittag) || !isCard(data.wein))` ersetzen durch eine Prüfung auf die Karten-Liste:

```ts
function isItem(x: any): boolean {
  return x && typeof x.id === "string" && typeof x.name === "string"
    && typeof x.beschreibung === "string" && typeof x.preis === "string";
}
function isCategory(x: any): boolean {
  return x && typeof x.id === "string" && typeof x.title === "string"
    && Array.isArray(x.items) && x.items.every(isItem);
}
function isCardEntry(x: any): boolean {
  return x && typeof x.id === "string" && typeof x.label === "string"
    && Array.isArray(x.categories) && x.categories.every(isCategory);
}

// ... in PUT:
if (!data || !Array.isArray(data.cards) || data.cards.length === 0 || !data.cards.every(isCardEntry)) {
  return NextResponse.json({ ok: false, error: "Ungültige Daten." }, { status: 400 });
}
```

(`MenuCard`-Import in dieser Datei entfernen, `MenuData` behalten.)

---

## 5) `components/site/MenuDisplay.tsx` (öffentliche Anzeige)

Tabs kommen jetzt aus `data.cards` statt aus `MENU_TABS`. Aktiver Zustand über die Karten-`id`.

```tsx
"use client";
import { useState } from "react";
import type { MenuData } from "@/lib/menu/types";

export default function MenuDisplay({ data }: { data: MenuData }) {
  const cards = data.cards ?? [];
  const [active, setActive] = useState<string>(cards[0]?.id ?? "");
  const card = cards.find((c) => c.id === active) ?? cards[0];
  if (!card) return null;

  return (
    <>
      <div role="tablist" aria-label="Speisekarte wählen" style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 44, flexWrap: "wrap" }}>
        {cards.map((c) => {
          const on = card.id === c.id;
          return (
            <button key={c.id} type="button" role="tab" aria-selected={on} onClick={() => setActive(c.id)}
              style={{ cursor:"pointer", fontWeight:700, fontSize:12, letterSpacing:".1em", textTransform:"uppercase", padding:"11px 22px", borderRadius:2, background:on?"#20402a":"#fff", color:on?"#f0e8d3":"#3a4235", border:"none", fontFamily:"var(--font-sans)" }}>
              {c.label}
            </button>
          );
        })}
      </div>
      {/* ...restlicher tabpanel-Block UNVERÄNDERT (card.note, card.categories.map ...) ... */}
    </>
  );
}
```

Der gesamte `tabpanel`-Teil darunter (Notiz, Kategorien, Gerichte) bleibt **wie er ist** — er liest bereits `card.note` und `card.categories`.

---

## 6) `components/admin/MenuEditor.tsx` (komplett neu — Kern)

Die Referenz `reference/Speisekarten-Editor.dc.html` 1:1 nach React/TSX portieren. Sie enthält die vollständige Logik und Optik. **Signatur beibehalten**, damit `app/admin/page.tsx` unverändert bleibt:

```tsx
export default function MenuEditor({ initial, blobConfigured }: { initial: MenuData; blobConfigured: boolean }) { … }
```

`initial` ist jetzt `{ cards: [...] }`. `save()` sendet weiterhin `PUT /api/menu` mit dem kompletten `MenuData` und zeigt den Status-Toast; `logout()` wie bisher (`DELETE /api/admin/login` → `router.replace("/")`).

### Funktions-Checkliste (nichts davon weglassen)

**Karten (neu):**
- Tab-Leiste listet alle `cards` mit Gericht-Gesamtzahl als Badge.
- **Aktive** Karte: Tab-Name ist ein editierbares Feld (Umbenennen direkt im Tab) + ✕-Button zum Löschen der ganzen Karte (Rückfrage; die **letzte** verbleibende Karte darf nicht gelöscht werden → Hinweis). Nach dem Löschen wird die Nachbarkarte aktiv.
- **＋ Karte**-Button legt eine leere Karte („Neue Karte“) an und aktiviert sie.

**Kategorien:** hinzufügen, Titel inline umbenennen, löschen (Rückfrage), als Akkordeon ein-/ausklappen mit Gericht-Anzahl, „Alle ein-/ausklappen“.

**Gerichte:** WYSIWYG-Zeile (Name … Leader-Punkte … Preis, Beschreibung darunter); alle Felder inline editierbar; Duplizieren und Löschen (erscheinen beim Hover/Fokus der Zeile).

**Sortieren:** Drag & Drop über einen **eigenen Ziehgriff** (⠿) — für Gerichte *und* Kategorien. Gerichte dürfen auch **in eine andere Kategorie** gezogen werden. Großzügige Drop-Zonen, bronzefarbene Einfüge-Linie (`box-shadow: inset 0 3px 0 #c2a05e`). Der Griff ist bewusst vom Text getrennt, damit Ziehen und Tippen nie kollidieren.

**Kopf:** Hinweistext-Feld der aktiven Karte; Speicher-Status „● Nicht gespeichert / ✓ Gesichert“; Speichern-Button (Gold) + Abmelden; Bestätigungs-Toast.

### Umsetzungshinweise
- **Struktur wie in der Referenz:** ein zentraler `onFieldChange` (delegiertes React-`onChange` am Wurzel-Element, liest `data-field/-cat/-id/-card`) und ein zentraler `onAction` (delegiertes `onClick`, liest `data-action`). Das hält den Code kompakt statt Dutzender Closures.
- **Zustand:** `useState` für `cards`, `active` (Karten-id), `expanded` (Record<catId, boolean>), `dirty`, `toast`. `id`s via `crypto.randomUUID()` o. Ä.
- **Drag & Drop:** HTML5-DnD. `draggable` nur auf dem Griff. In `onDragStart` `e.dataTransfer.setDragImage(rowEl, …)` auf die ganze Zeile setzen. Drop-Zonen sind die Kategorien-Liste (`data-kind="cat"`) und je Kategorie die Gericht-Liste (`data-kind="item" data-cat`). Einfügeindex über die Mitten (`getBoundingClientRect`) der direkten Kinder (`:scope > [data-drag-row]`) bestimmen; Einfüge-Linie rein visuell per CSS-Klasse.
- **Auto-Breite der Felder** (Name/Preis hugsen ihren Inhalt für die Leader-Punkte): `field-sizing: content`. Das ist Chromium-only. **Fallback** für Safari/Firefox: entweder feste `width`/`min-width` setzen oder Breite per verstecktem Mess-Span/JS nachführen. Bitte einen der Fallbacks einbauen.
- **Interaktions-CSS** (Hover/Fokus der Felder, Drop-Linie, Aktionen beim Hover einblenden, Placeholder) als kleine Klassen-Sammlung in `app/globals.css` ergänzen (in der Referenz im `<style>`-Block enthalten — von dort übernehmen). Farben/Fonts sind bereits als Tokens vorhanden (`--font-display` = Cormorant Garamond, `--font-sans` = Mulish, Grün/Bronze/Creme).

---

## 7) Aufräumen / Abschluss

- Alle Importe von `MENU_TABS`, `MenuKey`, `MenuCard` entfernen (nur noch in `store.ts` intern für die Migration relevant).
- `npm run build` bzw. `tsc` muss fehlerfrei sein.
- Testen: Karte anlegen → umbenennen → Kategorien/Gerichte pflegen → sortieren (auch kategorieübergreifend) → speichern → `/restaurant` zeigt die neue Karte als zusätzlichen Tab.
- Alte, bereits gespeicherte Blob-Daten müssen dank `normalize()` weiterhin laden.
