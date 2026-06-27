import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ImporterPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">AI tools importer</h1>
      <p className="mt-2 text-zinc-600">CSV/API bulk import, field mapping, queue processing, and duplicate detection.</p>
      <Card className="mt-8 max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UploadCloud size={20} /> Bulk import</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Input placeholder="https://vendor.example/tools.csv" />
          <textarea className="min-h-32 rounded-md border border-zinc-300 p-3 text-sm" placeholder="Paste CSV rows or API payload preview" />
          <Button>Queue import</Button>
        </CardContent>
      </Card>
    </section>
  );
}

