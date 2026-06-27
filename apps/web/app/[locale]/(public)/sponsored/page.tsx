import { toLocale } from "@/lib/locales";
import { ToolsGridClient } from "@/components/tools/tools-grid-client";

export default async function SponsoredPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Sponsored AI tools</h1>
      <p className="mt-2 text-zinc-600">Premium placements include impression, click, CTR, and conversion tracking.</p>
      <div className="mt-8">
        <ToolsGridClient locale={locale} filter="sponsored" />
      </div>
    </section>
  );
}
