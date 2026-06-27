import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthorPage() {
  return (
    <section className="container-shell py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold">Platform Admin</h1>
        <p className="mt-2 text-zinc-600">Curator profile for reviews, guides, collections, and public author archive pages.</p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Published guides", "Curated collections", "Verified tools"].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle>{item}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">Author content is powered by CMS pages and localized metadata.</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

