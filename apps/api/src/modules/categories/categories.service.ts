import { Injectable } from "@nestjs/common";
import { Locale } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  list(locale = "en") {
    const selectedLocale = toLocale(locale);
    return this.prisma.category.findMany({
      include: {
        translations: { where: { locale: selectedLocale } },
        _count: { select: { tools: true } },
        children: { include: { translations: { where: { locale: selectedLocale } } } }
      },
      orderBy: { slug: "asc" }
    });
  }

  get(slug: string, locale = "en") {
    const selectedLocale = toLocale(locale);
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        translations: { where: { locale: selectedLocale } },
        tools: {
          where: { status: "PUBLISHED" },
          orderBy: [{ sponsoredUntil: "desc" }, { averageRating: "desc" }],
          take: 48
        }
      }
    });
  }
}

function toLocale(locale: string): Locale {
  return Object.values(Locale).includes(locale as Locale) ? (locale as Locale) : Locale.en;
}
