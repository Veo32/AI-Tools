import { notFound } from "next/navigation";
import { toLocale } from "@/lib/locales";
import { ToolsGridClient } from "@/components/tools/tools-grid-client";
import { mockCategories } from "@/lib/mock-data";

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = toLocale(localeParam);
  const category = mockCategories.find((item) => item.slug === slug);
  if (!category) notFound();

  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">{category.name} AI tools</h1>
      <p className="mt-2 text-zinc-600">{category.description}</p>
      <div className="mt-8">
        <ToolsGridClient locale={locale} />
      </div>
    </section>
  );
}
