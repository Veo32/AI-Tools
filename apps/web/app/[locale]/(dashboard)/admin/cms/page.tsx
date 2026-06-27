import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CmsBuilderPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">CMS and landing page builder</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["Hero", "Featured grid", "Pricing table", "FAQ", "CTA band", "Comparison block"].map((block) => (
          <Card key={block}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Layers size={18} /> {block}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline">Add block</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

