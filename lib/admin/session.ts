/**
 * Schlanke Admin-Authentifizierung ohne Datenbank.
 *
 * Zugang nur über einen geheimen Link (ADMIN_SECRET_PATH) plus Passwort
 * (ADMIN_PASSWORD). Nach erfolgreichem Login wird ein HMAC-signiertes,
 * httpOnly-Cookie gesetzt. Die Krypto nutzt die Web-Crypto-API, damit sie
 * sowohl in der Edge-Middleware als auch in Route-Handlern läuft.
 */

export const SESSION_COOKIE = "ps_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 Tage
const isProd = process.env.NODE_ENV === "production";

// Geheimer Link und Signatur-Geheimnis haben immer einen Standardwert, damit
// der Zugang auch nach einem Deploy ohne gesetzte Umgebungsvariablen
// funktioniert (Entwicklungsphase). Für den Produktivbetrieb sollten diese
// Werte über die Umgebungsvariablen gesetzt werden.
function envOr(name: string, fallback: string): string {
  const v = process.env[name];
  if (v && v.length > 0) return v;
  return fallback;
}

/** Ob überhaupt ein Passwort verlangt wird. Ohne ADMIN_PASSWORD ist der
 *  Zugang bewusst offen (nur über den geheimen Link). */
export function isPasswordRequired(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function getSecretPath(): string {
  return envOr("ADMIN_SECRET_PATH", "speisekarte-verwalten");
}

function getSessionSecret(): string {
  return envOr("ADMIN_SESSION_SECRET", "dev-only-session-secret-change-me");
}

export function isConfigured(): boolean {
  return (
    !!process.env.ADMIN_PASSWORD &&
    !!process.env.ADMIN_SECRET_PATH &&
    !!process.env.ADMIN_SESSION_SECRET
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}

/** Zeitkonstanter Vergleich zweier Strings. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function checkPassword(input: string): boolean {
  // Offener Entwicklungsmodus: ohne gesetztes Passwort wird keins verlangt.
  if (!isPasswordRequired()) return true;
  return safeEqual(input, getAdminPassword());
}

export function checkSecretPath(input: string): boolean {
  const expected = getSecretPath();
  if (!expected) return false;
  return safeEqual(input, expected);
}

export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + SESSION_TTL_MS;
  const sig = await hmac(String(exp));
  return `${exp}.${sig}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const expStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = await hmac(expStr);
  return safeEqual(sig, expected);
}
