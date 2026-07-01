import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verwaltung",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh", background: "#f6f1e6" }}>{children}</div>;
}
