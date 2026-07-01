"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Schlanker Consent-Manager ohne Datenbank. Speichert die Einwilligung
 * versioniert im localStorage. Kategorie "funktional" schaltet u.a. die
 * eingebettete Google-Maps-Karte frei.
 */
export type ConsentCategories = {
  notwendig: true; // immer aktiv, technisch erforderlich
  funktional: boolean; // Google Maps (Einbettung von google.com)
};

type StoredConsent = {
  v: number;
  ts: number;
  funktional: boolean;
};

const STORAGE_KEY = "ps_cookie_consent";
const VERSION = 1;
const MAX_AGE_DAYS = 365;
export const CONSENT_EVENT = "ps-consent-set";

type ConsentContextValue = {
  ready: boolean; // Consent aus localStorage gelesen?
  decided: boolean; // hat der Nutzer schon entschieden?
  categories: ConsentCategories;
  acceptAll: () => void;
  acceptEssential: () => void;
  setFunktional: (value: boolean) => void;
  reopen: () => void;
  bannerOpen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function read(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== VERSION) return null;
    const ageDays = (Date.now() - parsed.ts) / (1000 * 60 * 60 * 24);
    if (ageDays > MAX_AGE_DAYS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [decided, setDecided] = useState(false);
  const [funktional, setFunktionalState] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    const stored = read();
    if (stored) {
      setDecided(true);
      setFunktionalState(stored.funktional);
      setBannerOpen(false);
    } else {
      setBannerOpen(true);
    }
    setReady(true);
  }, []);

  const persist = useCallback((value: boolean) => {
    const payload: StoredConsent = { v: VERSION, ts: Date.now(), funktional: value };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* localStorage nicht verfügbar, dann gilt die Entscheidung nur für die Sitzung */
    }
    setFunktionalState(value);
    setDecided(true);
    setBannerOpen(false);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { funktional: value } }));
  }, []);

  const value: ConsentContextValue = {
    ready,
    decided,
    categories: { notwendig: true, funktional },
    acceptAll: () => persist(true),
    acceptEssential: () => persist(false),
    setFunktional: (v: boolean) => persist(v),
    reopen: () => setBannerOpen(true),
    bannerOpen,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent muss innerhalb von ConsentProvider verwendet werden");
  return ctx;
}
