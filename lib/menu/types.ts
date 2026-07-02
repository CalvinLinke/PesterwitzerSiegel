/**
 * Datenmodell der Speisekarten. Bewusst schlicht gehalten, damit der Kunde
 * im Dashboard frei ganze Karten, Kategorien und Gerichte pflegen kann, ohne
 * dass sich Layout oder CI ändern.
 */
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

/** Eine ganze Speisekarte (früher: fester Schlüssel abend/mittag/wein). */
export type MenuCardEntry = {
  id: string;
  label: string; // Anzeigename im Tab, frei editierbar
  note?: string; // optionaler Hinweistext oben auf der Karte
  categories: MenuCategory[];
};

export type MenuData = {
  cards: MenuCardEntry[];
};

/** Alte Struktur (nur noch für die Migration alter Blob-Daten). */
export type LegacyMenuCard = { note?: string; categories: MenuCategory[] };
export type LegacyMenuData = {
  abend: LegacyMenuCard;
  mittag: LegacyMenuCard;
  wein: LegacyMenuCard;
};
