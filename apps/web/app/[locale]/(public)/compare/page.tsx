import { toLocale } from "@/lib/locales";
import { ComparisonTable } from "@/components/tools/comparison-table";

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Compare AI tools</h1>
      <p className="mt-2 text-zinc-600">Compare pricing, ratings, categories, and capabilities side by side.</p>
      <div className="mt-8">
        <ComparisonTable locale={locale} />
      </div>
    </section>
  );
}
