import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiKeysPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Developer portal</h1>
      <p className="mt-2 text-zinc-600">Create scoped keys, monitor usage, and monetize access with plan-based limits.</p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound size={20} /> API keys
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-200 p-4">
            <p className="font-semibold">ait_live_xxxxxxxx</p>
            <p className="text-sm text-zinc-600">Scopes: tools:read, analytics:read. Limit: 100,000 requests/month.</p>
          </div>
          <Button className="mt-4">Create API key</Button>
        </CardContent>
      </Card>
    </section>
  );
}

