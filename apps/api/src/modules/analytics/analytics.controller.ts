import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UserRole } from "@prisma/client";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { AnalyticsService } from "./analytics.service";
import { TrackEventDto } from "./dto/track-event.dto";

@ApiTags("Analytics")
@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Post("track")
  track(@Body() dto: TrackEventDto, @Req() request: Request, @CurrentUser() user?: { id: string }) {
    return this.analytics.track(dto, {
      userId: user?.id,
      ip: request.ip,
      userAgent: request.headers["user-agent"]
    });
  }

  @Get("overview")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @ApiBearerAuth()
  overview() {
    return this.analytics.overview();
  }

  @Get("top-tools")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.VENDOR)
  @ApiBearerAuth()
  topTools() {
    return this.analytics.topTools();
  }
}

