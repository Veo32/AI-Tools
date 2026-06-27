import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats, mockTools } from "@/lib/mock-data";

export default function AdminAnalyticsPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Advanced analytics</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Top tools by engagement</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {mockTools.map((tool) => (
            <div key={tool.slug} className="flex items-center justify-between rounded-md border border-zinc-200 p-3">
              <span className="font-semibold">{tool.name}</span>
              <span className="text-sm text-zinc-600">{tool.clickCount.toLocaleString()} clicks</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

