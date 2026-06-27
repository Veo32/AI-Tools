import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  listForTool(toolId: string) {
    return this.prisma.review.findMany({
      where: { toolId, status: "APPROVED" },
      include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: "desc" }
    });
  }

  create(userId: string, dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        userId,
        toolId: dto.toolId,
        rating: dto.rating,
        title: dto.title,
        body: dto.body,
        status: "PENDING"
      }
    });
  }
}

