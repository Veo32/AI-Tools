import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPlans } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Pricing for every AI workflow</h1>
      <p className="mt-2 text-zinc-600">Subscriptions, sponsored listings, API monetization, banner ads, and white-label plans.</p>
      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {mockPlans.map((plan) => (
          <Card key={plan.slug} className={plan.slug === "growth" ? "border-teal-500" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-sm text-zinc-600">{plan.description}</p>
              <p className="pt-4 text-3xl font-bold">${plan.priceMonthly}<span className="text-sm font-medium text-zinc-500">/mo</span></p>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check size={16} className="text-teal-700" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-5 w-full">Start plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

