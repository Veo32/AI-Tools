import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotificationsPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Notifications center</h1>
      <div className="mt-8 grid gap-3">
        {["Tool approved", "Campaign budget reached 80%", "New message from vendor"].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell size={18} /> {item}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-zinc-600">Notification delivery, read status, and action links are supported by the API.</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

