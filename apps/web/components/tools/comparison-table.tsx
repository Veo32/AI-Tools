"use client";

import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { mockTools } from "@/lib/mock-data";
import { useDirectoryStore } from "@/stores/use-directory-store";
import { Button } from "@/components/ui/button";

export function ComparisonTable({ locale }: { locale: Locale }) {
  const selected = useDirectoryStore((state) => state.compareSlugs);
  const tools = selected.length ? mockTools.filter((tool) => selected.includes(tool.slug)) : mockTools.slice(0, 3);

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead className="bg-zinc-50 text-left">
          <tr>
            <th className="p-4 font-semibold">Tool</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Pricing</th>
            <th className="p-4 font-semibold">Rating</th>
            <th className="p-4 font-semibold">Best for</th>
            <th className="p-4 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.slug} className="border-t border-zinc-200">
              <td className="p-4 font-semibold">{tool.name}</td>
              <td className="p-4">{tool.category}</td>
              <td className="p-4">{tool.pricingModel}</td>
              <td className="p-4">{tool.averageRating} / 5</td>
              <td className="p-4">{tool.tags.join(", ")}</td>
              <td className="p-4">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/${locale}/tools/${tool.slug}`}>View</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
