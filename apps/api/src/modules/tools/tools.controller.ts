import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateToolDto } from "./dto/create-tool.dto";
import { QueryToolsDto } from "./dto/query-tools.dto";
import { UpdateToolDto } from "./dto/update-tool.dto";
import { ToolsService } from "./tools.service";

@ApiTags("Tools")
@Controller("tools")
export class ToolsController {
  constructor(private readonly tools: ToolsService) {}

  @Get()
  list(@Query() query: QueryToolsDto) {
    return this.tools.list(query);
  }

  @Get("featured")
  featured() {
    return this.tools.featured();
  }

  @Get("compare/:slugs")
  compare(@Param("slugs") slugs: string) {
    return this.tools.compare(slugs.split(",").slice(0, 6));
  }

  @Get(":slug")
  getBySlug(@Param("slug") slug: string) {
    return this.tools.getBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateToolDto) {
    return this.tools.create(user.id, dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.EDITOR, UserRole.MODERATOR)
  @ApiBearerAuth()
  update(@Param("id") id: string, @Body() dto: UpdateToolDto) {
    return this.tools.update(id, dto);
  }
}

