# Handoff — Hero → Funnel Übergang

Ziel: Zwei klar getrennte, satte Blöcke — **grüne Herosektion** oben, **Creme-Willkommensektion** unten — mit einer sauberen Kante dazwischen. Die weiße **Leadfunnel-Karte** liegt als schwebendes Element **mittig über dieser Kante** (obere Hälfte im Grün, untere Hälfte im Creme). Kein weicher Farbverlauf, kein Dither-Rauschen mehr hinter der Karte.

Siehe `screenshot.png` für das Zielresultat.

---

## Was ist das Problem im aktuellen Code?

In `app/(site)/page.tsx` hat die Funnel-`<section>` einen riesigen Mehrstufen-`linear-gradient` (von `#0a1c12` über diverse Grau-/Beige-Stufen bis `#f6f1e6`) **plus** eine `.funnel-dither`-Rauschschicht. Das erzeugt den „komischen Farbverlauf" hinter der Karte.

Zusätzlich: durch **Margin-Collapsing** zieht das negative `margin-top: -190px` der Karte die komplette Creme-Sektion mit nach oben — dadurch sitzt die Karte fast vollständig im Creme statt mittig auf der Kante.

## Die Lösung (nur **eine** Datei ändert sich: `app/(site)/page.tsx`)

Die Heroes (`components/site/HeroHome.tsx`) müssen **nicht** angefasst werden: beide Varianten laufen bereits sauber auf `#0a1c12` aus und liefern damit die gewünschte satte grüne Unterkante.

An der Funnel-`<section>` genau vier Dinge:

1. **Hintergrund** → einfarbig `#f6f1e6` (den gesamten Mehrstufen-Gradient ersetzen).
2. **`padding-top: 143px`** ergänzen — verhindert das Margin-Collapsing, sodass die Creme-Fläche exakt an der Hero-Kante beginnt und das negative Margin nur noch die Karte bewegt.
3. **`.funnel-dither`-Div entfernen** (wird nicht mehr gebraucht).
4. **Karten-`margin-top`** von `-190px` auf **`-285px`** ändern — das ist die halbe Kartenhöhe (Karte ≈ 285 px), damit die Trennlinie exakt mittig durch die Karte läuft (142 px im Grün / 142 px im Creme).

### Vorher

```tsx
<section
  style={{
    position: "relative",
    isolation: "isolate",
    background:
      "linear-gradient(180deg,#0a1c12 0px,#0f2417 60px,#18301f 130px,#29402b 210px,#465541 300px,#6b7566 400px,#97998a 500px,#bfbaa6 590px,#ddd6c4 670px,#ece5d6 745px,#f6f1e6 820px,#f6f1e6 100%)",
    padding: "0 0 84px",
  }}
>
  <div className="funnel-dither" aria-hidden="true" />
  <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
    <div
      style={{
        background: "#fbf8f1",
        border: "1px solid rgba(194,160,94,.35)",
        borderTop: "4px solid #c2a05e",
        borderRadius: 12,
        boxShadow: "0 46px 90px rgba(6,18,11,.5),0 10px 26px rgba(6,18,11,.22)",
        margin: "-190px auto 0",
        padding: "32px 40px 40px",
        position: "relative",
        zIndex: 6,
      }}
    >
```

### Nachher

```tsx
<section
  style={{
    position: "relative",
    background: "#f6f1e6",
    padding: "143px 0 84px",
  }}
>
  <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 28px", position: "relative" }}>
    <div
      style={{
        background: "#fbf8f1",
        border: "1px solid rgba(194,160,94,.35)",
        borderTop: "4px solid #c2a05e",
        borderRadius: 12,
        boxShadow: "0 46px 90px rgba(6,18,11,.5),0 10px 26px rgba(6,18,11,.22)",
        margin: "-285px auto 0",
        padding: "32px 40px 40px",
        position: "relative",
        zIndex: 6,
      }}
    >
```

Geändert: `isolation` entfällt, `background` einfarbig, `padding` bekommt `143px` oben, `.funnel-dither`-Div raus, `zIndex: 1` am Wrapper entfällt, Karten-`margin` `-190px` → `-285px`.

### Aufräumen (optional)

Die Regel `.funnel-dither { … }` in `app/globals.css` (um Zeile 328) wird nicht mehr verwendet und kann entfernt werden.

---

## Warum genau `143px` / `-285px`?

- Kartenhöhe im Desktop-Layout ≈ **285 px**.
- `padding-top: 143px` schiebt die Karte in den Fluss und unterbindet Margin-Collapsing.
- `margin-top: -285px` zieht sie so weit hoch, dass ihre **Oberkante 142 px über der Kante** (im Grün) und ihre **Unterkante 143 px darunter** (im Creme) liegt → Kante mittig.
- Falls sich die Kartenhöhe später ändert (andere Felder/Copy), beide Werte proportional nachziehen: `padding-top ≈ Kartenhöhe/2`, `margin-top ≈ -Kartenhöhe`.

## Prüfen

- Desktop: grüne Hero-Kante ist scharf, Creme beginnt sofort darunter, die weiße Karte schwebt mittig über der Kante (`screenshot.png`).
- Kein sichtbarer Farbverlauf/Rauschen mehr hinter der Karte.
- Mobil: Felder stapeln sich (Karte höher); Karte hängt weiterhin mit dem oberen Teil ins Grün — das ist ok.
