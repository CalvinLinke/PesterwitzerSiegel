import Link from "next/link";
import { checkSecretPath, isPasswordRequired } from "@/lib/admin/session";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key = "" } = await searchParams;
  const valid = checkSecretPath(key);
  const passwordRequired = isPasswordRequired();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "radial-gradient(135% 108% at 22% 6%,#1a4028 0%,#102a1b 46%,#0a1c12 100%)",
      }}
    >
      {valid ? (
        <LoginForm secretKey={key} passwordRequired={passwordRequired} />
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#e9e2cf",
            maxWidth: 440,
          }}
        >
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "#f0e8d3", marginBottom: 12 }}>
            Seite nicht gefunden
          </h1>
          <p style={{ color: "#a9b3a0", lineHeight: 1.7, marginBottom: 24 }}>
            Dieser Zugang ist nur über einen persönlichen, geheimen Link möglich. Bitte verwenden Sie
            den Link, den Sie von uns erhalten haben.
          </p>
          <Link href="/" className="btn-gold">
            Zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
