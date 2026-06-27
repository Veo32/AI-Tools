import { CreditCard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
  return (
    <section className="container-shell py-10">
      <h1 className="text-3xl font-bold">Billing and subscriptions</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard size={20} /> Current plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Growth</p>
            <p className="text-zinc-600">Stripe, PayPal, Paddle, and LemonSqueezy adapters are scaffolded.</p>
            <Button className="mt-4">Manage subscription</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText size={20} /> Invoices</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-zinc-600">Recurring invoices and provider webhook audit logs are available in the backend.</CardContent>
        </Card>
      </div>
    </section>
  );
}

