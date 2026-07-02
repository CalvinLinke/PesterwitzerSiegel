# Claude Code Prompt

Kopiere den folgenden Block in Claude Code (im Repo-Root von `PesterwitzerSiegel/`):

---

Ändere den Übergang zwischen Herosektion und Willkommensektion auf der Startseite.

**Ziel:** Zwei klar getrennte, satte Blöcke — grüne Herosektion oben, Creme-Willkommensektion (`#f6f1e6`) unten — mit einer sauberen, scharfen Kante dazwischen. Die weiße Leadfunnel-Karte soll als schwebendes Element mittig über dieser Kante liegen (obere Hälfte im Grün, untere Hälfte im Creme). Der aktuelle „weiche" Mehrstufen-Farbverlauf mit Dither-Rauschen hinter der Karte muss weg.

**Nur `app/(site)/page.tsx` anfassen** — an der Funnel-`<section>` (Kommentar `{/* FUNNEL, hakt in den Hero ein */}`):

1. Den gesamten Mehrstufen-`linear-gradient` im `background` durch die einfarbige Farbe `#f6f1e6` ersetzen.
2. `isolation: "isolate"` entfernen.
3. `padding` von `"0 0 84px"` auf `"143px 0 84px"` ändern (das `padding-top` verhindert Margin-Collapsing, damit das negative Margin nur die Karte bewegt und nicht die ganze Sektion mitzieht).
4. Das `<div className="funnel-dither" aria-hidden="true" />` löschen und `zIndex: 1` vom `maxWidth: 920`-Wrapper entfernen.
5. Bei der weißen Karte das `margin` von `"-190px auto 0"` auf `"-285px auto 0"` ändern (halbe bzw. volle Kartenhöhe ≈ 285 px, damit die Trennlinie exakt mittig durch die Karte verläuft).

`components/site/HeroHome.tsx` **nicht** ändern — beide Hero-Varianten laufen bereits sauber auf `#0a1c12` aus und liefern die gewünschte grüne Unterkante.

Optional: die ungenutzte Regel `.funnel-dither { … }` in `app/globals.css` entfernen.

Danach `npm run dev`, Startseite prüfen: scharfe grüne Kante, kein Verlauf/Rauschen hinter der Karte, Karte mittig auf der Kante.

---

Vollständige Vorher/Nachher-Snippets stehen in `README.md`, Zielbild in `screenshot.png`.
