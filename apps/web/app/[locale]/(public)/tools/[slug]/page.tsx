import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTools } from "@/lib/mock-data";

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const tool = mockTools.find((item) => item.slug === slug);
  if (!tool) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          applicationCategory: tool.category,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tool.averageRating,
            ratingCount: tool.reviewCount
          }
        }}
      />
      <section className="border-b border-zinc-200 bg-teal-50 py-10">
        <div className="container-shell">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex gap-2">
                {tool.sponsored ? <Badge>Sponsored</Badge> : null}
                {tool.featured ? <Badge>Featured</Badge> : null}
              </div>
              <h1 className="mt-4 text-4xl font-bold">{tool.name}</h1>
              <p className="mt-3 text-lg text-zinc-700">{tool.shortDescription}</p>
            </div>
            <Button>Visit website</Button>
          </div>
        </div>
      </section>
      <section className="container-shell grid gap-6 py-10 lg:grid-cols-[1fr_340px]">
        <article>
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="mt-3 leading-8 text-zinc-700">{tool.description}</p>
          <h2 className="mt-8 text-2xl font-bold">Reviews and ratings</h2>
          <div className="mt-4 rounded-lg border border-zinc-200 p-5">
            <p className="text-3xl font-bold">{tool.averageRating} / 5</p>
            <p className="text-zinc-600">{tool.reviewCount} verified reviews. Review moderation is enabled in the backend.</p>
          </div>
        </article>
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Tool facts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <p><strong>Category:</strong> {tool.category}</p>
              <p><strong>Pricing:</strong> {tool.pricingModel}</p>
              <p><strong>Clicks:</strong> {tool.clickCount.toLocaleString()}</p>
              <p><strong>Tags:</strong> {tool.tags.join(", ")}</p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}
