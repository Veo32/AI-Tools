import { toLocale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";
import { SearchPanel } from "@/components/tools/search-panel";
import { ToolsGridClient } from "@/components/tools/tools-grid-client";
import { Badge } from "@/components/ui/badge";
import { dashboardStats } from "@/lib/mock-data";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  const dictionary = getDictionary(locale);
  const t = dictionary.home;
  const actions = dictionary.actions;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AI Atlas",
          url: process.env.APP_URL ?? "http://localhost:3000",
          potentialAction: {
            "@type": "SearchAction",
            target: `${process.env.APP_URL ?? "http://localhost:3000"}/${locale}/discover?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <section className="border-b border-zinc-200 bg-gradient-to-b from-teal-50 to-white py-10">
        <div className="container-shell">
          <div className="max-w-3xl">
            <Badge>{t.eyebrow}</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-950 md:text-6xl">{t.title}</h1>
            <p className="mt-4 text-lg leading-8 text-zinc-700">{t.subtitle}</p>
          </div>
          <div className="mt-8">
            <SearchPanel locale={locale} placeholder={t.searchPlaceholder} searchLabel={actions.search} />
          </div>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-zinc-200 bg-white p-4">
                <dt className="text-sm text-zinc-600">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="container-shell py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Featured AI tools</h2>
            <p className="text-zinc-600">Sponsored, verified, and high-performing tools appear first.</p>
          </div>
        </div>
        <ToolsGridClient locale={locale} filter="featured" />
      </section>
    </>
  );
}
