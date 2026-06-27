import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from "@/lib/mock-data";

export default async function CategoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">AI tool categories</h1>
      <p className="mt-2 text-zinc-600">Localized category pages are SEO-ready with hreflang and canonical routing.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {mockCategories.map((category) => (
          <Link key={category.slug} href={`/${locale}/categories/${category.slug}`}>
            <Card className="h-full transition hover:border-teal-400">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600">{category.description}</p>
                <p className="mt-4 text-sm font-semibold text-teal-800">{category.count.toLocaleString()} tools</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
