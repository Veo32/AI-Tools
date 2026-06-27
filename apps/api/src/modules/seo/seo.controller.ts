import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SeoService } from "./seo.service";

@ApiTags("SEO")
@Controller("seo")
export class SeoController {
  constructor(private readonly seo: SeoService) {}

  @Get("sitemap")
  sitemap(@Query("locale") locale?: string) {
    return this.seo.sitemap(locale);
  }

  @Get("tools/:slug/json-ld")
  toolJsonLd(@Param("slug") slug: string, @Query("locale") locale?: string) {
    return this.seo.toolJsonLd(slug, locale);
  }
}

