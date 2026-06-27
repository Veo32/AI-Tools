import { Suspense } from "react";
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
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPanel locale={locale} />
      </Suspense>
      <div className="mt-8">
        <Suspense fallback={<div>Loading tools...</div>}>
          <ToolsGridClient locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}