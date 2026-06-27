import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RecommendationsService } from "./recommendations.service";

@ApiTags("Recommendations")
@Controller("recommendations")
export class RecommendationsController {
  constructor(private readonly recommendations: RecommendationsService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  forUser(@CurrentUser() user: { id: string }) {
    return this.recommendations.forUser(user.id);
  }

  @Get("tools/:slug")
  relatedToTool(@Param("slug") slug: string) {
    return this.recommendations.relatedToTool(slug);
  }
}

