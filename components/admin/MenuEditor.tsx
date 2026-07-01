"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MENU_TABS, type MenuCategory, type MenuData, type MenuItem, type MenuKey } from "@/lib/menu/types";

function uid(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function clone(data: MenuData): MenuData {
  return JSON.parse(JSON.stringify(data)) as MenuData;
}

const fieldCap: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  color: "#5c6153",
  display: "block",
  marginBottom: 4,
};

export default function MenuEditor({
  initial,
  blobConfigured,
}: {
  initial: MenuData;
  blobConfigured: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<MenuData>(initial);
  const [active, setActive] = useState<MenuKey>("abend");
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const card = data[active];

  function update(mut: (draft: MenuData) => void) {
    setData((prev) => {
      const next = clone(prev);
      mut(next);
      return next;
    });
    setStatus(null);
  }

  // --- Kategorie-Operationen ---
  function addCategory() {
    update((d) => {
      d[active].categories.push({ id: uid("cat"), title: "Neue Kategorie", items: [] });
    });
  }
  function removeCategory(ci: number) {
    if (!confirm("Diese Kategorie mit allen Gerichten wirklich löschen?")) return;
    update((d) => {
      d[active].categories.splice(ci, 1);
    });
  }
  function moveCategory(ci: number, dir: -1 | 1) {
    update((d) => {
      const cats = d[active].categories;
      const ni = ci + dir;
      if (ni < 0 || ni >= cats.length) return;
      [cats[ci], cats[ni]] = [cats[ni], cats[ci]];
    });
  }
  function setCategoryTitle(ci: number, title: string) {
    update((d) => {
      d[active].categories[ci].title = title;
    });
  }
  function setNote(note: string) {
    update((d) => {
      d[active].note = note;
    });
  }

  // --- Gericht-Operationen ---
  function addItem(ci: number) {
    update((d) => {
      d[active].categories[ci].items.push({ id: uid("it"), name: "", beschreibung: "", preis: "" });
    });
  }
  function removeItem(ci: number, ii: number) {
    update((d) => {
      d[active].categories[ci].items.splice(ii, 1);
    });
  }
  function moveItem(ci: number, ii: number, dir: -1 | 1) {
    update((d) => {
      const items = d[active].categories[ci].items;
      const ni = ii + dir;
      if (ni < 0 || ni >= items.length) return;
      [items[ii], items[ni]] = [items[ni], items[ii]];
    });
  }
  function setItemField(ci: number, ii: number, field: keyof MenuItem, value: string) {
    update((d) => {
      (d[active].categories[ci].items[ii][field] as string) = value;
    });
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus({ type: "ok", msg: "Gespeichert. Die Änderungen sind jetzt auf der Website sichtbar." });
        router.refresh();
      } else {
        setStatus({ type: "err", msg: json.error || "Speichern fehlgeschlagen." });
      }
    } catch {
      setStatus({ type: "err", msg: "Verbindung fehlgeschlagen. Bitte erneut versuchen." });
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/");
    router.refresh();
  }

  return (
    <>
      {/* Kopfleiste */}
      <header
        style={{
          background: "#17301f",
          color: "#f0e8d3",
          padding: "16px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/siegel-mark.png" alt="" width={34} height={34} style={{ height: 34, width: "auto" }} />
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>Speisekarten verwalten</div>
            <div style={{ fontSize: 12, color: "#a9b3a0" }}>Pesterwitzer Siegel · Restaurant Albertheim</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-gold" type="button" onClick={save} disabled={saving} style={{ opacity: saving ? 0.7 : 1 }}>
            {saving ? "Wird gespeichert" : "Speichern"}
          </button>
          <button
            type="button"
            onClick={logout}
            style={{
              background: "transparent",
              color: "#e0c88d",
              border: "1.5px solid rgba(224,200,141,.5)",
              borderRadius: 2,
              padding: "12px 20px",
              fontWeight: 700,
              fontSize: 12.5,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Abmelden
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 90px" }}>
        {!blobConfigured && (
          <div
            style={{
              background: "#fdf3e3",
              border: "1px solid #e6c98a",
              borderRadius: 8,
              padding: "16px 18px",
              marginBottom: 24,
              fontSize: 14,
              color: "#7a5a1e",
              lineHeight: 1.6,
            }}
          >
            <strong>Hinweis:</strong> Es ist noch kein Speicher verbunden (Vercel Blob). Sie können
            hier alles ausprobieren, aber ein Speichern ist erst möglich, wenn die Umgebungsvariable{" "}
            <code>BLOB_READ_WRITE_TOKEN</code> gesetzt ist.
          </div>
        )}

        {status && (
          <div
            role="status"
            style={{
              background: status.type === "ok" ? "#e7f0e7" : "#fbe6e0",
              border: `1px solid ${status.type === "ok" ? "#a9cdae" : "#e2a998"}`,
              color: status.type === "ok" ? "#2a5537" : "#a3341f",
              borderRadius: 8,
              padding: "14px 18px",
              marginBottom: 24,
              fontSize: 14,
            }}
          >
            {status.msg}
          </div>
        )}

        {/* Karten-Tabs */}
        <div role="tablist" aria-label="Speisekarte wählen" style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {MENU_TABS.map((t) => {
            const on = active === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t.key)}
                style={{
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  padding: "12px 22px",
                  borderRadius: 4,
                  background: on ? "#20402a" : "#fff",
                  color: on ? "#f0e8d3" : "#3a4235",
                  border: `1px solid ${on ? "#20402a" : "#e0d7c1"}`,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Hinweistext der Karte */}
        <div style={{ background: "#fbf8f1", border: "1px solid #eadfc9", borderRadius: 8, padding: 20, marginBottom: 20 }}>
          <label style={fieldCap} htmlFor="menu-note">
            Hinweistext (optional, erscheint oben auf der Karte)
          </label>
          <input
            id="menu-note"
            className="fld"
            type="text"
            value={card.note ?? ""}
            placeholder="z. B. Öffnungszeiten des Mittagstischs"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Kategorien */}
        {card.categories.map((cat, ci) => (
          <CategoryBlock
            key={cat.id}
            cat={cat}
            first={ci === 0}
            last={ci === card.categories.length - 1}
            onTitle={(v) => setCategoryTitle(ci, v)}
            onRemove={() => removeCategory(ci)}
            onMove={(d) => moveCategory(ci, d)}
            onAddItem={() => addItem(ci)}
            onRemoveItem={(ii) => removeItem(ci, ii)}
            onMoveItem={(ii, d) => moveItem(ci, ii, d)}
            onItemField={(ii, f, v) => setItemField(ci, ii, f, v)}
          />
        ))}

        <button
          type="button"
          onClick={addCategory}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 8,
            border: "1.5px dashed #c2a05e",
            background: "transparent",
            color: "#2a5537",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          + Kategorie hinzufügen (z. B. Zwischengang)
        </button>
      </div>
    </>
  );
}

function CategoryBlock({
  cat,
  first,
  last,
  onTitle,
  onRemove,
  onMove,
  onAddItem,
  onRemoveItem,
  onMoveItem,
  onItemField,
}: {
  cat: MenuCategory;
  first: boolean;
  last: boolean;
  onTitle: (v: string) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  onAddItem: () => void;
  onRemoveItem: (ii: number) => void;
  onMoveItem: (ii: number, dir: -1 | 1) => void;
  onItemField: (ii: number, field: keyof MenuItem, value: string) => void;
}) {
  return (
    <section style={{ background: "#fff", border: "1px solid #eadfc9", borderRadius: 10, padding: 22, marginBottom: 18 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <label style={fieldCap}>Kategorie</label>
          <input className="fld" type="text" value={cat.title} onChange={(e) => onTitle(e.target.value)} placeholder="z. B. Vorspeisen" />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <IconBtn label="Nach oben" disabled={first} onClick={() => onMove(-1)}>↑</IconBtn>
          <IconBtn label="Nach unten" disabled={last} onClick={() => onMove(1)}>↓</IconBtn>
          <IconBtn label="Kategorie löschen" danger onClick={onRemove}>✕</IconBtn>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cat.items.map((item, ii) => (
          <div key={item.id} style={{ borderTop: "1px solid #f0ebdd", paddingTop: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px auto", gap: 10, marginBottom: 8 }} className="ps-item-grid">
              <div>
                <label style={fieldCap}>Name</label>
                <input className="fld" type="text" value={item.name} onChange={(e) => onItemField(ii, "name", e.target.value)} placeholder="Name des Gerichts" />
              </div>
              <div>
                <label style={fieldCap}>Preis</label>
                <input className="fld" type="text" value={item.preis} onChange={(e) => onItemField(ii, "preis", e.target.value)} placeholder="z. B. 12,50 €" />
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
                <IconBtn label="Nach oben" disabled={ii === 0} onClick={() => onMoveItem(ii, -1)}>↑</IconBtn>
                <IconBtn label="Nach unten" disabled={ii === cat.items.length - 1} onClick={() => onMoveItem(ii, 1)}>↓</IconBtn>
                <IconBtn label="Gericht löschen" danger onClick={() => onRemoveItem(ii)}>✕</IconBtn>
              </div>
            </div>
            <label style={fieldCap}>Beschreibung</label>
            <input className="fld" type="text" value={item.beschreibung} onChange={(e) => onItemField(ii, "beschreibung", e.target.value)} placeholder="kurze Beschreibung (optional)" />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddItem}
        style={{
          marginTop: 16,
          padding: "10px 16px",
          borderRadius: 4,
          border: "1px solid #c2a05e",
          background: "#faf5ea",
          color: "#2a5537",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        + Gericht hinzufügen
      </button>

      <style>{`
        @media (max-width: 560px) {
          .ps-item-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 40,
        height: 44,
        borderRadius: 4,
        border: `1px solid ${danger ? "#e2a998" : "#e0d7c1"}`,
        background: danger ? "#fbe6e0" : "#fff",
        color: danger ? "#a3341f" : "#3a4235",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        fontSize: 15,
      }}
    >
      {children}
    </button>
  );
}
