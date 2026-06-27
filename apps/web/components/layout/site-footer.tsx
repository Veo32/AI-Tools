import Link from "next/link";
import type { Locale } from "@/lib/locales";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="container-shell grid gap-6 py-8 md:grid-cols-4">
        <div>
          <p className="font-bold">AI Atlas</p>
          <p className="mt-2 text-sm text-zinc-600">Enterprise AI tools directory, monetization, analytics, and API platform.</p>
        </div>
        {[
          ["Product", "discover", "compare", "sponsored"],
          ["Company", "blog", "authors/platform-admin", "pricing"],
          ["Platform", "api-docs", "dashboard/api-keys", "admin"]
        ].map(([title, ...items]) => (
          <div key={title}>
            <p className="font-semibold">{title}</p>
            <div className="mt-2 grid gap-2 text-sm text-zinc-600">
              {items.map((item) => (
                <Link key={item} href={`/${locale}/${item}`}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
