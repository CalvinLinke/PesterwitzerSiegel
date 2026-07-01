#!/usr/bin/env node
/**
 * Tonalitäts-/Verbotslisten-Check (siehe CONTENT-STYLEGUIDE.md).
 * Durchsucht alle Quell- und Inhaltsdateien nach verbotenen Zeichen:
 *   —  Gedankenstrich (U+2014)
 *   –  Halbgeviertstrich als Gedankenstrich (U+2013)
 *   ‑  geschütztes Trennzeichen (U+2011)
 *   …  Auslassungspunkte als Zeichen (U+2026)
 * Findet das Skript einen Treffer, endet es mit Exit-Code 1.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const SCAN_DIRS = ["app", "components", "lib", "data"];
const EXTS = new Set([".tsx", ".ts", ".json", ".mdx"]);
const SKIP = new Set(["node_modules", ".next", ".git"]);

const FORBIDDEN = [
  { char: "—", name: "Gedankenstrich (—)" },
  { char: "–", name: "Halbgeviertstrich (–)" },
  { char: "‑", name: "geschütztes Trennzeichen (‑)" },
  { char: "…", name: "Auslassungspunkte (…)" },
];

/** @type {string[]} */
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full);
    else if (EXTS.has(extname(entry))) files.push(full);
  }
}
for (const d of SCAN_DIRS) {
  try {
    walk(join(ROOT, d));
  } catch {
    /* Verzeichnis fehlt, überspringen */
  }
}

let violations = 0;
for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const { char, name } of FORBIDDEN) {
      if (line.includes(char)) {
        violations++;
        const rel = file.replace(ROOT + "/", "");
        console.log(`✗ ${rel}:${i + 1}  ${name}`);
        console.log(`    ${line.trim()}`);
      }
    }
  });
}

if (violations > 0) {
  console.log(`\n${violations} Verstoß/Verstöße gegen die Verbotsliste gefunden.`);
  process.exit(1);
} else {
  console.log(`✓ Keine verbotenen Zeichen gefunden (${files.length} Dateien geprüft).`);
}
