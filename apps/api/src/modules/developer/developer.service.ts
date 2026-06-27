import { Injectable } from "@nestjs/common";
import { createHash, randomBytes } from "node:crypto";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateApiKeyDto } from "./dto/create-api-key.dto";

@Injectable()
export class DeveloperService {
  constructor(private readonly prisma: PrismaService) {}

  docs() {
    return {
      baseUrl: "/v1",
      authentication: "Use the x-api-key header for developer API access.",
      endpoints: [
        { method: "GET", path: "/developer/tools", description: "Search published tools with API key auth." },
        { method: "GET", path: "/search", description: "Public advanced search endpoint." },
        { method: "POST", path: "/analytics/track", description: "Track impressions, clicks, and conversions." }
      ]
    };
  }

  async createKey(userId: string, dto: CreateApiKeyDto) {
    const secret = `ait_${randomBytes(24).toString("hex")}`;
    const keyHash = createHash("sha256").update(secret).digest("hex");
    const record = await this.prisma.apiKey.create({
      data: {
        userId,
        name: dto.name,
        keyHash,
        prefix: secret.slice(0, 10),
        scopes: dto.scopes ?? ["tools:read"],
        rateLimit: dto.rateLimit ?? 1000
      }
    });
    return { ...record, apiKey: secret };
  }

  listKeys(userId: string) {
    return this.prisma.apiKey.findMany({
      where: { userId },
      select: { id: true, name: true, prefix: true, scopes: true, status: true, rateLimit: true, lastUsedAt: true, createdAt: true }
    });
  }

  tools() {
    return this.prisma.tool.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        slug: true,
        name: true,
        websiteUrl: true,
        shortDescription: true,
        pricingModel: true,
        averageRating: true,
        reviewCount: true,
        updatedAt: true
      },
      take: 100
    });
  }
}

