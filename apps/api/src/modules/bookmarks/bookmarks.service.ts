import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BookmarksService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      include: { tool: { include: { category: { include: { translations: true } }, tags: { include: { tag: true } } } } },
      orderBy: { createdAt: "desc" }
    });
  }

  add(userId: string, toolId: string) {
    return this.prisma.bookmark.upsert({
      where: { userId_toolId: { userId, toolId } },
      update: {},
      create: { userId, toolId }
    });
  }

  async remove(userId: string, toolId: string) {
    await this.prisma.bookmark.deleteMany({ where: { userId, toolId } });
    return { ok: true };
  }
}

