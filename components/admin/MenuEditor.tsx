"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { MenuCardEntry, MenuData } from "@/lib/menu/types";

/* ---------------------------------------------------------------------------
 * Hilfen
 * ------------------------------------------------------------------------- */
function uid(p: string): string {
  const rnd =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${p}-${rnd}`;
}
function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T;
}

/** Erkennt einmalig, ob der Browser field-sizing:content beherrscht (Chromium). */
function supportsFieldSizing(): boolean {
  try {
    return typeof CSS !== "undefined" && !!CSS.supports && CSS.supports("field-sizing", "content");
  } catch {
    return false;
  }
}

/* Auto-Breite-Fallback (Safari/Firefox): Textbreite über ein verstecktes Span messen. */
let measureSpan: HTMLSpanElement | null = null;
function autoWidth(el: HTMLInputElement | null, min: number, max: number) {
  if (!el || supportsFieldSizing()) return;
  if (!measureSpan) {
    measureSpan = document.createElement("span");
    Object.assign(measureSpan.style, {
      position: "absolute",
      left: "-9999px",
      top: "-9999px",
      whiteSpace: "pre",
      visibility: "hidden",
    } as CSSStyleDeclaration);
    document.body.appendChild(measureSpan);
  }
  const cs = getComputedStyle(el);
  measureSpan.style.fontFamily = cs.fontFamily;
  measureSpan.style.fontSize = cs.fontSize;
  measureSpan.style.fontWeight = cs.fontWeight;
  measureSpan.style.fontStyle = cs.fontStyle;
  measureSpan.style.letterSpacing = cs.letterSpacing;
  measureSpan.textContent = el.value || el.placeholder || "";
  const pad = parseFloat(cs.paddingLeft || "0") + parseFloat(cs.paddingRight || "0");
  const w = measureSpan.getBoundingClientRect().width + pad + 8;
  el.style.width = `${Math.max(min, Math.min(max, w))}px`;
}

/** Input mit automatischer Breite (Name, Preis, Karten-Tab). */
function SizeInput({
  minWidth,
  maxWidth,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { minWidth: number; maxWidth: number }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    autoWidth(ref.current, minWidth, maxWidth);
  });
  return <input ref={ref} {...props} />;
}

/** Textarea, die mit dem Inhalt mitwächst (auch ohne field-sizing). */
function GrowTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || supportsFieldSizing()) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  });
  return <textarea ref={ref} {...props} />;
}

type DragInfo = { kind: "cat" | "item"; cat?: string; id: string } | null;

/* ---------------------------------------------------------------------------
 * Editor
 * ------------------------------------------------------------------------- */
export default function MenuEditor({
  initial,
  blobConfigured,
}: {
  initial: MenuData;
  blobConfigured: boolean;
}) {
  const router = useRouter();
  const [cards, setCards] = useState<MenuCardEntry[]>(initial.cards ?? []);
  const [active, setActive] = useState<string>(initial.cards?.[0]?.id ?? "");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);

  const dragRef = useRef<DragInfo>(null);
  const dragRowRef = useRef<HTMLElement | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const card = cards.find((c) => c.id === active) ?? cards[0];

  function isExpanded(id: string) {
    return expanded[id] !== false; // Standard: ausgeklappt
  }
  function showToast(msg: string, ok = true) {
    setToast({ ok, msg });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }
  function mutate(fn: (draft: MenuCardEntry[]) => void) {
    setCards((prev) => {
      const next = clone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
  }
  function activeIn(draft: MenuCardEntry[]) {
    return draft.find((c) => c.id === active);
  }

  /* ---- Feldänderungen (ein gemeinsamer Handler, liest data-*) ---- */
  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const t = e.target;
    const f = t.dataset.field;
    if (!f) return;
    const val = t.value;
    if (f === "card-label") {
      const cid = t.dataset.card;
      mutate((d) => {
        const c = d.find((x) => x.id === cid);
        if (c) c.label = val;
      });
      return;
    }
    if (f === "note") {
      mutate((d) => {
        const c = activeIn(d);
        if (c) c.note = val;
      });
      return;
    }
    if (f === "cat-title") {
      const cid = t.dataset.cat;
      mutate((d) => {
        const c = activeIn(d)?.categories.find((x) => x.id === cid);
        if (c) c.title = val;
      });
      return;
    }
    const cid = t.dataset.cat,
      id = t.dataset.id;
    mutate((d) => {
      const c = activeIn(d)?.categories.find((x) => x.id === cid);
      const it = c?.items.find((x) => x.id === id);
      if (it) (it as Record<string, string>)[f] = val;
    });
  };

  /* ---- Aktionen (delegiert am Wurzelknoten, liest data-action) ---- */
  const onAction = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest?.("[data-action]") as HTMLElement | null;
    if (!el) return;
    const a = el.dataset.action;
    const cat = el.dataset.cat;
    const id = el.dataset.id;

    if (a === "tab") {
      setActive(el.dataset.tab || "");
      return;
    }
    if (a === "save") {
      void save();
      return;
    }
    if (a === "logout") {
      void logout();
      return;
    }
    if (a === "add-card") {
      const nid = uid("card");
      setCards((prev) => [...clone(prev), { id: nid, label: "Neue Karte", note: "", categories: [] }]);
      setActive(nid);
      setDirty(true);
      showToast("Neue Karte angelegt, jetzt benennen und füllen.");
      return;
    }
    if (a === "del-card") {
      const cid = el.dataset.card!;
      if (cards.length <= 1) {
        alert("Es muss mindestens eine Karte geben.");
        return;
      }
      const c = cards.find((x) => x.id === cid);
      if (!confirm(`Die Karte „${c ? c.label : ""}“ mit allen Kategorien und Gerichten wirklich löschen?`)) return;
      setCards((prev) => {
        const next = clone(prev);
        const i = next.findIndex((x) => x.id === cid);
        if (i >= 0) next.splice(i, 1);
        if (active === cid) {
          const neighbour = next[i] || next[i - 1] || next[0];
          setActive(neighbour ? neighbour.id : "");
        }
        return next;
      });
      setDirty(true);
      return;
    }
    if (a === "toggle-cat") {
      const cur = isExpanded(cat!);
      setExpanded((s) => ({ ...s, [cat!]: !cur }));
      return;
    }
    if (a === "toggle-all") {
      if (!card) return;
      const open = card.categories.some((c) => isExpanded(c.id));
      const target = !open;
      setExpanded((s) => {
        const map = { ...s };
        card.categories.forEach((c) => {
          map[c.id] = target;
        });
        return map;
      });
      return;
    }
    if (a === "del-cat") {
      if (!confirm("Diese Kategorie mit allen Gerichten wirklich löschen?")) return;
      mutate((d) => {
        const c = activeIn(d);
        if (!c) return;
        const i = c.categories.findIndex((x) => x.id === cat);
        if (i >= 0) c.categories.splice(i, 1);
      });
      return;
    }
    if (a === "add-cat") {
      const nid = uid("cat");
      mutate((d) => {
        activeIn(d)?.categories.push({ id: nid, title: "Neue Kategorie", items: [] });
      });
      setExpanded((s) => ({ ...s, [nid]: true }));
      return;
    }
    if (a === "add-item") {
      mutate((d) => {
        const c = activeIn(d)?.categories.find((x) => x.id === cat);
        c?.items.push({ id: uid("it"), name: "", beschreibung: "", preis: "" });
      });
      setExpanded((s) => ({ ...s, [cat!]: true }));
      return;
    }
    if (a === "del-item") {
      mutate((d) => {
        const c = activeIn(d)?.categories.find((x) => x.id === cat);
        if (!c) return;
        const i = c.items.findIndex((x) => x.id === id);
        if (i >= 0) c.items.splice(i, 1);
      });
      return;
    }
    if (a === "dup-item") {
      mutate((d) => {
        const c = activeIn(d)?.categories.find((x) => x.id === cat);
        if (!c) return;
        const i = c.items.findIndex((x) => x.id === id);
        if (i >= 0) c.items.splice(i + 1, 0, { ...c.items[i], id: uid("it") });
      });
      return;
    }
  };

  /* ---- Speichern / Abmelden ---- */
  async function save() {
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards }),
      });
      const j = await res.json();
      if (res.ok && j.ok) {
        setDirty(false);
        showToast("Gespeichert, Änderungen sind auf der Website sichtbar.");
        router.refresh();
      } else {
        showToast(j.error || "Speichern fehlgeschlagen.", false);
      }
    } catch {
      showToast("Verbindung fehlgeschlagen. Bitte erneut versuchen.", false);
    } finally {
      setSaving(false);
    }
  }
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/");
    router.refresh();
  }

  /* ---- Drag & Drop ---- */
  function clearIndicators() {
    document.querySelectorAll(".drop-before,.drop-after").forEach((el) => el.classList.remove("drop-before", "drop-after"));
  }
  const onGripStart = (e: React.DragEvent<HTMLElement>) => {
    const g = e.currentTarget;
    dragRef.current = {
      kind: (g.dataset.kind as "cat" | "item") || "item",
      cat: g.dataset.cat,
      id: g.dataset.id || "",
    };
    try {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", g.dataset.id || "");
    } catch {
      /* ignore */
    }
    const row = g.closest("[data-drag-row]") as HTMLElement | null;
    if (row) {
      dragRowRef.current = row;
      requestAnimationFrame(() => row.classList.add("dragging"));
      try {
        e.dataTransfer.setDragImage(row, 26, 22);
      } catch {
        /* ignore */
      }
    }
  };
  const onGripEnd = () => {
    if (dragRowRef.current) dragRowRef.current.classList.remove("dragging");
    clearIndicators();
    dragRef.current = null;
    dragRowRef.current = null;
  };
  function rowsOf(zone: HTMLElement) {
    return Array.from(zone.querySelectorAll(":scope > [data-drag-row]")) as HTMLElement[];
  }
  const onZoneOver = (e: React.DragEvent<HTMLElement>) => {
    const zone = e.currentTarget;
    const drag = dragRef.current;
    if (!drag || zone.dataset.kind !== drag.kind) return;
    e.preventDefault();
    try {
      e.dataTransfer.dropEffect = "move";
    } catch {
      /* ignore */
    }
    clearIndicators();
    const rows = rowsOf(zone);
    let placed = false;
    for (const r of rows) {
      if (r === dragRowRef.current) continue;
      const rect = r.getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) {
        r.classList.add("drop-before");
        placed = true;
        break;
      }
    }
    if (!placed) {
      const visible = rows.filter((r) => r !== dragRowRef.current);
      const last = visible[visible.length - 1];
      if (last) last.classList.add("drop-after");
    }
  };
  const onZoneLeave = () => {
    /* Indikatoren werden beim nächsten Over/Drop/End bereinigt */
  };
  const onZoneDrop = (e: React.DragEvent<HTMLElement>) => {
    const zone = e.currentTarget;
    const drag = dragRef.current;
    if (!drag || zone.dataset.kind !== drag.kind) {
      onGripEnd();
      return;
    }
    e.preventDefault();
    const rows = rowsOf(zone);
    let index = rows.length;
    for (let i = 0; i < rows.length; i++) {
      const rect = rows[i].getBoundingClientRect();
      if (e.clientY < rect.top + rect.height / 2) {
        index = i;
        break;
      }
    }
    if (drag.kind === "cat") {
      mutate((d) => {
        const c = activeIn(d);
        if (!c) return;
        const arr = c.categories;
        const from = arr.findIndex((x) => x.id === drag.id);
        if (from < 0) return;
        const [m] = arr.splice(from, 1);
        let to = index;
        if (from < to) to--;
        if (to < 0) to = 0;
        if (to > arr.length) to = arr.length;
        arr.splice(to, 0, m);
      });
    } else {
      const targetCat = zone.dataset.cat;
      mutate((d) => {
        const c = activeIn(d);
        if (!c) return;
        const src = c.categories.find((x) => x.id === drag.cat);
        const tgt = c.categories.find((x) => x.id === targetCat);
        if (!src || !tgt) return;
        const from = src.items.findIndex((x) => x.id === drag.id);
        if (from < 0) return;
        const [m] = src.items.splice(from, 1);
        let to = index;
        if (src === tgt && from < to) to--;
        if (to < 0) to = 0;
        if (to > tgt.items.length) to = tgt.items.length;
        tgt.items.splice(to, 0, m);
      });
    }
    clearIndicators();
    if (dragRowRef.current) dragRowRef.current.classList.remove("dragging");
    dragRef.current = null;
    dragRowRef.current = null;
  };

  const anyOpen = card ? card.categories.some((c) => isExpanded(c.id)) : false;

  return (
    <div
      style={{ minHeight: "100vh", background: "#f6f1e6", fontFamily: "var(--font-sans)", color: "#212a20" }}
      onClick={onAction}
    >
      {/* Kopfleiste */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "#17301f",
          color: "#f0e8d3",
          padding: "13px 26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          boxShadow: "0 2px 18px rgba(6,18,11,.28)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <Image src="/siegel-mark.png" alt="" width={36} height={36} style={{ height: 36, width: "auto" }} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, lineHeight: 1.05 }}>
              Speisekarten verwalten
            </div>
            <div style={{ fontSize: 12, color: "#a9b3a0", marginTop: 1 }}>
              Pesterwitzer Siegel · Restaurant Albertheim
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".02em",
              padding: "6px 12px",
              borderRadius: 100,
              background: dirty ? "rgba(224,200,141,.16)" : "rgba(240,232,211,.08)",
              color: dirty ? "#e6c98a" : "#9fb098",
              border: dirty ? "1px solid rgba(224,200,141,.35)" : "1px solid transparent",
            }}
          >
            {dirty ? "● Nicht gespeichert" : "✓ Gesichert"}
          </span>
          <button className="savebtn" data-action="save" type="button" disabled={saving} style={{ opacity: dirty && !saving ? 1 : 0.65 }}>
            {saving ? "Speichert" : dirty ? "Speichern" : "Gespeichert"}
          </button>
          <button className="ghostbtn" data-action="logout" type="button">
            Abmelden
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "26px 22px 130px" }}>
        {!blobConfigured && (
          <div
            style={{
              background: "#fdf3e3",
              border: "1px solid #e6c98a",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 18,
              fontSize: 14,
              color: "#7a5a1e",
              lineHeight: 1.6,
            }}
          >
            <strong>Hinweis:</strong> Es ist noch kein Speicher verbunden (Vercel Blob). Sie können hier alles
            ausprobieren, aber ein Speichern ist erst möglich, wenn die Umgebungsvariable{" "}
            <code>BLOB_READ_WRITE_TOKEN</code> gesetzt ist.
          </div>
        )}

        {/* Karten-Tabs */}
        <div role="tablist" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
          {cards.map((cd) => {
            const count = cd.categories.reduce((n, c) => n + c.items.length, 0);
            const on = cd.id === active;
            const badgeStyle: React.CSSProperties = {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 20,
              height: 20,
              padding: "0 6px",
              borderRadius: 10,
              fontSize: 11,
              fontWeight: 700,
              background: on ? "rgba(246,241,230,.18)" : "#efe8d6",
              color: on ? "#f0e8d3" : "#8a8574",
            };
            if (on) {
              return (
                <div
                  key={cd.id}
                  className="tab"
                  style={{ background: "#20402a", color: "#f0e8d3", border: "1px solid #20402a", paddingRight: 10 }}
                >
                  <SizeInput
                    className="tab-edit"
                    data-field="card-label"
                    data-card={cd.id}
                    value={cd.label}
                    onChange={onFieldChange}
                    placeholder="Kartenname"
                    minWidth={60}
                    maxWidth={240}
                    aria-label="Kartenname"
                  />
                  <span style={badgeStyle}>{count}</span>
                  <button className="tab-x" data-action="del-card" data-card={cd.id} title="Diese Karte löschen" type="button">
                    ✕
                  </button>
                </div>
              );
            }
            return (
              <button
                key={cd.id}
                className="tab"
                data-action="tab"
                data-tab={cd.id}
                type="button"
                style={{ background: "#fff", color: "#3a4235", border: "1px solid #e0d7c1" }}
              >
                <span>{cd.label}</span>
                <span style={badgeStyle}>{count}</span>
              </button>
            );
          })}
          <button className="tab-add" data-action="add-card" type="button">
            ＋ Karte
          </button>
        </div>

        {/* Hinweiszeile */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 13, color: "#8a8f80", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#c3bba6", fontSize: 15, letterSpacing: "-2px" }}>⠿</span>
            Tippen zum Bearbeiten · am Griff ziehen zum Sortieren
          </div>
          <button className="linkbtn" data-action="toggle-all" type="button">
            {anyOpen ? "Alle einklappen" : "Alle ausklappen"}
          </button>
        </div>

        {/* Hinweis auf der Karte */}
        <div style={{ background: "#fbf8f1", border: "1px solid #eadfc9", borderRadius: 12, padding: "12px 14px", marginBottom: 18, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "#8a8f80", whiteSpace: "nowrap" }}>
            Hinweis auf der Karte
          </span>
          <input
            className="note-inp"
            data-field="note"
            value={card?.note ?? ""}
            onChange={onFieldChange}
            placeholder="optional, z. B. „Von Mittwoch bis Freitag, 11:30 bis 14:00 Uhr“"
            style={{ flex: 1, minWidth: 220 }}
            aria-label="Hinweistext der Karte"
          />
        </div>

        {/* Kategorien */}
        <div
          data-dropzone
          data-kind="cat"
          onDragOver={onZoneOver}
          onDrop={onZoneDrop}
          onDragLeave={onZoneLeave}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {(card?.categories ?? []).map((cat) => {
            const n = cat.items.length;
            const exp = isExpanded(cat.id);
            return (
              <section
                key={cat.id}
                data-drag-row
                data-cat-id={cat.id}
                style={{ background: "#fbf8f1", border: "1px solid #eadfc9", borderRadius: 14, boxShadow: "0 2px 10px rgba(23,48,31,.05)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 14px" }}>
                  <span
                    className="grip"
                    draggable
                    data-kind="cat"
                    data-id={cat.id}
                    onDragStart={onGripStart}
                    onDragEnd={onGripEnd}
                    title="Ziehen zum Sortieren"
                  >
                    ⠿
                  </span>
                  <input
                    className="cat-title"
                    data-field="cat-title"
                    data-cat={cat.id}
                    value={cat.title}
                    onChange={onFieldChange}
                    placeholder="Kategorie"
                    style={{ flex: 1 }}
                    aria-label="Kategoriename"
                  />
                  <span style={{ fontSize: 12, color: "#8a8f80", whiteSpace: "nowrap", margin: "0 4px" }}>
                    {n === 1 ? "1 Gericht" : `${n} Gerichte`}
                  </span>
                  <button className="icon-btn" data-action="toggle-cat" data-cat={cat.id} title="Ein-/Ausklappen" type="button">
                    <span style={{ display: "inline-block", transition: "transform .18s", transform: exp ? "rotate(0deg)" : "rotate(-90deg)", fontSize: 13 }}>▾</span>
                  </button>
                  <button className="icon-btn danger" data-action="del-cat" data-cat={cat.id} title="Kategorie löschen" type="button">
                    ✕
                  </button>
                </div>

                {exp && (
                  <div style={{ padding: "0 14px 14px 14px" }}>
                    <div
                      data-dropzone
                      data-kind="item"
                      data-cat={cat.id}
                      onDragOver={onZoneOver}
                      onDrop={onZoneDrop}
                      onDragLeave={onZoneLeave}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {cat.items.map((item) => (
                        <div
                          key={item.id}
                          data-drag-row
                          data-item-id={item.id}
                          className="dish"
                          style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "11px 6px", borderTop: "1px solid #f0ebdd" }}
                        >
                          <span
                            className="grip"
                            draggable
                            data-kind="item"
                            data-cat={cat.id}
                            data-id={item.id}
                            onDragStart={onGripStart}
                            onDragEnd={onGripEnd}
                            title="Ziehen zum Sortieren"
                            style={{ marginTop: 3 }}
                          >
                            ⠿
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                              <SizeInput
                                className="mname"
                                data-field="name"
                                data-cat={cat.id}
                                data-id={item.id}
                                value={item.name}
                                onChange={onFieldChange}
                                placeholder="Name des Gerichts"
                                minWidth={80}
                                maxWidth={520}
                                aria-label="Name des Gerichts"
                              />
                              <span style={{ flex: 1, borderBottom: "1.5px dotted #ccbf9c", transform: "translateY(-4px)", minWidth: 16 }} />
                              <SizeInput
                                className="mprice"
                                data-field="preis"
                                data-cat={cat.id}
                                data-id={item.id}
                                value={item.preis}
                                onChange={onFieldChange}
                                placeholder="0,00 €"
                                minWidth={48}
                                maxWidth={160}
                                aria-label="Preis"
                              />
                            </div>
                            <GrowTextarea
                              className="mdesc"
                              data-field="beschreibung"
                              data-cat={cat.id}
                              data-id={item.id}
                              rows={1}
                              placeholder="Beschreibung (optional)"
                              value={item.beschreibung}
                              onChange={onFieldChange}
                              aria-label="Beschreibung"
                            />
                          </div>
                          <div className="dish-actions" style={{ display: "flex", gap: 5, marginTop: 2 }}>
                            <button className="icon-btn" data-action="dup-item" data-cat={cat.id} data-id={item.id} title="Duplizieren" type="button">
                              ⧉
                            </button>
                            <button className="icon-btn danger" data-action="del-item" data-cat={cat.id} data-id={item.id} title="Gericht löschen" type="button">
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="add-item-btn" data-action="add-item" data-cat={cat.id} type="button">
                      <span style={{ fontSize: 15 }}>＋</span> Gericht hinzufügen
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <button className="add-cat-btn" data-action="add-cat" type="button">
          ＋ Kategorie hinzufügen (z. B. Zwischengang)
        </button>
      </div>

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 26,
            transform: "translateX(-50%)",
            background: "#20402a",
            color: "#f0e8d3",
            padding: "13px 24px",
            borderRadius: 9,
            boxShadow: "0 14px 34px rgba(6,18,11,.42)",
            fontSize: 14,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid rgba(224,200,141,.3)",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          <span style={{ color: toast.ok ? "#7bd08e" : "#e2a998" }}>{toast.ok ? "✓" : "!"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
