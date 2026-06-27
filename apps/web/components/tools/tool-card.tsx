"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Bookmark, ExternalLink, GitCompare, Star } from "lucide-react";
import type { Locale } from "@/lib/locales";
import type { Tool } from "@/lib/mock-data";
import { useDirectoryStore } from "@/stores/use-directory-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ToolCard({ tool, locale }: { tool: Tool; locale: Locale }) {
  const toggleCompare = useDirectoryStore((state) => state.toggleCompare);
  const toggleBookmark = useDirectoryStore((state) => state.toggleBookmark);
  const compareSlugs = useDirectoryStore((state) => state.compareSlugs);
  const bookmarkedSlugs = useDirectoryStore((state) => state.bookmarkedSlugs);
  const selected = compareSlugs.includes(tool.slug);
  const bookmarked = bookmarkedSlugs.includes(tool.slug);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <Card className="h-full overflow-hidden">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-teal-50 text-lg font-bold text-teal-800">
              {tool.name.slice(0, 2)}
            </div>
            <div className="flex gap-1">
              {tool.sponsored ? <Badge>Sponsored</Badge> : null}
              {tool.featured ? <Badge className="border-emerald-200 bg-emerald-50 text-emerald-800">Featured</Badge> : null}
            </div>
          </div>
          <CardTitle className="mt-4">
            <Link href={`/${locale}/tools/${tool.slug}`}>{tool.name}</Link>
          </CardTitle>
          <p className="text-sm text-zinc-600">{tool.shortDescription}</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-zinc-200 bg-zinc-50 text-zinc-700">{tool.category}</Badge>
            <Badge className="border-zinc-200 bg-zinc-50 text-zinc-700">{tool.pricingModel}</Badge>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
            <span className="flex items-center gap-1">
              <Star size={15} className="fill-teal-700 text-teal-700" /> {tool.averageRating} ({tool.reviewCount})
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 size={15} /> {tool.clickCount.toLocaleString()}
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Button asChild size="sm">
              <Link href={`/${locale}/tools/${tool.slug}`}>
                <ExternalLink size={14} />
                Open
              </Link>
            </Button>
            <Button size="sm" variant={selected ? "default" : "outline"} onClick={() => toggleCompare(tool.slug)}>
              <GitCompare size={14} />
            </Button>
            <Button size="sm" variant={bookmarked ? "default" : "outline"} onClick={() => toggleBookmark(tool.slug)}>
              <Bookmark size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
