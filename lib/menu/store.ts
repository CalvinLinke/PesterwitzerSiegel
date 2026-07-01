import "server-only";
import { revalidatePath } from "next/cache";
import seed from "@/data/menu.seed.json";
import type { MenuData } from "./types";

/**
 * Persistenz der Speisekarten OHNE Datenbank: eine einzige JSON-Datei im
 * Vercel-Blob-Store. Ist kein Blob-Store konfiguriert (z. B. lokal ohne
 * Token), fällt alles auf den mitgelieferten Seed zurück, damit die Seite
 * immer rendert.
 */
const BLOB_PATH = "menu/menu.json";

function seedData(): MenuData {
  // tiefe Kopie, damit der importierte Seed nie mutiert wird
  return JSON.parse(JSON.stringify(seed)) as MenuData;
}

function hasBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/** Liest die aktuelle Speisekarte (immer live, kein Cache). */
export async function getMenu(): Promise<MenuData> {
  if (!hasBlob()) return seedData();
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: BLOB_PATH });
    const match = blobs.find((b) => b.pathname === BLOB_PATH);
    if (!match) return seedData();
    const res = await fetch(match.url, { cache: "no-store" });
    if (!res.ok) return seedData();
    return (await res.json()) as MenuData;
  } catch {
    return seedData();
  }
}

/** Speichert die Speisekarte und macht die Restaurant-Seite sofort aktuell. */
export async function saveMenu(data: MenuData): Promise<void> {
  if (!hasBlob()) {
    throw new Error(
      "Kein Blob-Store konfiguriert. Bitte BLOB_READ_WRITE_TOKEN in den Umgebungsvariablen setzen (Vercel Blob)."
    );
  }
  const { put } = await import("@vercel/blob");
  await put(BLOB_PATH, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  revalidatePath("/restaurant");
}

export function isBlobConfigured(): boolean {
  return hasBlob();
}
