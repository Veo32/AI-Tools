import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AddCollectionItemDto } from "./dto/add-collection-item.dto";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { CollectionsService } from "./collections.service";

@ApiTags("Collections")
@Controller("collections")
export class CollectionsController {
  constructor(private readonly collections: CollectionsService) {}

  @Get("public/:username/:slug")
  publicBySlug(@Param("username") username: string, @Param("slug") slug: string) {
    return this.collections.publicBySlug(username, slug);
  }

  @Get("mine")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  listMine(@CurrentUser() user: { id: string }) {
    return this.collections.listMine(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateCollectionDto) {
    return this.collections.create(user.id, dto);
  }

  @Post(":id/items")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  addItem(@Param("id") id: string, @Body() dto: AddCollectionItemDto) {
    return this.collections.addItem(id, dto);
  }
}

