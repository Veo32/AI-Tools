import { Injectable } from "@nestjs/common";
import { ModerationStatus, Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: PrismaService) {}

  queue() {
    return Promise.all([
      this.prisma.review.findMany({ where: { status: "PENDING" }, include: { tool: true, user: true }, take: 50 }),
      this.prisma.ownershipClaim.findMany({ where: { status: "PENDING" }, include: { tool: true, user: true }, take: 50 }),
      this.prisma.pendingEdit.findMany({ where: { status: "PENDING" }, include: { tool: true, user: true }, take: 50 })
    ]).then(([reviews, claims, edits]) => ({ reviews, claims, edits }));
  }

  async moderateReview(id: string, moderatorId: string, status: ModerationStatus) {
    const review = await this.prisma.review.update({ where: { id }, data: { status } });
    if (status === "APPROVED") await this.recalculateToolRating(review.toolId);
    await this.prisma.auditLog.create({
      data: { actorId: moderatorId, action: `review.${status.toLowerCase()}`, entity: "Review", entityId: id }
    });
    return review;
  }

  async moderateClaim(id: string, moderatorId: string, status: ModerationStatus) {
    const claim = await this.prisma.ownershipClaim.update({
      where: { id },
      data: { status, reviewedBy: moderatorId, reviewedAt: new Date() }
    });
    if (status === "APPROVED") {
      await this.prisma.tool.update({ where: { id: claim.toolId }, data: { ownerId: claim.userId, verified: true } });
    }
    return claim;
  }

  async moderateEdit(id: string, moderatorId: string, status: ModerationStatus) {
    const edit = await this.prisma.pendingEdit.update({
      where: { id },
      data: { status, reviewedBy: moderatorId, reviewedAt: new Date() }
    });
    if (status === "APPROVED") {
      await this.prisma.tool.update({ where: { id: edit.toolId }, data: edit.payload as Prisma.ToolUpdateInput });
    }
    return edit;
  }

  private async recalculateToolRating(toolId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { toolId, status: "APPROVED" },
      _avg: { rating: true },
      _count: { rating: true }
    });
    await this.prisma.tool.update({
      where: { id: toolId },
      data: {
        averageRating: aggregate._avg.rating ?? 0,
        reviewCount: aggregate._count.rating
      }
    });
  }
}
