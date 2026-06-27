import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class RecommendationsService {
  constructor(private readonly prisma: PrismaService) {}

  async forUser(userId: string) {
    const bookmarkedCategories = await this.prisma.bookmark.findMany({
      where: { userId },
      select: { tool: { select: { categoryId: true } } },
      take: 50
    });
    const categoryIds = [...new Set(bookmarkedCategories.map((item) => item.tool.categoryId))];
    return this.prisma.tool.findMany({
      where: {
        status: "PUBLISHED",
        ...(categoryIds.length ? { categoryId: { in: categoryIds } } : {})
      },
      include: { category: { include: { translations: true } }, tags: { include: { tag: true } } },
      orderBy: [{ sponsoredUntil: "desc" }, { averageRating: "desc" }, { bookmarkCount: "desc" }],
      take: 12
    });
  }

  async relatedToTool(slug: string) {
    const tool = await this.prisma.tool.findUnique({
      where: { slug },
      include: { tags: true }
    });
    if (!tool) return [];
    return this.prisma.tool.findMany({
      where: {
        id: { not: tool.id },
        status: "PUBLISHED",
        OR: [{ categoryId: tool.categoryId }, { tags: { some: { tagId: { in: tool.tags.map((tag) => tag.tagId) } } } }]
      },
      include: { category: { include: { translations: true } }, tags: { include: { tag: true } } },
      orderBy: [{ sponsoredUntil: "desc" }, { averageRating: "desc" }],
      take: 8
    });
  }
}

