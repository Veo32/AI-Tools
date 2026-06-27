import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { mockCategories, mockTools } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/discover", "/categories", "/compare", "/latest", "/sponsored", "/pricing", "/blog", "/api-docs"];

  return locales.flatMap((locale) => [
    ...staticRoutes.map((route) => ({
      url: `${appUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8
    })),
    ...mockTools.map((tool) => ({
      url: `${appUrl}/${locale}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9
    })),
    ...mockCategories.map((category) => ({
      url: `${appUrl}/${locale}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85
    }))
  ]);
}
