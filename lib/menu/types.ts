/**
 * Datenmodell der Speisekarten. Bewusst schlicht gehalten, damit der Kunde
 * im Dashboard frei Kategorien und Gerichte pflegen kann, ohne dass sich
 * das Layout oder das CI ändert.
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

export type MenuCard = {
  /** optionaler Hinweistext oben (z. B. Öffnungszeiten des Mittagstischs) */
  note?: string;
  categories: MenuCategory[];
};

export type MenuKey = "abend" | "mittag" | "wein";

export type MenuData = {
  abend: MenuCard;
  mittag: MenuCard;
  wein: MenuCard;
};

export const MENU_TABS: { key: MenuKey; label: string }[] = [
  { key: "abend", label: "Abendkarte" },
  { key: "mittag", label: "Mittagstisch" },
  { key: "wein", label: "Weinkarte" },
];
