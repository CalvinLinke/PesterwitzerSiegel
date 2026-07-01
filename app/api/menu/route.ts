import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";
import { getMenu, saveMenu } from "@/lib/menu/store";
import type { MenuCard, MenuData } from "@/lib/menu/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const menu = await getMenu();
  return NextResponse.json(menu);
}

/** Minimalvalidierung, damit nur sauber strukturierte Daten gespeichert werden. */
function isCard(x: unknown): x is MenuCard {
  if (!x || typeof x !== "object") return false;
  const c = x as MenuCard;
  if (!Array.isArray(c.categories)) return false;
  return c.categories.every(
    (cat) =>
      cat &&
      typeof cat.id === "string" &&
      typeof cat.title === "string" &&
      Array.isArray(cat.items) &&
      cat.items.every(
        (it) =>
          it &&
          typeof it.id === "string" &&
          typeof it.name === "string" &&
          typeof it.beschreibung === "string" &&
          typeof it.preis === "string"
      )
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

  if (!data || !isCard(data.abend) || !isCard(data.mittag) || !isCard(data.wein)) {
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
