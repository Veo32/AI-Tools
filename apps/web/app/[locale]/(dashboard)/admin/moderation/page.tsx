import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModerationPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Moderation queue</h1>
      <div className="mt-8 grid gap-4">
        {["Pending review", "Ownership claim", "Suggested edit", "Reported tool"].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck size={20} /> {item}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <p className="text-sm text-zinc-600">Approve, reject, audit, and notify the submitter.</p>
              <div className="flex gap-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="outline">Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

