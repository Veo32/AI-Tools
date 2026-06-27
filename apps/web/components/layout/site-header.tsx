import Link from "next/link";
import { Bot, LayoutDashboard, Search } from "lucide-react";
import type { Locale } from "@/lib/locales";
import { Button } from "@/components/ui/button";

type NavLabels = {
  discover: string;
  categories: string;
  compare: string;
  pricing: string;
  api: string;
  dashboard: string;
};

export function SiteHeader({ locale, nav }: { locale: Locale; nav: NavLabels }) {
  const links = [
    ["discover", nav.discover],
    ["categories", nav.categories],
    ["compare", nav.compare],
    ["pricing", nav.pricing],
    ["api-docs", nav.api]
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-teal-700 text-white">
            <Bot size={20} />
          </span>
          <span>AI Atlas</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={`/${locale}/${href}`} className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Search">
            <Search size={16} />
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href={`/${locale}/dashboard`}>
              <LayoutDashboard size={16} />
              {nav.dashboard}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
