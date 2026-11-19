import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { OfferPopup } from "@/components/site/OfferPopup";
import { CtaBar } from "@/components/site/CtaBar";
import { currentUser } from "@/lib/auth";
import { FROM_PRICE, money } from "@/lib/pricing";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <OfferPopup />
      <CtaBar signedIn={Boolean(user)} priceLabel={money(FROM_PRICE)} />
    </div>
  );
}
