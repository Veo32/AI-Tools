import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { BookmarksService } from "./bookmarks.service";

@ApiTags("Bookmarks")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("bookmarks")
export class BookmarksController {
  constructor(private readonly bookmarks: BookmarksService) {}

  @Get()
  list(@CurrentUser() user: { id: string }) {
    return this.bookmarks.list(user.id);
  }

  @Post()
  add(@CurrentUser() user: { id: string }, @Body("toolId") toolId: string) {
    return this.bookmarks.add(user.id, toolId);
  }

  @Delete(":toolId")
  remove(@CurrentUser() user: { id: string }, @Param("toolId") toolId: string) {
    return this.bookmarks.remove(user.id, toolId);
  }
}

