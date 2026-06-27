import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { TrackEventDto } from "./dto/track-event.dto";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async track(dto: TrackEventDto, context: { userId?: string; ip?: string; userAgent?: string }) {
    const event = await this.prisma.analyticsEvent.create({
      data: {
        userId: context.userId,
        toolId: dto.toolId,
        event: dto.event,
        source: dto.source,
        path: dto.path,
        metadata: (dto.metadata ?? {}) as Prisma.InputJsonValue,
        userAgent: context.userAgent
      }
    });

    if (dto.toolId && dto.event === "tool_click") {
      await this.prisma.tool.update({ where: { id: dto.toolId }, data: { clickCount: { increment: 1 } } });
    }
    if (dto.toolId && dto.event === "tool_impression") {
      await this.prisma.tool.update({ where: { id: dto.toolId }, data: { impressionCount: { increment: 1 } } });
    }

    return event;
  }

  async overview() {
    const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
    const [tools, users, events, clicks, impressions, activeSubscriptions] = await Promise.all([
      this.prisma.tool.count({ where: { status: "PUBLISHED" } }),
      this.prisma.user.count(),
      this.prisma.analyticsEvent.count({ where: { createdAt: { gte: since } } }),
      this.prisma.analyticsEvent.count({ where: { event: "tool_click", createdAt: { gte: since } } }),
      this.prisma.analyticsEvent.count({ where: { event: "tool_impression", createdAt: { gte: since } } }),
      this.prisma.subscription.findMany({
        where: { status: { in: ["ACTIVE", "TRIALING"] } },
        include: { plan: true }
      })
    ]);

    const mrr = activeSubscriptions.reduce((sum, subscription) => sum + Number(subscription.plan.priceMonthly), 0);
    return {
      tools,
      users,
      events,
      clicks,
      impressions,
      ctr: impressions ? clicks / impressions : 0,
      mrr,
      arr: mrr * 12,
      conversionRate: users ? activeSubscriptions.length / users : 0
    };
  }

  topTools() {
    return this.prisma.tool.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ clickCount: "desc" }, { impressionCount: "desc" }],
      take: 20,
      select: {
        id: true,
        slug: true,
        name: true,
        clickCount: true,
        impressionCount: true,
        averageRating: true,
        reviewCount: true
      }
    });
  }
}
