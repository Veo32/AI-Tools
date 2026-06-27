import { Injectable } from "@nestjs/common";
import { normalizeSlug } from "../../common/utils/slug";
import { PrismaService } from "../../prisma/prisma.service";
import { AddCollectionItemDto } from "./dto/add-collection-item.dto";
import { CreateCollectionDto } from "./dto/create-collection.dto";

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  listMine(userId: string) {
    return this.prisma.collection.findMany({
      where: { userId },
      include: { items: { include: { tool: true }, orderBy: { position: "asc" } } },
      orderBy: { updatedAt: "desc" }
    });
  }

  publicBySlug(username: string, slug: string) {
    return this.prisma.collection.findFirst({
      where: { slug, isPublic: true, user: { username } },
      include: { user: { select: { username: true, name: true, avatarUrl: true } }, items: { include: { tool: true } } }
    });
  }

  create(userId: string, dto: CreateCollectionDto) {
    return this.prisma.collection.create({
      data: {
        userId,
        title: dto.title,
        slug: normalizeSlug(dto.slug),
        description: dto.description,
        isPublic: dto.isPublic ?? false
      }
    });
  }

  addItem(collectionId: string, dto: AddCollectionItemDto) {
    return this.prisma.collectionItem.upsert({
      where: { collectionId_toolId: { collectionId, toolId: dto.toolId } },
      update: { note: dto.note, position: dto.position ?? 0 },
      create: {
        collectionId,
        toolId: dto.toolId,
        note: dto.note,
        position: dto.position ?? 0
      }
    });
  }
}
