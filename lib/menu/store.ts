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

/**
 * Sucht den Blob-Token. Standardname ist BLOB_READ_WRITE_TOKEN; wurde der
 * Store mit einem Präfix verbunden, heißt die Variable z. B.
 * SPEISEKARTEN_BLOB_READ_WRITE_TOKEN. Deshalb akzeptieren wir jede Variable,
 * die auf BLOB_READ_WRITE_TOKEN endet.
 */
function getBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find((k) => k.endsWith("BLOB_READ_WRITE_TOKEN"));
  return key ? process.env[key] : undefined;
}

function hasBlob(): boolean {
  return !!getBlobToken();
}

/** Liest die aktuelle Speisekarte (immer live, kein Cache). */
export async function getMenu(): Promise<MenuData> {
  const token = getBlobToken();
  if (!token) return seedData();
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: BLOB_PATH, token });
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
  const token = getBlobToken();
  if (!token) {
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
    token,
  });
  revalidatePath("/restaurant");
}

export function isBlobConfigured(): boolean {
  return hasBlob();
}
