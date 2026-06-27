import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { ModerateDto } from "./dto/moderate.dto";
import { ModerationService } from "./moderation.service";

@ApiTags("Moderation")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MODERATOR)
@Controller("moderation")
export class ModerationController {
  constructor(private readonly moderation: ModerationService) {}

  @Get("queue")
  queue() {
    return this.moderation.queue();
  }

  @Patch("reviews/:id")
  moderateReview(@Param("id") id: string, @Body() dto: ModerateDto, @CurrentUser() user: { id: string }) {
    return this.moderation.moderateReview(id, user.id, dto.status);
  }

  @Patch("claims/:id")
  moderateClaim(@Param("id") id: string, @Body() dto: ModerateDto, @CurrentUser() user: { id: string }) {
    return this.moderation.moderateClaim(id, user.id, dto.status);
  }

  @Patch("edits/:id")
  moderateEdit(@Param("id") id: string, @Body() dto: ModerateDto, @CurrentUser() user: { id: string }) {
    return this.moderation.moderateEdit(id, user.id, dto.status);
  }
}

