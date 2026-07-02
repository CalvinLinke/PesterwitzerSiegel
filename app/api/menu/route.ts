import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import { getMenu, saveMenu } from "@/lib/menu/store";
import type { MenuData } from "@/lib/menu/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const menu = await getMenu();
  return NextResponse.json(menu);
}

/* Minimalvalidierung, damit nur sauber strukturierte Daten gespeichert werden. */
function isItem(x: unknown): boolean {
  const it = x as Record<string, unknown>;
  return (
    !!it &&
    typeof it.id === "string" &&
    typeof it.name === "string" &&
    typeof it.beschreibung === "string" &&
    typeof it.preis === "string"
  );
}
function isCategory(x: unknown): boolean {
  const c = x as Record<string, unknown>;
  return (
    !!c &&
    typeof c.id === "string" &&
    typeof c.title === "string" &&
    Array.isArray(c.items) &&
    c.items.every(isItem)
  );
}
function isCardEntry(x: unknown): boolean {
  const c = x as Record<string, unknown>;
  return (
    !!c &&
    typeof c.id === "string" &&
    typeof c.label === "string" &&
    Array.isArray(c.categories) &&
    c.categories.every(isCategory)
  );
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return NextResponse.json({ ok: false, error: "Nicht angemeldet." }, { status: 401 });
  }

  let data: MenuData;
  try {
    data = (await req.json()) as MenuData;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Daten." }, { status: 400 });
  }

  if (!data || !Array.isArray(data.cards) || data.cards.length === 0 || !data.cards.every(isCardEntry)) {
    return NextResponse.json({ ok: false, error: "Struktur der Speisekarte ist ungültig." }, { status: 400 });
  }

  try {
    await saveMenu(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Speichern fehlgeschlagen.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
