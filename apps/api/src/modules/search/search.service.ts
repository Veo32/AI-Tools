import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import { PrismaService } from "../../prisma/prisma.service";
import { ToolsService } from "../tools/tools.service";
import { SearchDto } from "./dto/search.dto";

@Injectable()
export class SearchService implements OnModuleDestroy {
  private readonly redis: Redis;

  constructor(
    private readonly tools: ToolsService,
    private readonly prisma: PrismaService,
    config: ConfigService
  ) {
    this.redis = new Redis(config.get<string>("REDIS_URL", "redis://localhost:6379"), {
      maxRetriesPerRequest: 1,
      lazyConnect: true
    });
  }

  async search(query: SearchDto) {
    const cacheKey = `search:${JSON.stringify(query)}`;
    const cached = await this.safeGet(cacheKey);
    if (cached) return JSON.parse(cached);

    const results = await this.tools.list(query);
    const facets = await this.facets();
    const suggestions = await this.suggestions(query.q);
    const payload = { ...results, facets, suggestions, engine: "hybrid-prisma-redis-ai-ready" };
    await this.safeSet(cacheKey, JSON.stringify(payload), 60);
    return payload;
  }

  private async facets() {
    const [categories, pricing] = await Promise.all([
      this.prisma.category.findMany({
        include: { translations: { where: { locale: "en" } }, _count: { select: { tools: true } } },
        take: 50
      }),
      this.prisma.tool.groupBy({
        by: ["pricingModel"],
        where: { status: "PUBLISHED" },
        _count: { pricingModel: true }
      })
    ]);
    return { categories, pricing };
  }

  private async suggestions(q?: string) {
    if (!q || q.length < 2) return [];
    return this.prisma.tool.findMany({
      where: { name: { contains: q, mode: "insensitive" }, status: "PUBLISHED" },
      select: { name: true, slug: true },
      take: 5
    });
  }

  private async safeGet(key: string) {
    try {
      if (this.redis.status === "wait") await this.redis.connect();
      return await this.redis.get(key);
    } catch {
      return null;
    }
  }

  private async safeSet(key: string, value: string, ttlSeconds: number) {
    try {
      if (this.redis.status === "wait") await this.redis.connect();
      await this.redis.set(key, value, "EX", ttlSeconds);
    } catch {
      // Search remains available without Redis.
    }
  }

  async onModuleDestroy() {
    this.redis.disconnect();
  }
}

