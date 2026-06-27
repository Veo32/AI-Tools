"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchPanel({
  locale,
  placeholder = "Search 100,000+ AI tools",
  searchLabel = "Search"
}: {
  locale: string;
  placeholder?: string;
  searchLabel?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    const q = String(formData.get("q") ?? "");
    const pricing = String(formData.get("pricing") ?? "");
    const next = new URLSearchParams(params);
    if (q) next.set("q", q);
    if (pricing) next.set("pricing", pricing);
    startTransition(() => router.push(`/${locale}/discover?${next.toString()}`));
  }

  return (
    <form action={onSubmit} className="surface grid gap-3 rounded-lg p-3 md:grid-cols-[1fr_180px_auto]">
      <label className="relative block">
        <Search className="pointer-events-none absolute start-3 top-3 text-zinc-400" size={18} />
        <Input name="q" placeholder={placeholder} className="ps-10" defaultValue={params.get("q") ?? ""} />
      </label>
      <select name="pricing" defaultValue={params.get("pricing") ?? ""} className="h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm">
        <option value="">All pricing</option>
        <option value="FREE">Free</option>
        <option value="FREEMIUM">Freemium</option>
        <option value="PAID">Paid</option>
        <option value="CONTACT_SALES">Contact sales</option>
      </select>
      <Button type="submit" disabled={pending}>
        <SlidersHorizontal size={16} />
        {searchLabel}
      </Button>
    </form>
  );
}
