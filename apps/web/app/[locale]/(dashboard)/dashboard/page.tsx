import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { StatCard } from "@/components/dashboard/stat-card";
import { SubmitToolForm } from "@/components/tools/submit-tool-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, mockTools } from "@/lib/mock-data";

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  return (
    <section className="container-shell py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User dashboard</h1>
          <p className="mt-2 text-zinc-600">Manage bookmarks, collections, submitted tools, API keys, billing, and notifications.</p>
        </div>
        <Button asChild>
          <Link href={`/${locale}/dashboard/api-keys`}>Developer portal</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardHeader>
            <CardTitle>Bookmarked tools</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {mockTools.slice(0, 3).map((tool) => (
              <div key={tool.slug} className="flex items-center justify-between rounded-md border border-zinc-200 p-3">
                <div>
                  <p className="font-semibold">{tool.name}</p>
                  <p className="text-sm text-zinc-600">{tool.shortDescription}</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/${locale}/tools/${tool.slug}`}>Open</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <SubmitToolForm />
      </div>
    </section>
  );
}
