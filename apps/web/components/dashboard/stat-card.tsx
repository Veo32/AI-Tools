import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-zinc-500">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="mt-2 text-sm font-medium text-teal-800">{delta} this period</p>
      </CardContent>
    </Card>
  );
}

