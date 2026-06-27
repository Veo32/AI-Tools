import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CollectionsPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Custom collections</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["AI writing stack", "Developer automation", "Marketing growth"].map((title) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">Private/public collection controls are wired in the API.</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

