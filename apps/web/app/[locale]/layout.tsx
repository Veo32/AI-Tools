import type { Metadata } from "next";
import { isRtl, locales, toLocale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  return {
    alternates: {
      canonical: `${appUrl}/${locale}`,
      languages: Object.fromEntries(locales.map((item) => [item, `${appUrl}/${item}`]))
    },
    openGraph: {
      type: "website",
      locale,
      siteName: "AI Atlas",
      title: "AI Atlas",
      description: "Enterprise AI tools directory SaaS platform"
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  const dictionary = getDictionary(locale);

  return (
    <Providers>
      <div lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"} className="min-h-screen bg-white text-zinc-950">
        <SiteHeader locale={locale} nav={dictionary.nav} />
        <main>{children}</main>
        <SiteFooter locale={locale} />
      </div>
    </Providers>
  );
}
