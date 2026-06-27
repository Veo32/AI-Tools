import { Body, Controller, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CmsService } from "./cms.service";
import { UpsertPageDto } from "./dto/upsert-page.dto";

@ApiTags("CMS")
@Controller("cms")
export class CmsController {
  constructor(private readonly cms: CmsService) {}

  @Get("pages/:slug")
  getPage(@Param("slug") slug: string, @Query("locale") locale?: string) {
    return this.cms.getPage(slug, locale);
  }

  @Get("pages")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.EDITOR)
  @ApiBearerAuth()
  list() {
    return this.cms.list();
  }

  @Put("pages")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.EDITOR)
  @ApiBearerAuth()
  upsert(@Body() dto: UpsertPageDto) {
    return this.cms.upsert(dto);
  }
}

