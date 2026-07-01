import { ConsentProvider } from "@/lib/cookieConsent";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import CookieBanner from "@/components/site/CookieBanner";
import SchemaOrg from "@/components/SchemaOrg";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      <a href="#hauptinhalt" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <Header />
      <main id="hauptinhalt">{children}</main>
      <Footer />
      <CookieBanner />
      <SchemaOrg />
    </ConsentProvider>
  );
}
