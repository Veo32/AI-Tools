"use client";

import { useQuery } from "@tanstack/react-query";
import type { Locale } from "@/lib/locales";
import { getTools } from "@/lib/api";
import { mockTools } from "@/lib/mock-data";
import { ToolCard } from "./tool-card";

export function ToolsGridClient({ locale, filter }: { locale: Locale; filter?: "sponsored" | "featured" | "latest" }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tools", filter],
    queryFn: getTools,
    initialData: { items: mockTools, total: mockTools.length, page: 1, limit: 24, pages: 1 }
  });
  let tools = data.items;
  if (filter === "sponsored") tools = tools.filter((tool) => tool.sponsored);
  if (filter === "featured") tools = tools.filter((tool) => tool.featured || tool.sponsored);
  if (filter === "latest") tools = [...tools].reverse();

  if (isLoading) return <div className="rounded-lg border border-zinc-200 p-6">Loading tools...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} locale={locale} />
      ))}
    </div>
  );
}
