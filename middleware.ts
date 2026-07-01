import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

/**
 * Schützt den Admin-Bereich. Die Login-Seite (/admin/login) prüft den geheimen
 * Link selbst und bleibt daher offen. Alle übrigen /admin-Seiten benötigen ein
 * gültiges Session-Cookie, sonst geht es zurück auf die Startseite.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const ok = await verifySessionToken(token);
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
