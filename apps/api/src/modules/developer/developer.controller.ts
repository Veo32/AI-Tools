import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { ApiKeyGuard } from "../../common/guards/api-key.guard";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CreateApiKeyDto } from "./dto/create-api-key.dto";
import { DeveloperService } from "./developer.service";

@ApiTags("Developer")
@Controller("developer")
export class DeveloperController {
  constructor(private readonly developer: DeveloperService) {}

  @Get("docs")
  docs() {
    return this.developer.docs();
  }

  @Post("api-keys")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createKey(@CurrentUser() user: { id: string }, @Body() dto: CreateApiKeyDto) {
    return this.developer.createKey(user.id, dto);
  }

  @Get("api-keys")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  listKeys(@CurrentUser() user: { id: string }) {
    return this.developer.listKeys(user.id);
  }

  @Get("tools")
  @UseGuards(ApiKeyGuard)
  @ApiSecurity("api-key")
  tools() {
    return this.developer.tools();
  }
}

