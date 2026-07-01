"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({ secretKey }: { secretKey: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, key: secretKey }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        setError(data.error || "Zugang nicht möglich.");
      }
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "min(420px, calc(100vw - 32px))",
        background: "#fbf8f1",
        border: "1px solid rgba(194,160,94,.35)",
        borderTop: "4px solid #c2a05e",
        borderRadius: 12,
        boxShadow: "0 30px 70px rgba(6,18,11,.35)",
        padding: "38px 36px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <Image src="/siegel-mark.png" alt="" width={40} height={40} style={{ height: 40, width: "auto" }} />
        <div style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#22331f" }}>Anmeldung</div>
      </div>
      <p style={{ fontSize: 14, color: "#6a6f60", marginBottom: 24, lineHeight: 1.6 }}>
        Bitte geben Sie Ihr Passwort ein, um die Speisekarten zu bearbeiten.
      </p>

      <label style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#5c6153" }}>
          Passwort
        </span>
        <input
          className="fld"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          autoFocus
        />
      </label>

      {error && (
        <p role="alert" style={{ color: "#a3341f", fontSize: 13.5, marginBottom: 16 }}>
          {error}
        </p>
      )}

      <button className="btn-gold" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Wird geprüft" : "Anmelden"}
      </button>
    </form>
  );
}
