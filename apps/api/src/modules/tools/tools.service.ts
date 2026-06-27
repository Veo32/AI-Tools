import { Injectable, NotFoundException } from "@nestjs/common";
import { PricingModel, Prisma, ToolStatus } from "@prisma/client";
import { normalizeSlug } from "../../common/utils/slug";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateToolDto } from "./dto/create-tool.dto";
import { QueryToolsDto } from "./dto/query-tools.dto";
import { UpdateToolDto } from "./dto/update-tool.dto";

@Injectable()
export class ToolsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: QueryToolsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 24;
    const where: Prisma.ToolWhereInput = {
      status: ToolStatus.PUBLISHED,
      ...(query.q
        ? {
            OR: [
              { name: { contains: query.q, mode: "insensitive" } },
              { shortDescription: { contains: query.q, mode: "insensitive" } },
              { description: { contains: query.q, mode: "insensitive" } }
            ]
          }
        : {}),
      ...(query.category ? { category: { slug: query.category } } : {}),
      ...(query.tags?.length ? { tags: { some: { tag: { slug: { in: query.tags } } } } } : {}),
      ...(query.pricing?.length ? { pricingModel: { in: query.pricing as PricingModel[] } } : {})
    };

    const orderBy = this.orderBy(query.sort);
    const [items, total] = await this.prisma.$transaction([
      this.prisma.tool.findMany({
        where,
        include: this.toolInclude(),
        orderBy,
        skip: (page - 1) * limit,
        take: limit
      }),
      this.prisma.tool.count({ where })
    ]);

    return {
      items,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };
  }

  async getBySlug(slug: string) {
    const tool = await this.prisma.tool.findUnique({
      where: { slug },
      include: {
        ...this.toolInclude(),
        reviews: {
          where: { status: "APPROVED" },
          include: { user: { select: { id: true, name: true, avatarUrl: true } } },
          orderBy: { createdAt: "desc" },
          take: 20
        }
      }
    });
    if (!tool || tool.status !== "PUBLISHED") throw new NotFoundException("Tool not found");
    return tool;
  }

  async create(ownerId: string, dto: CreateToolDto) {
    return this.prisma.$transaction(async (tx) => {
      const tags = await Promise.all(
        [...new Set(dto.tags ?? [])].map((tag) =>
          tx.tag.upsert({
            where: { slug: normalizeSlug(tag) },
            update: {},
            create: { slug: normalizeSlug(tag), name: tag }
          })
        )
      );

      return tx.tool.create({
        data: {
          ownerId,
          name: dto.name,
          slug: normalizeSlug(dto.slug),
          websiteUrl: dto.websiteUrl,
          logoUrl: dto.logoUrl,
          shortDescription: dto.shortDescription,
          description: dto.description,
          pricingModel: dto.pricingModel,
          categoryId: dto.categoryId,
          platforms: dto.platforms ?? [],
          apiAvailable: dto.apiAvailable ?? false,
          status: "PENDING",
          translations: {
            create: {
              locale: "en",
              name: dto.name,
              shortDescription: dto.shortDescription,
              description: dto.description,
              metaTitle: `${dto.name} Review, Pricing, Alternatives`,
              metaDesc: dto.shortDescription
            }
          },
          tags: {
            create: tags.map((tag) => ({ tagId: tag.id }))
          }
        },
        include: this.toolInclude()
      });
    });
  }

  async update(id: string, dto: UpdateToolDto) {
    const { tags: _tags, categoryId, ...rest } = dto;
    const data: Prisma.ToolUpdateInput = {
      ...rest,
      ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
      ...(dto.slug ? { slug: normalizeSlug(dto.slug) } : {})
    };
    return this.prisma.tool.update({ where: { id }, data, include: this.toolInclude() });
  }

  async compare(slugs: string[]) {
    const tools = await this.prisma.tool.findMany({
      where: { slug: { in: slugs }, status: "PUBLISHED" },
      include: this.toolInclude()
    });
    const order = new Map(slugs.map((slug, index) => [slug, index]));
    return tools.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
  }

  async featured() {
    return this.prisma.tool.findMany({
      where: {
        status: "PUBLISHED",
        OR: [{ featuredUntil: { gt: new Date() } }, { sponsoredUntil: { gt: new Date() } }]
      },
      include: this.toolInclude(),
      orderBy: [{ sponsoredUntil: "desc" }, { averageRating: "desc" }],
      take: 12
    });
  }

  private orderBy(sort = "relevance"): Prisma.ToolOrderByWithRelationInput[] {
    if (sort === "newest") return [{ publishedAt: "desc" }, { createdAt: "desc" }];
    if (sort === "rating") return [{ averageRating: "desc" }, { reviewCount: "desc" }];
    if (sort === "popular") return [{ clickCount: "desc" }, { bookmarkCount: "desc" }];
    if (sort === "sponsored") return [{ sponsoredUntil: "desc" }, { featuredUntil: "desc" }];
    return [{ sponsoredUntil: "desc" }, { averageRating: "desc" }, { clickCount: "desc" }];
  }

  private toolInclude() {
    return {
      category: { include: { translations: true } },
      translations: true,
      tags: { include: { tag: true } }
    } satisfies Prisma.ToolInclude;
  }
}
