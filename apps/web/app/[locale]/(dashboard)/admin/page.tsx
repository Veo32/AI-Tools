import Link from "next/link";
import { toLocale } from "@/lib/locales";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats } from "@/lib/mock-data";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = toLocale(localeParam);
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Admin dashboard</h1>
      <p className="mt-2 text-zinc-600">Moderation, analytics, billing, CMS, imports, security, and audit logs.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Analytics", "admin/analytics"],
          ["Moderation", "admin/moderation"],
          ["Importer", "admin/importer"],
          ["CMS builder", "admin/cms"],
          ["Billing", "billing"],
          ["Notifications", "notifications"]
        ].map(([title, href]) => (
          <Card key={href}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={`/${locale}/${href}`}>Open</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
