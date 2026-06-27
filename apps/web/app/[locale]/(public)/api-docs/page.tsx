import { Code2, KeyRound, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiDocsPage() {
  const features = [
    { Icon: KeyRound, title: "API keys", body: "Scoped keys with rate limits, revocation, and usage tracking." },
    { Icon: Code2, title: "REST and Swagger", body: "NestJS OpenAPI documentation is available at /docs on the API service." },
    { Icon: Zap, title: "Commercial access", body: "Plan limits support API credits, vendor feeds, and white-label partners." }
  ];

  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Developer API</h1>
      <p className="mt-2 text-zinc-600">Monetize access to normalized AI tools data, analytics, comparisons, and recommendation endpoints.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map(({ Icon, title, body }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon size={20} /> {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">{body}</CardContent>
          </Card>
        ))}
      </div>
      <pre className="mt-8 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm text-zinc-50">
{`curl -H "x-api-key: ait_your_key" http://localhost:4000/v1/developer/tools`}
      </pre>
    </section>
  );
}
