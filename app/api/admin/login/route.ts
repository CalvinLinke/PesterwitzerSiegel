import { NextResponse, type NextRequest } from "next/server";
import {
  SESSION_COOKIE,
  checkPassword,
  checkSecretPath,
  createSessionToken,
} from "@/lib/admin/session";

/** Prüft geheimen Link + Passwort und setzt bei Erfolg das Session-Cookie. */
export async function POST(req: NextRequest) {
  let body: { password?: string; key?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { password = "", key = "" } = body;

  if (!checkSecretPath(key) || !checkPassword(password)) {
    // bewusst unspezifische Meldung
    return NextResponse.json(
      { ok: false, error: "Zugang nicht möglich. Bitte Link und Passwort prüfen." },
      { status: 401 }
    );
  }

  let token: string;
  try {
    token = await createSessionToken();
  } catch {
    // ADMIN_SESSION_SECRET fehlt in Produktion -> Login bewusst nicht möglich.
    return NextResponse.json(
      { ok: false, error: "Serverkonfiguration unvollständig. Bitte später erneut versuchen." },
      { status: 503 }
    );
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}

/** Logout: Cookie löschen. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
