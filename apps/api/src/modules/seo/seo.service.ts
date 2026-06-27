import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SeoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}

  async sitemap(locale = "en") {
    const appUrl = this.config.get<string>("APP_URL", "http://localhost:3000");
    const [tools, categories] = await Promise.all([
      this.prisma.tool.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
      this.prisma.category.findMany({ select: { slug: true, updatedAt: true } })
    ]);
    const urls = [
      `/${locale}`,
      `/${locale}/discover`,
      `/${locale}/pricing`,
      ...tools.map((tool) => `/${locale}/tools/${tool.slug}`),
      ...categories.map((category) => `/${locale}/categories/${category.slug}`)
    ];
    return urls.map((url) => ({ loc: `${appUrl}${url}`, lastmod: new Date().toISOString() }));
  }

  async toolJsonLd(slug: string, locale = "en") {
    const appUrl = this.config.get<string>("APP_URL", "http://localhost:3000");
    const tool = await this.prisma.tool.findUnique({ where: { slug }, include: { category: true, reviews: true } });
    if (!tool) return null;
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: tool.category.slug,
      operatingSystem: tool.platforms.join(", ") || "Web",
      aggregateRating: tool.reviewCount
        ? {
            "@type": "AggregateRating",
            ratingValue: tool.averageRating,
            ratingCount: tool.reviewCount
          }
        : undefined,
      offers: {
        "@type": "Offer",
        price: tool.startingPrice ? Number(tool.startingPrice) : 0,
        priceCurrency: tool.currency
      },
      url: `${appUrl}/${locale}/tools/${tool.slug}`
    };
  }
}

