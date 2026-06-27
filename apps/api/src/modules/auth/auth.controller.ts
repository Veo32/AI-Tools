import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RegisterDto } from "./dto/register.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto, @Req() request: Request) {
    return this.auth.register(dto, { ip: request.ip, userAgent: request.headers["user-agent"] });
  }

  @Post("login")
  login(@Body() dto: LoginDto, @Req() request: Request) {
    return this.auth.login(dto, { ip: request.ip, userAgent: request.headers["user-agent"] });
  }

  @Post("refresh")
  refresh(@Body() dto: RefreshTokenDto, @Req() request: Request) {
    return this.auth.refresh(dto, { ip: request.ip, userAgent: request.headers["user-agent"] });
  }

  @Post("logout")
  logout(@Body() dto: RefreshTokenDto) {
    return this.auth.logout(dto.refreshToken);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@CurrentUser() user: { id: string; email: string; roles: string[] }) {
    return user;
  }
}

