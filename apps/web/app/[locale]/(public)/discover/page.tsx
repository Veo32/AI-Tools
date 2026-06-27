import { toLocale } from "@/lib/locales";
import { SearchPanel } from "@/components/tools/search-panel";
import { ToolsGridClient } from "@/components/tools/tools-grid-client";

export default async function DiscoverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  return (
    <section className="container-shell py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Discover AI tools</h1>
        <p className="mt-2 text-zinc-600">Filter by category, pricing, tags, ratings, freshness, and sponsored placement.</p>
      </div>
      <SearchPanel locale={locale} />
      <div className="mt-8">
        <ToolsGridClient locale={locale} />
      </div>
    </section>
  );
}
