import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list(@Query("locale") locale?: string) {
    return this.categories.list(locale);
  }

  @Get(":slug")
  get(@Param("slug") slug: string, @Query("locale") locale?: string) {
    return this.categories.get(slug, locale);
  }
}

