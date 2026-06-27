import { Injectable } from "@nestjs/common";
import { Locale, Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { UpsertPageDto } from "./dto/upsert-page.dto";

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  getPage(slug: string, locale = "en") {
    const selectedLocale = Object.values(Locale).includes(locale as Locale) ? (locale as Locale) : Locale.en;
    return this.prisma.cmsPage.findUnique({ where: { slug_locale: { slug, locale: selectedLocale } } });
  }

  list() {
    return this.prisma.cmsPage.findMany({ orderBy: { updatedAt: "desc" }, take: 100 });
  }

  upsert(dto: UpsertPageDto) {
    return this.prisma.cmsPage.upsert({
      where: { slug_locale: { slug: dto.slug, locale: dto.locale } },
      update: {
        title: dto.title,
        blocks: dto.blocks as Prisma.InputJsonValue,
        metadata: (dto.metadata ?? {}) as Prisma.InputJsonValue,
        published: dto.published ?? false,
        publishedAt: dto.published ? new Date() : null
      },
      create: {
        slug: dto.slug,
        locale: dto.locale,
        title: dto.title,
        blocks: dto.blocks as Prisma.InputJsonValue,
        metadata: (dto.metadata ?? {}) as Prisma.InputJsonValue,
        published: dto.published ?? false,
        publishedAt: dto.published ? new Date() : null
      }
    });
  }
}
